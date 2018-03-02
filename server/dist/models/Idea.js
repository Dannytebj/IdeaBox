'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ideaSchema = new _mongoose2.default.Schema({
  title: { type: String, required: true },
  authorId: { type: String },
  author: { type: String },
  comment: [{
    id: {
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  }],
  modified: { type: Boolean, default: false },
  description: { type: String, required: true },
  category: { type: String, required: true },
  ideaStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
ideaSchema.index({ title: 'text', description: 'text', category: 'text' });
ideaSchema.plugin(_mongoosePaginate2.default);
var Idea = _mongoose2.default.model('Idea', ideaSchema);

exports.default = Idea;