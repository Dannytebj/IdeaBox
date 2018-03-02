'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_WORK_FACTOR = 10;
var userSchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: { type: String },
  expiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash users password
userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  _bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    _bcrypt2.default.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (userPassword, callback) {
  _bcrypt2.default.compare(userPassword, undefined.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;