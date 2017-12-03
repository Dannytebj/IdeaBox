import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  ideaId: { type: String },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
