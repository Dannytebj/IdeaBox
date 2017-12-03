import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  title: { type: String },
  authorId: { type: String },
  comment: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  }],
  modified: { type: Boolean, default: false },
  description: { type: String, required: true },
  category: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
ideaSchema.index({ title: 'text', description: 'text' });
const Idea = mongoose.model('Idea', ideaSchema);


export default Idea;
