const Report = require("../models/Report");
const Article = require("../models/Article");

// Add a report for an article
exports.addReport = async (req, res) => {
  try {
    const { reason } = req.body;
    const { id } = req.params; // Article ID
    const reportedBy = req.user._id; // User ID from the authenticated user

    // Check if the article exists
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, error: "Article not found" });
    }

    // Create the report
    const report = new Report({
      article: id,
      reportedBy,
      reason,
    });

    await report.save();

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};