import Idea from '../models/Idea';


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
    title, description, category, status
  } = req.body;
  const ideaDetails = {
    title,
    description,
    category,
    status,
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
  const { userId } = req.body;
  Idea.findOne({ _id: req.params.ideaId })
    .exec()
    .then((idea) => {
      if (userId === idea.authorId) {
        Idea.findByIdAndUpdate(
          { _id: req.params.ideaId },
          {
            $set: {
              description: req.body.description,
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
          .send({ message: 'Sorry only the author can delete this idea!' });
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
  const { userId } = req.body;
  Idea.findOne({ _id: ideaId })
    .exec()
    .then((idea) => {
      if (userId === idea.authorId) {
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
