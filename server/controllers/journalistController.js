const Article = require("../models/Article");
const Category = require("../models/Category");
const upload = require("../middleware/upload"); // Import Multer middleware

// ✅ Get all articles by the logged-in journalist (excluding soft-deleted ones)
exports.getArticles = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query; // Default to page 1 and 6 items per page
    const offset = (page - 1) * limit;

    // Fetch paginated articles
    const articles = await Article.find({ author: req.user._id, isDeleted: false })
      .skip(offset)
      .limit(parseInt(limit))
      .populate("categoryIds");

    // Get the total number of articles for pagination metadata
    const totalItems = await Article.countDocuments({ author: req.user._id, isDeleted: false });

    // Construct full URLs for featuredImage and media
    const articlesWithFullUrls = articles.map((article) => ({
      ...article.toObject(),
      featuredImage: `http://localhost:8000/${article.featuredImage}`,
      media: article.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
    }));

    // Send response with articles and pagination metadata
    res.json({
      articles: articlesWithFullUrls,
      totalItems,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create a new article
exports.createArticle = async (req, res) => {
  try {
    // Handle file uploads using Multer
    upload.fields([
      { name: "featuredImage", maxCount: 1 }, // Single file for featuredImage
      { name: "media", maxCount: 10 }, // Up to 10 files for media
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Get uploaded file paths
      const featuredImage = req.files.featuredImage ? req.files.featuredImage[0].path : null;
      const media = req.files.media ? req.files.media.map((file) => file.path) : [];

      // Create the new article
      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        featuredImage: featuredImage,
        media: media,
        categoryIds: req.body.categoryIds,
        tags: req.body.tags,
        author: req.user._id, // Assign logged-in journalist as the author
        likes: [],
      });

      // Save the new article
      await newArticle.save();

      // Populate the categoryIds field with full category details
      const populatedArticle = await Article.findById(newArticle._id).populate(
        "categoryIds",
        "name description"
      );

      // Construct full URLs for featuredImage and media
      const articleWithFullUrls = {
        ...populatedArticle.toObject(),
        featuredImage: `http://localhost:8000/${populatedArticle.featuredImage}`,
        media: populatedArticle.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
      };

      // Send the populated article with full URLs as the response
      res.status(201).json(articleWithFullUrls);
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Edit an existing article (only before admin approval)
exports.updateArticle = async (req, res) => {
  try {
    // Handle file uploads using Multer
    upload.fields([
      { name: "featuredImage", maxCount: 1 }, // Single file for featuredImage
      { name: "media", maxCount: 10 }, // Up to 10 files for media
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Find the article to update
      const article = await Article.findOne({ _id: req.params.id, author: req.user._id });

      if (!article) {
        return res.status(404).json({ message: "Article not found or not authorized." });
      }
      if (article.status !== "pending") {
        return res.status(403).json({ message: "You can only edit pending articles." });
      }

      // Get uploaded file paths
      const featuredImage = req.files.featuredImage ? req.files.featuredImage[0].path : article.featuredImage;
      const media = req.files.media ? req.files.media.map((file) => file.path) : article.media;

      // Update the article
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content,
          featuredImage: featuredImage,
          media: media,
          categoryIds: req.body.categoryIds,
          tags: req.body.tags,
        },
        { new: true } // Return the updated article
      );

      // Populate the categoryIds field with full category details
      const populatedArticle = await Article.findById(updatedArticle._id).populate(
        "categoryIds",
        "name description"
      );

      // Construct full URLs for featuredImage and media
      const articleWithFullUrls = {
        ...populatedArticle.toObject(),
        featuredImage: `http://localhost:8000/${populatedArticle.featuredImage}`,
        media: populatedArticle.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
      };

      // Send the populated article with full URLs as the response
      res.json(articleWithFullUrls);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Soft delete an article (instead of permanent deletion)
exports.softDeleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id, author: req.user._id });

    if (!article) {
      return res.status(404).json({ message: "Article not found or not authorized." });
    }
    if (article.status !== "pending") {
      return res.status(403).json({ message: "You can only delete pending articles." });
    }

    article.isDeleted = true;
    await article.save();

    res.json({ message: "Article soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get article analytics (views, likes)
exports.getAnalytics = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id, isDeleted: false }, "title views likes");
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get article status (Pending, Published, Rejected)
exports.getStatus = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query; // Default to page 1 and 6 items per page
    const offset = (page - 1) * limit;

    // Fetch paginated articles with status
    const articles = await Article.find(
      { author: req.user._id, isDeleted: false },
      "title status"
    )
      .skip(offset)
      .limit(parseInt(limit));

    // Get the total number of articles for pagination metadata
    const totalItems = await Article.countDocuments({ author: req.user._id, isDeleted: false });

    // Send response with articles and pagination metadata
    res.json({
      articles,
      totalItems,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all categories (excluding soft-deleted ones)
exports.getCategories = async (req, res) => {
  const categories = await Category.find({ deleted: { $ne: true } });
  res.json(categories);
};