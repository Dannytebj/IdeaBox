'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _userControllers = require('../controllers/userControllers');

var _userControllers2 = _interopRequireDefault(_userControllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../app');

var expect = _chai2.default.expect;


_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  var jwtToken = void 0;
  var hash = void 0;
  before(function (done) {
    _mongoose2.default.createConnection(process.env.MONGODB_TEST_URI, function () {
      _mongoose2.default.connection.db.dropDatabase(function () {
        done();
      });
    });
  });
  describe('Sign Up', function () {
    it('should return 201 when successful ', function (done) {
      var name = 'Jack Black';
      var email = 'dannytebj@yahoo.com';
      var password = 'abc123';
      var username = 'Jbizzle';
      _chai2.default.request(app).post('/api/v1/signUp', _userControllers2.default.signUp).set('Accept', 'application/json').send({
        email: email, password: password, username: username, name: name
      }).end(function (err, res) {
        if (!err) {
          expect(res).to.have.status(201);
          res.body.should.have.property('message').equal('User successfully created');
          jwtToken = res.body.token;
        }
        done();
      });
    });
    it('should return 409 if email supplied already exist', function (done) {
      var name = 'Jack Black';
      var email = 'dannytebj@yahoo.com';
      var password = 'abc123';
      var username = 'Jbizzle';
      _chai2.default.request(app).post('/api/v1/signUp', _userControllers2.default.signUp).set('Accept', 'application/json').send({
        email: email, password: password, username: username, name: name
      }).end(function (err, res) {
        if (res) {
          expect(res).to.have.status(409);
          res.body.should.have.property('message').equal('The email address is already in use by another account.');
          done();
        }
      });
    });
    it('should return 400 if a badly formatted email is supplied', function (done) {
      var email = 'johndoe4me.com';
      var name = 'Jack Black';
      var password = 'abc123';
      var username = 'Jbizzle';
      _chai2.default.request(app).post('/api/v1/signUp', _userControllers2.default.signUp).set('Accept', 'application/json').send({
        email: email, password: password, username: username, name: name
      }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('Please enter a valid email');
        }
        done();
      });
    });
    it('should return 400 if password supplied is empty', function (done) {
      var password = '';
      var name = 'Jack Black';
      var email = 'dannytebj@yahoo.com';
      var username = 'Jbizzle';
      _chai2.default.request(app).post('/api/v1/signUp', _userControllers2.default.signUp).set('Accept', 'application/json').send({
        email: email, password: password, username: username, name: name
      }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('Password cannot be empty');
        }
        done();
      });
    });
    it('should return 400 if password is weak', function (done) {
      var password = 'abc1';
      var email = 'weakpass@myself.com';
      var name = 'Jack Black';
      var username = 'Jbizzle';
      _chai2.default.request(app).post('/api/v1/signUp', _userControllers2.default.signUp).set('Accept', 'application/json').send({
        email: email, password: password, username: username, name: name
      }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('Password must be a mininum of 6 character');
        }
        done();
      });
    });
  }); // End of SignUp Test Suite

  describe('Sign In', function () {
    it('should return 200 on successful signIn', function (done) {
      var email = 'dannytebj@yahoo.com';
      var password = 'abc123';
      _chai2.default.request(app).post('/api/v1/signIn', _userControllers2.default.signIn).send({ email: email, password: password }).set('Accept', 'application/json').end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('User Sign In successful');
        }
        done();
      });
    });
    it('should return 400 when an Invalid email is passed', function (done) {
      var email = 'johndoe4me.com';
      var password = '';
      _chai2.default.request(app).post('/api/v1/signIn', _userControllers2.default.signIn).send({ email: email, password: password }).set('Accept', 'application/json').end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('Please enter a valid email');
        }
        done();
      });
    });
    it('should return 404 if email supplied does not exist', function (done) {
      var email = 'john.doe4me@gmail.com';
      var password = 'asd123';
      _chai2.default.request(app).post('/api/v1/signIn', _userControllers2.default.signIn).send({ email: email, password: password }).set('Accept', 'application/json').end(function (err, res) {
        if (res) {
          res.status.should.equal(404);
          res.body.should.have.property('message').equal('User record not Found');
        }
        done();
      });
    });
  }); // End of SignIn

  describe('Reset Password', function () {
    it('should return 404 if email address does not exit', function (done) {
      var email = 'kierra@sheard.com';
      _chai2.default.request(app).post('/api/v1/resetPassword', _userControllers2.default.resetPassword).send({ email: email }).set('Accept', 'application/json').end(function (err, res) {
        if (res) {
          res.status.should.equal(404);
          res.body.should.have.property('message').equal('User does not exist');
        }
        done();
      });
    });
    it('should return 200 whan reset mail has been sent', function (done) {
      var email = 'dannytebj@yahoo.com';
      _chai2.default.request(app).post('/api/v1/resetPassword', _userControllers2.default.resetPassword).send({ email: email }).set('Accept', 'application/json').end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('A reset Mail has been sent to your email');
          hash = res.body.hash;
        }
        done();
      });
    });
  }); // End of Reset Password

  describe('Update Password', function () {
    it('should return 400 if new Password is empty', function (done) {
      var newPassword = '';
      var confirmPassword = '123asd';
      _chai2.default.request(app).put('/api/v1/updatePassword/' + hash, _userControllers2.default.updatePassword).set('Accept', 'application/json').send({ newPassword: newPassword, confirmPassword: confirmPassword }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('new Password cannot be empty');
        }
        done();
      });
    });
    it('should return 400 if confirm Password is empty', function (done) {
      var newPassword = '123asd';
      var confirmPassword = '';
      _chai2.default.request(app).put('/api/v1/updatePassword/' + hash, _userControllers2.default.updatePassword).set('Accept', 'application/json').send({ newPassword: newPassword, confirmPassword: confirmPassword }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('confirm Password cannot be empty');
        }
        done();
      });
    });
    it('should return 400 if new password not equal to confirm Password is', function (done) {
      var newPassword = '112qw';
      var confirmPassword = '123asd';
      _chai2.default.request(app).put('/api/v1/updatePassword/' + hash, _userControllers2.default.updatePassword).set('Accept', 'application/json').send({ newPassword: newPassword, confirmPassword: confirmPassword }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('Please kindly confirm your passwords');
        }
        done();
      });
    });
    it('should return 200 when new password has been updated', function (done) {
      var newPassword = '123asd';
      var confirmPassword = '123asd';
      _chai2.default.request(app).put('/api/v1/updatePassword/' + hash, _userControllers2.default.updatePassword).set('Accept', 'application/json').send({ newPassword: newPassword, confirmPassword: confirmPassword }).end(function (err, res) {
        if (res) {
          res.status.should.equal(201);
          res.body.should.have.property('message').equal('Your Password has been updated');
        }
        done();
      });
    });
  });
  describe('Update Profile', function () {
    it('should return 201 when another user is created', function (done) {
      var email = 'dannytebj@gmail.com';
      var password = 'asd123';
      var username = 'dannyboy';
      var name = 'daniel doe';
      _chai2.default.request(app).post('/api/v1/signUp', _userControllers2.default.signUp).set('Accept', 'application/json').send({
        email: email, password: password, username: username, name: name
      }).end(function (err, res) {
        if (!err) {
          expect(res).to.have.status(201);
          res.body.should.have.property('message').equal('User successfully created');
        }
        done();
      });
    });
    it('Should return 409 if new username is already in use', function (done) {
      var username = 'dannyboy';
      var name = 'Dbizzle doe';
      _chai2.default.request(app).put('/api/v1/updateProfile', _userControllers2.default.updateProfile).set('Accept', 'application/json').set('x-access-token', jwtToken).send({ username: username, name: name }).end(function (err, res) {
        if (res) {
          res.status.should.equal(409);
          res.body.should.have.property('message').equal('The username is already in use by another user.');
        }
        done();
      });
    });
    it('Should return 200 if nprofile update is successful', function (done) {
      var username = 'dannyyoo';
      var name = 'Dbizzle21';
      _chai2.default.request(app).put('/api/v1/updateProfile', _userControllers2.default.updateProfile).set('Accept', 'application/json').set('x-access-token', jwtToken).send({ username: username, name: name }).end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('Profile Update successful');
        }
        done();
      });
    });
  });
});