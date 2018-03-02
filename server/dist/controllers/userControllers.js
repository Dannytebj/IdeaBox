'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _convertCase = require('../utils/convertCase');

var _convertCase2 = _interopRequireDefault(_convertCase);

var _GenerateToken = require('../utils/GenerateToken');

var _GenerateToken2 = _interopRequireDefault(_GenerateToken);

var _sendMail = require('../utils/sendMail');

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * signup a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.signUp = function (req, res) {
  _User2.default.findOne({
    email: req.body.email
  }).exec().then(function (email) {
    if (email) {
      res.status(409).send({
        message: 'The email address is already in use by another account.',
        success: false
      });
    } else {
      _User2.default.findOne({
        username: (0, _convertCase2.default)(req.body.username)
      }).exec().then(function (username) {
        if (username) {
          res.status(409).send({
            message: 'A User record with this username already exist',
            success: false
          });
        } else {
          var _req$body = req.body,
              _email = _req$body.email,
              name = _req$body.name,
              password = _req$body.password,
              _username = _req$body.username;

          var user = new _User2.default({
            name: name,
            username: (0, _convertCase2.default)(_username),
            password: password,
            email: _email
          });
          user.save(function (error, newUser) {
            if (error) {
              return res.status(500).send({
                success: false,
                message: error
              });
            }
            return res.status(201).send({
              success: true,
              token: (0, _GenerateToken2.default)(newUser),
              message: 'User successfully created',
              username: newUser.username
            });
          });
        }
      }).catch(function (error) {
        res.status(500).send({ message: 'Internal server error', error: error });
      });
    }
  }).catch(function (error) {
    res.status(500).send({ message: 'Internal server error', error: error });
  });
};

/**
   * sign In a registered user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.signIn = function (req, res) {
  req.check('email', 'email address cannot be empty').notEmpty();
  req.check('email', 'Please enter a valid email').isEmail();
  req.check('password', 'Password cannot be empty').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var message = errors[0].msg;
    res.status(400).send({ message: message });
  } else {
    _User2.default.findOne({
      email: req.body.email
    }).exec(function (error, response) {
      if (error) {
        return res.status(500).send({
          success: false,
          message: 'internal server error'
        });
      }
      if (!response) {
        return res.status(404).send({
          success: false,
          message: 'User record not Found'
        });
      }
      // compare users hash passwords
      if (!_bcrypt2.default.compareSync(req.body.password, response.password)) {
        return res.status(422).send({
          success: false,
          message: 'this password is incorrect'
        });
      }
      return res.status(200).send({
        message: 'User Sign In successful',
        success: true,
        username: response.username,
        token: (0, _GenerateToken2.default)(response)
      });
    });
  }
};
/**
 * @description Method that sends reset password link
 * @param {any} req
 * @param {any} res
 * @return {void}
 */
exports.resetPassword = function (req, res) {
  req.body.email = req.body.email.trim();
  var hash = _crypto2.default.randomBytes(20).toString('hex');
  var date = Date.now() + 3600000;
  if (req.body.email) {
    return _User2.default.findOne({
      email: req.body.email
    }).then(function (user) {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist'
        });
      }
      user.hash = hash;
      user.expiry = date;
      user.save(function (error, updatedUser) {
        if (error) {
          return res.status(400).send({
            success: false,
            message: error
          });
        }
        // send mail to the user
        (0, _sendMail2.default)(updatedUser.email, hash, req.headers.host);
        res.status(200).send({
          success: true,
          hash: hash,
          message: 'A reset Mail has been sent to your email'
        });
      });
    }).catch(function (error) {
      return res.status(500).send({
        message: error.message
      });
    });
  }
  return res.status(500).send({
    success: false,
    message: 'An error occuered sending the email'
  });
};
/**
 * @description Method that updates user password with new password
 * @param {any} req
 * @param {any} res
 * @return {void}
 */
exports.updatePassword = function (req, res) {
  return _User2.default.findOne({ hash: req.params.hash }).then(function (user) {
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User does not exist'
      });
    }
    req.check('newPassword', 'new Password cannot be empty').trim().notEmpty();
    req.check('confirmPassword', 'confirm Password cannot be empty').trim().notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      var message = errors[0].msg;
      res.status(400).send({ message: message });
    } else if (req.body.newPassword === req.body.confirmPassword) {
      var currentTime = Date.now();
      if (currentTime > user.expiry) {
        return res.status(410).send({
          success: false,
          message: 'Expired link'
        });
      }
      user.password = req.body.newPassword;
      user.save(function (error, updatedUser) {
        if (error) {
          return res.status(400).send({
            success: false,
            message: error.message
          });
        }
        var userDetails = {
          userId: updatedUser._id,
          email: updatedUser.email
        };
        res.status(201).send({
          success: true,
          message: 'Your Password has been updated',
          userDetails: userDetails
        });
      });
    } else {
      return res.status(400).send({
        success: false,
        message: 'Please kindly confirm your passwords'
      });
    }
  }).catch(function (error) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  });
};

/**
 * Allows user update profile
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} - success or failure message
 */
exports.updateProfile = function (req, res) {
  var newName = (0, _convertCase2.default)(req.body.username);
  _User2.default.findOne({
    username: newName
  }).exec().then(function (username) {
    if (username) {
      res.status(409).send({
        message: 'The username is already in use by another user.',
        success: false
      });
    } else {
      var _req$body2 = req.body,
          name = _req$body2.name,
          _username2 = _req$body2.username;

      _User2.default.findByIdAndUpdate({ _id: req.decoded._id }, {
        $set: {
          name: name,
          username: _username2
        }
      }, { new: true }).exec(function (error, user) {
        if (user) {
          return res.status(201).send({
            user: {
              name: user.name,
              username: user.username
            },
            message: 'Profile Update successful'
          });
        }
        return res.status(404).send({ message: 'User not Found' });
      }).catch(function (error) {
        return res.status(500).send({ error: error });
      });
    }
  });
};