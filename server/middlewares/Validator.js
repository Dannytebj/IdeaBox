
const validateInputs = (req, res, next) => {
  req.check('email', 'email address cannot be empty').notEmpty();
  req.check('email', 'Please enter a valid email').isEmail();
  req.check('username', 'Username cannot be empty').notEmpty();
  req.check('name', 'Username cannot be empty').notEmpty();
  req.check('password', 'Password cannot be empty').notEmpty();
  req.check('password', 'Password must be a mininum of 6 character')
    .isLength(6, 50);
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    next();
  }
};

export default validateInputs;
