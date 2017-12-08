import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';
import convertCase from '../utils/convertCase';
import GenerateToken from '../utils/GenerateToken';
import sendMail from '../utils/sendMail';

/**
   * signup a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.signUp = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((email) => {
      if (email) {
        res.status(409).send({
          message: 'The email address is already in use by another account.',
          success: false
        });
      } else {
        User.findOne({
          username: convertCase(req.body.username)
        })
          .exec()
          .then((username) => {
            if (username) {
              res.status(409).send({
                message: 'A User record with this username already exist',
                success: false
              });
            } else {
              const {
                email, name, password, username
              }
              = req.body;
              const user = new User({
                name,
                username: convertCase(username),
                password,
                email
              });
              user.save((error, newUser) => {
                if (error) {
                  return res.status(500).send({
                    success: false,
                    message: error
                  });
                }
                return res.status(201).send({
                  success: true,
                  token: GenerateToken(newUser),
                  message: 'User successfully created',
                  username: newUser.username,
                });
              });
            }
          })
          .catch((error) => {
            res.status(500)
              .send({ message: 'Internal server error', error });
          });
      }
    }).catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};

/**
   * sign In a registered user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
exports.signIn = (req, res) => {
  req.check('email', 'email address cannot be empty').notEmpty();
  req.check('email', 'Please enter a valid email').isEmail();
  req.check('password', 'Password cannot be empty').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    User.findOne({
      email: req.body.email
    })
      .exec((error, response) => {
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
        if (!bcrypt.compareSync(req.body.password, response.password)) {
          return res.status(422).send({
            success: false,
            message: 'this password is incorrect'
          });
        }
        return res.status(200).send({
          message: 'User Sign In successful',
          success: true,
          username: response.username,
          token: GenerateToken(response)
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
exports.resetPassword = (req, res) => {
  req.body.email = req.body.email.trim();
  const hash = crypto.randomBytes(20).toString('hex');
  const date = Date.now() + 3600000;
  if (req.body.email) {
    return User.findOne({
      email: req.body.email
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist'
        });
      }
      user.hash = hash;
      user.expiry = date;
      user.save((error, updatedUser) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: error
          });
        }
        // send mail to the user
        sendMail(updatedUser.email, hash, req.headers.host);
        res.status(200)
          .send({
            success: true,
            hash,
            message: 'A reset Mail has been sent to your email'
          });
      });
    }).catch(error => res.status(500).send({
      message: error.message
    }));
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
exports.updatePassword = (req, res) =>
  User.findOne({ hash: req.params.hash })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist'
        });
      }
      req.check('newPassword', 'new Password cannot be empty').trim().notEmpty();
      req.check('confirmPassword', 'confirm Password cannot be empty').trim().notEmpty();
      const errors = req.validationErrors();
      if (errors) {
        const message = errors[0].msg;
        res.status(400).send({ message });
      } else
      if (req.body.newPassword === req.body.confirmPassword) {
        const currentTime = Date.now();
        if (currentTime > user.expiry) {
          return res.status(410).send({
            success: false,
            message: 'Expired link'
          });
        }
        user.password = req.body.newPassword;
        user.save((error, updatedUser) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: error.message
            });
          }
          const userDetails = {
            userId: updatedUser._id,
            email: updatedUser.email,
          };
          res.status(201).send({
            success: true,
            message: 'Your Password has been updated',
            userDetails
          });
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'Please kindly confirm your passwords'
        });
      }
    })
    .catch(error => res.status(500).send({
      success: false,
      message: error.message
    }));

/**
 * Allows user update profile
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} - success or failure message
 */
exports.updateProfile = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((email) => {
      if (email) {
        res.status(409).send({
          message: 'The email address is already in use by another account.',
          success: false
        });
      } else {
        const { name, email } = req.body;
        User.findByIdAndUpdate(
          { _id: req.decoded._id },
          {
            $set: {
              name,
              email,
            },
          },
          { new: true },
        )
          .exec((error, user) => {
            if (user) {
              return res.status(200).send({
                user: {
                  name: user.name,
                  email: user.email,
                },
                message: 'Profile Update successful',
              });
            }
            return res.status(404).send({ message: 'User not Found' });
          })
          .catch(error =>
            res.status(500).send({ error }));
      }
    });
};
