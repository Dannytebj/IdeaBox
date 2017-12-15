'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

/**
 * @description When called, this function generates a
 * token
 * @param {Object} user request object
 * @return {string} Token
 */

exports.default = function (user) {
  var Token = _jsonwebtoken2.default.sign({ token: { user: user } }, process.env.SECRET);
  return Token;
};