const express = require("express");
const router = express.Router();
const { getBookmarks, toggleBookmark } = require("../controllers/bookMarkController");
const { isAuthenticated , isUser} = require('../middleware/PaymentAuthMiddleware');

// جلب المقالات المحفوظة
router.get("/bookmarks", isAuthenticated, isUser, getBookmarks);

// إضافة/إزالة مقال من المفضلة
router.put("/bookmarks/:articleId", isAuthenticated, isUser, toggleBookmark);

module.exports = router;