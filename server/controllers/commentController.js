const Comment = require("../models/Comment");
const Article = require("../models/Article");

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params; // Article ID
    const author = req.user._id; // User ID from the authenticated user

    // Create the comment
    const comment = new Comment({
      article: id,
      author,
      content,
    });

    await comment.save();

    // Add the comment to the article's comments array (optional)
    await Article.findByIdAndUpdate(id, { $push: { comments: comment._id } });

    // Populate the author field to get the user's full_name
    const populatedComment = await Comment.findById(comment._id).populate('author', 'full_name');

    res.status(201).json({ success: true, data: populatedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a comment (only the author can delete)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, error: "Comment not found" });
    }

    // Check if the logged-in user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // Remove the comment from the article's comments array (optional)
    await Article.findByIdAndUpdate(comment.article, { $pull: { comments: commentId } });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};