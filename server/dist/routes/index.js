'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userControllers = require('../controllers/userControllers');

var _userControllers2 = _interopRequireDefault(_userControllers);

var _ideaControllers = require('../controllers/ideaControllers');

var _ideaControllers2 = _interopRequireDefault(_ideaControllers);

var _commentController = require('../controllers/commentController');

var _commentController2 = _interopRequireDefault(_commentController);

var _validators = require('../middlewares/validators');

var _validators2 = _interopRequireDefault(_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post('/api/v1/user/signUp', _validators2.default.validateSignUp, _userControllers2.default.signUp);
router.post('/api/v1/user/signIn', _userControllers2.default.signIn);
router.post('/api/v1/user/resetPassword', _userControllers2.default.resetPassword);
router.put('/api/v1/user/updatePassword/:hash', _userControllers2.default.updatePassword);
router.put('/api/v1/user/updateProfile', _validators2.default.validateToken, _validators2.default.validateProfile, _userControllers2.default.updateProfile);
router.post('/api/v1/idea', _validators2.default.validateToken, _validators2.default.validateIdea, _ideaControllers2.default.create);
router.delete('/api/v1/idea/:ideaId', _validators2.default.validateToken, _ideaControllers2.default.delete);
router.put('/api/v1/idea', _validators2.default.validateToken, _validators2.default.validateIdea, _ideaControllers2.default.editIdea);
router.post('/api/v1/search', _ideaControllers2.default.publicIdeas);
router.post('/api/v1/idea/category', _ideaControllers2.default.getCategory);
router.get('/api/v1/user/ideas', _validators2.default.validateToken, _ideaControllers2.default.getUsersIdeas);
router.post('/api/v1/comment', _validators2.default.validateToken, _commentController2.default.create);
router.get('/api/v1/comment/:ideaId', _commentController2.default.fetchComment);

exports.default = router;