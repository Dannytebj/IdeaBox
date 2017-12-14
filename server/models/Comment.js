import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ideaId: { type: String },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
