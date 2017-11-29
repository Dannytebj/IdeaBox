import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
