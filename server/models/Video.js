const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true }, // رابط الفيديو
    embedUrl: { type: String }, // الرابط القابل للتضمين
    thumbnail: { type: String }, // صورة مصغرة للفيديو
    isPremium: { type: Boolean, default: true }, // هل الفيديو مدفوع؟
    isDeleted: { type: Boolean, default: false }, // حذف ناعم
    views: { type: Number, default: 0 }, // عدد المشاهدات
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }] // المستخدمين الذين أعجبهم الفيديو
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);