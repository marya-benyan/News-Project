const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false }, // ✅ Soft delete field
    // NEW: Tracks if category has videos
    hasVideos: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
