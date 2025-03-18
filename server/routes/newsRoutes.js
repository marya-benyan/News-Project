const express = require("express");
const router = express.Router();
// const newsController = require("../controllers/newsController");
const articleController = require("../controllers/articleController");

// ✅ جلب الأخبار العاجلة
router.get("/latest", articleController.getLatestArticles);

// ✅ إضافة خبر جديد
// router.post("/add", newsController.addNews);

module.exports = router;
