import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: String },
  author: { type: String },
  comment: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  }],
  modified: { type: Boolean, default: false },
  description: { type: String, required: true },
  category: { type: String, required: true },
  ideaStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
ideaSchema.index({ title: 'text', description: 'text' });
ideaSchema.plugin(mongoosePaginate);
const Idea = mongoose.model('Idea', ideaSchema);


export default Idea;
