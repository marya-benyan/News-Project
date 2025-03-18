const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true }, // المقال المُبلغ عنه
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // المستخدم الذي قام بالتبليغ
    reason: { type: String, required: true }, // سبب الشكوى
    status: { type: String, enum: ['pending', 'reviewed', 'dismissed'], default: 'pending' } // حالة الشكوى
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
