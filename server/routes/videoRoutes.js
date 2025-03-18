const express = require('express');
const router = express.Router();
const { getAllVideos, getVideoById, createVideo } = require('../controllers/videoController');

// الحصول على جميع الفيديوهات
router.get('/', getAllVideos);

// الحصول على فيديو بواسطة الـ ID
router.get('/:id', getVideoById);

// إنشاء فيديو جديد
router.post('/', createVideo);

module.exports = router;