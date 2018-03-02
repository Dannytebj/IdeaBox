'use strict';

var _Comment = require('../models/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _Idea = require('../models/Idea');

var _Idea2 = _interopRequireDefault(_Idea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.create = function (req, res) {
  req.check('comment', 'comment field cannot be empty').notEmpty();
  req.check('ideaId', 'ideaId cannot be empty').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var message = errors[0].msg;
    res.status(400).send({ message: message });
  } else {
    _Idea2.default.findOne({ _id: req.body.ideaId }).exec().then(function (idea) {
      if (!idea) {
        return res.status(404).send({ message: 'idea not found!' });
      }
      var commentDetail = {
        author: req.decoded._id,
        comment: req.body.comment,
        ideaId: idea._id
      };
      var newComment = new _Comment2.default(commentDetail);
      newComment.save(function (error, response) {
        if (error) {
          return res.status(400).send({
            success: false,
            message: error
          });
        }
        var commentDetails = {
          comment: response.comment,
          author: response.author
        };
        return res.status(201).send({
          success: true,
          message: 'Comment saved successfully!',
          commentDetails: commentDetails
        });
      });
    }).catch(function (error) {
      res.status(500).send({
        message: 'Internal server error',
        error: error
      });
    });
  }
};

exports.fetchComment = function (req, res) {
  _Comment2.default.find({
    ideaId: req.params.ideaId
  }).populate('author').then(function (comments) {
    if (!comments) {
      return res.status(304);
    }
    res.status(200).send({
      comments: comments,
      message: 'Comments fetched Successfully!'
    });
  }).catch(function (error) {
    res.status(500).send({
      message: error
    });
  });
};