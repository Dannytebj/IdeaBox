import Comment from '../models/Comment';
import Idea from '../models/Idea';

exports.create = (req, res) => {
  req.check('comment', 'comment field cannot be empty').notEmpty();
  req.check('ideaId', 'ideaId cannot be empty').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    Idea.findOne({ _id: req.body.ideaId })
      .exec()
      .then((idea) => {
        if (!idea) {
          return res.status(404)
            .send({ message: 'idea not found!' });
        }
        const commentDetail = {
          author: req.decoded._id,
          comment: req.body.comment,
          ideaId: idea._id
        };
        const newComment = new Comment(commentDetail);
        newComment.save((error, response) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: error
            });
          }
          const commentDetails = {
            comment: response.comment,
            author: response.author
          };
          return res.status(201)
            .send({
              success: true,
              message: 'Comment saved successfully!',
              commentDetails
            });
        });
      })
      .catch((error) => {
        res.status(500)
          .send({
            message: 'Internal server error',
            error
          });
      });
  }
};

exports.fetchComment = (req, res) => {
  Comment.find({
    ideaId: req.params.ideaId
  })
    .populate('author')
    .then((comments) => {
      if (!comments) {
        return res.status(304);
      }
      res.status(200).send({
        comments,
        message: 'Comments fetched Successfully!'
      });
    }).catch((error) => {
      res.status(500).send({
        message: error
      });
    });
};
