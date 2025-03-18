const express = require("express");
const router = express.Router();
const articleController = require("../controllers/mostViewedController");

router.get("/most-viewed", articleController.getMostViewedArticles);

module.exports = router;
