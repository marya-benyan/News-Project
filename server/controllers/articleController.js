const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Report = require('../models/Report');
const mongoose = require('mongoose');

// ✅ Create article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, featuredImage, media, categoryIds, tags, author, publishDate } = req.body;

    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({ success: false, message: 'Title, content, and author are required' });
    }

    // Validate author ID
    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ success: false, message: 'Invalid author ID' });
    }
    const authorObjectId = new mongoose.Types.ObjectId(author);

    // Validate and convert category IDs
    let categoryObjectIds = [];
    if (categoryIds) {
      const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
      for (const id of ids) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, message: `Invalid category ID: ${id}` });
        }
        categoryObjectIds.push(new mongoose.Types.ObjectId(id));
      }
    }

    // Create new article
    const article = new Article({
      title,
      content,
      featuredImage,
      media,
      categoryIds: categoryObjectIds,
      tags,
      author: authorObjectId,
      publishDate: publishDate || new Date(),
    });

    // Save the article to the database
    const savedArticle = await article.save();
    res.status(201).json({ success: true, data: savedArticle, message: 'Article created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Get articles (for listing pages)
exports.getArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, sortBy = 'createdAt', order = 'desc', status = 'published' } = req.query;

    let query = { status, isDeleted: false };

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ success: false, message: 'Invalid category ID' });
      }
      query.categoryIds = { $in: [new mongoose.Types.ObjectId(category)] };
    }

    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    // Fetch articles with pagination and sorting
    const articles = await Article.find(query)
      .populate({ path: 'author', select: 'full_name' })
      .populate({ path: 'categoryIds', select: 'name' })
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Construct full URLs for featuredImage and media
    const articlesWithFullUrls = articles.map((article) => ({
      ...article.toObject(),
      featuredImage: article.featuredImage ? `http://localhost:8000/${article.featuredImage}` : null,
      media: article.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
    }));

    const totalArticles = await Article.countDocuments(query);

    res.status(200).json({
      success: true,
      data: articlesWithFullUrls,
      pagination: { total: totalArticles, page: parseInt(page), pages: Math.ceil(totalArticles / limit) },
    });
  } catch (error) {
    console.error('Error in getArticles:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Get single article by ID (for Article Detail Page)
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the article by ID
    const article = await Article.findOne({ _id: id, isDeleted: false })
      .populate('author', 'name')
      .populate('categoryIds', 'name')
      .populate('videoId', 'videoUrl title');

    // If article not found, return 404
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Increment views count
    article.views = (article.views || 0) + 1;
    await article.save();

    // Find related articles
    const relatedArticles = await Article.find({
      categoryIds: { $in: article.categoryIds },
      _id: { $ne: id },
      status: 'published',
      isDeleted: false,
    })
      .populate('author', 'name')
      .populate('categoryIds', 'name')
      .limit(3);

    // Find comments for the article
    const comments = await Comment.find({ article: id, status: 'visible' })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

       // Construct full URL for featuredImage
    const articleWithFullUrl = {
      ...article.toObject(),
      featuredImage: article.featuredImage ? `http://localhost:8000/${article.featuredImage}` : null,
    };

    // Return the response
    res.status(200).json({
      success: true,
      data: {
        article: articleWithFullUrl,
        relatedArticles,
        comments,
        engagementStats: {
          likes: article.likes ? article.likes.length : 0,
          views: article.views,
          commentCount: comments.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Toggle like on article
exports.toggleLikeArticle = async (req, res) => {
  try {
    const { id } = req.params; // Article ID
    const userId = req.user._id; // User ID from the authenticated user

    // Find the article
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Check if the user already liked the article
    const userLiked = article.likes.includes(userId);

    if (userLiked) {
      // If already liked, remove the like
      article.likes = article.likes.filter((like) => like.toString() !== userId.toString());
    } else {
      // If not liked, add the like
      article.likes.push(userId);
    }

    // Save the updated article
    await article.save();

    // Return the updated likes count
    res.status(200).json({
      success: true,
      data: { likes: article.likes.length },
      message: userLiked ? 'Like removed' : 'Article liked',
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Add comment to article
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params; // Article ID
    const { content } = req.body; // Comment content
    const userId = req.user._id; // User ID from the authenticated user

    // Create new comment
    const comment = new Comment({
      article: id,
      author: userId,
      content,
    });

    // Save the comment to the database
    await comment.save();
    await comment.populate('author', 'username'); // Populate author details

    // Return the response
    res.status(201).json({ success: true, data: comment, message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Report article
exports.reportArticle = async (req, res) => {
  try {
    const { id } = req.params; // Article ID
    const { reason } = req.body; // Report reason
    const userId = req.user._id; // User ID from the authenticated user

    // Create new report
    const report = new Report({
      article: id,
      reportedBy: userId,
      reason,
    });

    // Save the report to the database
    await report.save();

    // Return the response
    res.status(201).json({ success: true, message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Update article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params; // Article ID
    const updates = req.body; // Fields to update

    // Define allowed updates
    const allowedUpdates = ['title', 'content', 'featuredImage', 'media', 'categoryIds', 'tags', 'publishDate', 'status'];
    const invalidUpdates = Object.keys(updates).filter((field) => !allowedUpdates.includes(field));

    // If invalid updates are found, return 400
    if (invalidUpdates.length > 0) {
      return res.status(400).json({ success: false, message: `Invalid fields: ${invalidUpdates.join(', ')}` });
    }

    // Convert category IDs to ObjectId if provided
    if (updates.categoryIds) {
      updates.categoryIds = Array.isArray(updates.categoryIds)
        ? updates.categoryIds.map((id) => new mongoose.Types.ObjectId(id))
        : [new mongoose.Types.ObjectId(updates.categoryIds)];
    }

    // Convert author ID to ObjectId if provided
    if (updates.author) {
      updates.author = new mongoose.Types.ObjectId(updates.author);
    }

    // Find and update the article
    const article = await Article.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });

    // If article not found, return 404
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Return the updated article
    res.status(200).json({ success: true, data: article, message: 'Article updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating article', error: error.message });
  }
};

