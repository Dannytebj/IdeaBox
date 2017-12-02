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
    authorId: req.decoded.id
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
