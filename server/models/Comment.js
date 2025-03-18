const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: 'Article', default: null }, // ✅ Can be null if comment is on a video
    video: { type: Schema.Types.ObjectId, ref: 'Video', default: null }, // ✅ Can be null if comment is on an article
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Users only (not journalists)
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['visible', 'hidden', 'flagged'], default: 'visible' } // ✅ Only admins can change this
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
