'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentSchema = new _mongoose2.default.Schema({
  author: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  ideaId: { type: String },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
var Comment = _mongoose2.default.model('Comment', commentSchema);

exports.default = Comment;