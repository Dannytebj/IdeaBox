import Comment from '../models/Comment';

exports.create = (req, res) => {
  req.check('author', 'author field cannot be empty').notEmpty();
  req.check('author', 'Please enter a valid email').isEmail();
  req.check('comment', 'comment field cannot be empty').notEmpty();
  req.check('ideaId', 'ideaId cannot be empty').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    const { author, comment, ideaId } = req.body;
    const commentDetail = {
      author,
      comment,
      ideaId
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
      res.status(200)
        .send({
          success: true,
          message: 'Comment saved successfully!',
          commentDetails
        });
    });
  }
};

exports.fetchComment = (req, res) => {
  Comment.find({
    ideaId: req.params.ideaId
  }).then((comments) => {
    if (!comments) {
      return res.status(404).send({
        success: false,
        message: 'No comments found!'
      });
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
