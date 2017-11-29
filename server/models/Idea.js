import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;

const ideaSchema = new Schema({
  title: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  comment: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  }],
  description: { type: String, required: true },
  category: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Idea = mongoose.model('Idea', ideaSchema);


export default Idea;
