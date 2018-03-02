'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _convertCase = require('../utils/convertCase');

var _convertCase2 = _interopRequireDefault(_convertCase);

var _testSeeders = require('../utils/testSeeders');

var _testSeeders2 = _interopRequireDefault(_testSeeders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;


describe('User Model', function () {
  it('Should Create a new user', function (done) {
    var name = _testSeeders2.default.name,
        username = _testSeeders2.default.username,
        password = _testSeeders2.default.password,
        email = _testSeeders2.default.email;

    var user = new _User2.default({
      name: name,
      username: (0, _convertCase2.default)(username),
      password: password,
      email: email
    });
    user.save(function (error, newUser) {
      if (!error) {
        expect(newUser.email).to.eql('dannytebjj@gmail.com');
        expect(newUser.username).to.eql('Dannyboy');
        done();
      }
    });
  });
  it('Should throw an error if name field is not provided', function (done) {
    var username = _testSeeders2.default.username,
        password = _testSeeders2.default.password,
        email = _testSeeders2.default.email;

    var user = new _User2.default({
      username: (0, _convertCase2.default)(username),
      password: password,
      email: email
    });
    user.save(function (error) {
      if (error) {
        expect(error.errors.name.message).to.eql('Path `name` is required.');
        done();
      }
    });
  });
});