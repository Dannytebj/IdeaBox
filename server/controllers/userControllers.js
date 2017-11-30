import bcrypt from 'bcrypt';
import User from '../models/User';
import convertCase from '../utils/convertCase';
import GenerateToken from '../utils/GenerateToken';

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
                const userDetails = {
                  email: newUser.email,
                  username: newUser.username
                };
                return res.status(201).send({
                  success: true,
                  token: GenerateToken(newUser),
                  message: 'User successfully created',
                  userDetails,
                });
              });
            }
          });
      }
    });
};

/**
   * signup a new user
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
        const userDetails = {
          userId: response._id,
          email: response.email,
        };
        return res.status(200).send({
          message: 'User Sign In successful',
          success: true,
          user: userDetails,
          token: GenerateToken(response)
        });
      });
  }
};

