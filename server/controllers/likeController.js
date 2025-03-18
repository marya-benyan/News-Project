const Article = require('../models/Article');

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