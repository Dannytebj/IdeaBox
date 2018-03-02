'use strict';

var _Idea = require('../models/Idea');

var _Idea2 = _interopRequireDefault(_Idea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new Idea
 * Route: POST: /api/v1/idea
 * @param {any} req
 * @param {any} res
 * @return {void}
 */
exports.create = function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      category = _req$body.category,
      ideaStatus = _req$body.ideaStatus;

  var ideaDetails = {
    title: title,
    description: description,
    category: category,
    ideaStatus: ideaStatus,
    authorId: req.decoded._id,
    author: req.decoded.username
  };
  var newIdea = new _Idea2.default(ideaDetails);
  newIdea.save(function (error, postedIdea) {
    if (error) {
      return res.status(500).send({
        success: false,
        message: error
      });
    }
    return res.status(201).send({
      success: true,
      message: 'Your just created an idea',
      postedIdea: postedIdea
    });
  });
};

/**
   * Routes: PUT: /api/v1/ideas/:ideaId
   * @param {any} req
   * @param {any} res
   * @return {void}
   */
exports.editIdea = function (req, res) {
  _Idea2.default.findOne({ _id: req.body.ideaId }).exec().then(function (idea) {
    if (req.decoded._id === idea.authorId) {
      _Idea2.default.findByIdAndUpdate({ _id: req.body.ideaId }, {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          ideaStatus: req.body.ideaStatus,
          modified: true,
          updatedAt: Date.now()
        }
      }, { new: true }).exec(function (error, editedIdea) {
        if (editedIdea) {
          return res.status(200).send({
            message: 'Idea updated successfully!',
            editedIdea: editedIdea
          });
        }
      }).catch(function (error) {
        return res.status(500).send({ error: error });
      });
    } else {
      res.status(403).send({ message: 'Sorry only the author can edit this idea!' });
    }
  }).catch(function (error) {
    return res.status(500).send({ message: error });
  });
};

/**
   * Routes: DELETE: /api/v1/ideas/:ideaId
   * @param {any} req
   * @param {any} res
   * @return {void}
   */
exports.delete = function (req, res) {
  var ideaId = req.params.ideaId;

  _Idea2.default.findOne({ _id: ideaId }).exec().then(function (idea) {
    if (req.decoded._id === idea.authorId) {
      _Idea2.default.findByIdAndRemove(ideaId, function (err) {
        if (err) {
          return res.status(500).send({
            success: false,
            message: 'Internal server error'
          });
        }
        return res.status(200).send({
          success: true,
          message: 'Idea deleted successfully'
        });
      });
    } else {
      res.status(403).send({ message: 'Sorry only the author can delete this idea!' });
    }
  }).catch(function (error) {
    res.status(500).send({ message: 'Sorry an error occured', error: error });
  });
};

/**
   * get all public ideas
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.publicIdeas = function (req, res) {
  var searchQuery = req.body.searchQuery;

  _Idea2.default.paginate({ $and: [{ ideaStatus: { $ne: 'Private' } }, { description: { $regex: '.*' + searchQuery + '.*', $options: 'i' } }] }, { limit: Number(req.query.limit), page: Number(req.query.page) }).then(function (ideas) {
    var pageInfo = {
      pages: ideas.pages,
      page: ideas.page,
      total: ideas.total
    };
    res.status(200).send({
      ideas: ideas.docs,
      pageInfo: pageInfo,
      message: 'Ideas successfully fetched'
    });
  }).catch(function (error) {
    res.status(500).send({ error: error });
  });
};
/**
   * get all users ideas
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.getUsersIdeas = function (req, res) {
  _Idea2.default.paginate({
    authorId: req.decoded._id
  }, { limit: Number(req.query.limit), page: Number(req.query.page) }).then(function (ideas) {
    var pageInfo = {
      pages: ideas.pages,
      page: ideas.page,
      total: ideas.total
    };
    res.status(200).send({
      ideas: ideas.docs,
      pageInfo: pageInfo,
      message: 'Ideas successfully fetched'
    });
  }).catch(function (error) {
    res.status(400).send({
      error: error.message
    });
  });
};

/**
   * get all users ideas
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.getCategory = function (req, res) {
  var category = req.body.category;

  _Idea2.default.paginate({ $and: [{ category: { $regex: '.*' + category + '.*' } }, { ideaStatus: { $ne: 'Private' } }] }, { limit: Number(req.query.limit), page: Number(req.query.page) }).then(function (ideas) {
    var pageInfo = {
      pages: ideas.pages,
      page: ideas.page,
      total: ideas.total
    };
    res.status(200).send({
      ideas: ideas.docs,
      pageInfo: pageInfo,
      message: 'Ideas successfully fetched'
    });
  }).catch(function (error) {
    res.status(400).send({
      error: error.message
    });
  });
};