'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = process.env.SECRET;

exports.validateToken = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ message: 'User not authorized' });
  }
  _jsonwebtoken2.default.verify(token, secret, function (error, decoded) {
    if (error) {
      return res.status(401).send({
        message: 'Token authentication failed'
      });
    }
    req.decoded = decoded.token.user;
    next();
  });
};

exports.validateIdea = function (req, res, next) {
  req.check('title', 'title cannot be empty').notEmpty();
  req.check('description', 'description cannot be empty').notEmpty();
  req.check('ideaStatus', 'Idea status cannot be empty').notEmpty();
  req.check('category', 'category cannot be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    var message = errors[0].msg;
    res.status(400).send({ message: message });
  } else {
    next();
  }
};

exports.validateSignUp = function (req, res, next) {
  req.check('email', 'email address cannot be empty').notEmpty();
  req.check('email', 'Please enter a valid email').isEmail();
  req.check('username', 'Username cannot be empty').notEmpty();
  req.check('name', 'Username cannot be empty').notEmpty();
  req.check('password', 'Password cannot be empty').notEmpty();
  req.check('password', 'Password must be a mininum of 6 character').isLength(6, 50);
  var errors = req.validationErrors();
  if (errors) {
    var message = errors[0].msg;
    res.status(400).send({ message: message });
  } else {
    next();
  }
};

exports.validateProfile = function (req, res, next) {
  req.check('username', 'username address cannot be empty').notEmpty();
  req.check('name', 'name cannot be empty').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var message = errors[0].msg;
    res.status(400).send({ message: message });
  } else {
    next();
  }
};