import Idea from '../models/Idea';


/**
 * Create a new Idea
 * Route: POST: /api/v1/idea
 * @param {any} req
 * @param {any} res
 * @return {void}
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
   * get all public ideas
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.publicIdeas = (req, res) => {
  const { searchQuery } = req.body;
  Idea.paginate(
    { $and: [{ ideaStatus: { $ne: 'Private' } }, { description: { $regex: `.*${searchQuery}.*` } }] },
    { limit: Number(req.query.limit), page: Number(req.query.page) }
  )
    .then((ideas) => {
      const pageInfo = {
        pages: ideas.pages,
        page: ideas.page,
        total: ideas.total,
      };
      res.status(200).send({
        ideas: ideas.docs,
        pageInfo,
        message: 'Ideas successfully fetched'
      });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
/**
   * get all users ideas
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.getUsersIdeas = (req, res) => {
  Idea.paginate({
    _id: req.decoded._id
  }, { limit: Number(req.query.limit), page: Number(req.query.page) })
    .then((ideas) => {
      const pageInfo = {
        pages: ideas.pages,
        page: ideas.page,
        total: ideas.total,
      };
      res.status(200).send({
        ideas: ideas.docs,
        pageInfo,
        message: 'Ideas successfully fetched'
      });
    })
    .catch((error) => {
      res.status(400).send({
        error: error.message
      });
    });
};

