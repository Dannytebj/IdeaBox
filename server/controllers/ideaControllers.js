import Idea from '../models/Idea';
import pagination from '../utils/pagination';


/**
 * Create a new Idea
 * Route: POST: /api/v1/idea
 * @param {any} req
 * @param {any} res
 * @return {void}
 * @memberOf Idea
 */
exports.create = (req, res) => {
  const {
    title, description, category, ideaStatus
  } = req.body;
  const ideaDetails = {
    title,
    description,
    category,
    ideaStatus,
    authorId: req.decoded._id
  };
  const newIdea = new Idea(ideaDetails);
  newIdea.save((error, postedIdea) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: error,
      });
    }
    return res.status(201).send({
      success: true,
      message: 'Your just created an idea',
      postedIdea,
    });
  });
};

/**
   * Routes: PUT: /api/v1/ideas/:ideaId
   * @param {any} req
   * @param {any} res
   * @return {void}
   */
exports.editIdea = (req, res) => {
  Idea.findOne({ _id: req.params.ideaId })
    .exec()
    .then((idea) => {
      if (req.decoded._id === idea.authorId) {
        Idea.findByIdAndUpdate(
          { _id: req.params.ideaId },
          {
            $set: {
              title: req.body.title,
              description: req.body.description,
              category: req.body.category,
              ideaStatus: req.body.ideaStatus,
              modified: true,
              updatedAt: Date.now()
            },
          },
          { new: true },
        )
          .exec((error, editedIdea) => {
            if (editedIdea) {
              return res.status(200)
                .send({
                  message: 'Idea updated successfully!',
                  editedIdea,
                });
            }
          }).catch(error =>
            res.status(500).send({ error }));
      } else {
        res.status(403)
          .send({ message: 'Sorry only the author can edit this idea!' });
      }
    }).catch(error =>
      res.status(500).send({ error }));
};

/**
   * Routes: DELETE: /api/v1/ideas/:ideaId
   * @param {any} req
   * @param {any} res
   * @return {void}
   */
exports.delete = (req, res) => {
  const { ideaId } = req.params;
  Idea.findOne({ _id: ideaId })
    .exec()
    .then((idea) => {
      if (req.decoded._id === idea.authorId) {
        Idea.findByIdAndRemove(ideaId, (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: 'Internal server error',
            });
          }
          // return response
          return res.status(200).send({
            success: true,
            message: 'Idea deleted successfully'
          });
        });
      } else {
        res.status(403)
          .send({ message: 'Sorry only the author can delete this idea!' });
      }
    }).catch((error) => {
      res.status(500).send({ message: 'Sorry an error occured', error });
    });
};

/**
   * Routes: GET: /api/v1/search/:idea
   * @param {any} req
   * @param {any} res
   * @return {void}
   */
exports.searchIdea = (req, res) => {
  const searchQuery = req.params.idea;
  Idea.find({ description: { $regex: `.*${searchQuery}.*` } })
    .select('title description')
    .then((ideas) => {
      res.status(200)
        .send({
          message: 'Ideas fetched succeessfully',
          ideas
        });
    }).catch((error) => {
      res.status(500)
        .json({ message: 'An error Occured', error });
    });
};

exports.searchIdeas = (req, res) => {
  // req.check('searchQuery', 'please add search term').notEmpty();
  // const errors = req.validationErrors();
  // // if (errors) {
  // //   console.log(errors)
  //   const message = errors[0].msg;
  //   res.status(422).send({ message });
  // } else {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  let count;
  Idea.count({
    $text: { $search: req.params.searchQuery.trim() },
    categories: req.body.category
  }, (err, iscount) => {
    count = iscount;
  });
  Idea.find({
    $text: { $search: req.params.searchQuery.trim() },
    categories: req.body.category
  })
    .skip(offset)
    .limit(limit)
    .exec()
    .then(ideas => res.status(400).send({
      ideas,
      pageInfo: pagination(count, limit, offset),
    }))
    .catch((error) => {
      res.status(500).send({ error });
    });
};
