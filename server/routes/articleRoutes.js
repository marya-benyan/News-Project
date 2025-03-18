// const express = require("express");
// const router = express.Router();
// const articleController = require("../controllers/articleController");
// const { isAuthenticated } = require("../middleware/journalistMiddleware");

// router.get("/", isAuthenticated, articleController.getArticles);
// router.get("/:id",isAuthenticated, articleController.getArticleById);
// router.put("/:id",isAuthenticated , articleController.updateArticle);
// module.exports = router;

const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const reportController = require("../controllers/reportController");
const likeController = require('../controllers/likeController');
const { isAuthenticated } = require("../middleware/userMiddleware"); // Use a general auth middleware for users

// Public routes (no authentication required)
router.get("/", articleController.getArticles); // Get all articles
router.get("/:id", articleController.getArticleById); // Get a specific article

// Comment routes (for authenticated users)
router.post("/:id/comments", isAuthenticated, commentController.addComment); // Add a comment to an article
router.delete("/comments/:commentId", isAuthenticated, commentController.deleteComment); // Delete a comment (only the author can delete)

router.post('/:id/like', isAuthenticated, likeController.toggleLikeArticle);

// Report routes (for authenticated users)
router.post("/:id/reports", isAuthenticated, reportController.addReport); // Add a report for an article

module.exports = router;