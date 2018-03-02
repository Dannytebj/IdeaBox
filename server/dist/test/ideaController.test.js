'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _ideaControllers = require('../controllers/ideaControllers');

var _ideaControllers2 = _interopRequireDefault(_ideaControllers);

var _userControllers = require('../controllers/userControllers');

var _userControllers2 = _interopRequireDefault(_userControllers);

var _commentController = require('../controllers/commentController');

var _commentController2 = _interopRequireDefault(_commentController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../app');

var expect = _chai2.default.expect;


_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

var jwtToken = void 0;
describe('Ideas', function () {
  var token2 = void 0;
  var ideaId = void 0;
  before(function (done) {
    var email = 'dannytebj@gmail.com';
    var password = 'asd123';
    _chai2.default.request(app).post('/api/v1/user/signIn', _userControllers2.default.signIn).set('Accept', 'application/json').send({ email: email, password: password }).end(function (err, res) {
      if (res) {
        jwtToken = res.body.token;
      }
      done();
    });
  });

  describe('Create method', function () {
    it('Should return 201 when an Idea is created', function (done) {
      var title = 'Test';
      var description = 'Testing is fun';
      var category = 'Test';
      var ideaStatus = 'Public';
      _chai2.default.request(app).post('/api/v1/idea', _ideaControllers2.default.create).set('Accept', 'application/json').send({
        title: title, description: description, category: category, ideaStatus: ideaStatus
      }).set('x-access-token', jwtToken).end(function (err, res) {
        if (res) {
          res.status.should.equal(201);
          res.body.should.have.property('message').equal('Your just created an idea');
          ideaId = res.body.postedIdea._id;
        }
        done();
      });
    });
    it('Should return 400 when title field is left empty', function (done) {
      var title = '';
      var description = 'Testing is fun';
      var category = 'Test';
      var status = 'public';
      _chai2.default.request(app).post('/api/v1/idea', _ideaControllers2.default.create).set('Accept', 'application/json').set('x-access-token', jwtToken).send({
        title: title, description: description, category: category, status: status
      }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('title cannot be empty');
        }
        done();
      });
    });
    it('Should return 400 when title field is left empty', function (done) {
      var title = 'Test';
      var description = '';
      var category = 'Test';
      var status = 'public';
      _chai2.default.request(app).post('/api/v1/idea', _ideaControllers2.default.create).send({
        title: title, description: description, category: category, status: status
      }).set('Accept', 'application/json').set('x-access-token', jwtToken).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('description cannot be empty');
        }
        done();
      });
    });
  });
  describe('Get Users Idea Method:', function () {
    it('should return 200 when users ideas are fetched', function (done) {
      _chai2.default.request(app).get('/api/v1/user/ideas?offset=1&limit=5', _ideaControllers2.default.getUsersIdeas).set('Accept', 'application/json').set('x-access-token', jwtToken).end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('Ideas successfully fetched');
          expect(res.body).to.have.property('pageInfo');
        }
        done();
      });
    });
  });

  describe('Edit Idea method', function () {
    it('Should return 200 when an idea is edited', function (done) {
      var title = 'Editted Test';
      var description = 'I editted the content';
      var category = 'Test';
      var ideaStatus = 'public';
      _chai2.default.request(app).put('/api/v1/idea', _ideaControllers2.default.editIdea).send({
        title: title, description: description, category: category, ideaStatus: ideaStatus, ideaId: ideaId
      }).set('Accept', 'application/json').set('x-access-token', jwtToken).end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('Idea updated successfully!');
        }
        done();
      });
    });
    it('should signIn another user ', function (done) {
      var email = 'dannytebj@yahoo.com';
      var password = '123asd';
      _chai2.default.request(app).post('/api/v1/user/signIn', _userControllers2.default.signIn).send({ email: email, password: password }).set('Accept', 'application/json').end(function (err, res) {
        if (res) {
          token2 = res.body.token;
        }
        done();
      });
    });
    it('should return 403 if user editting an idea is not the author', function (done) {
      var title = 'Editted Test';
      var description = 'I editted the content';
      var category = 'Test';
      var ideaStatus = 'public';
      _chai2.default.request(app).put('/api/v1/idea', _ideaControllers2.default.editIdea).send({
        title: title, description: description, category: category, ideaStatus: ideaStatus, ideaId: ideaId
      }).set('Accept', 'application/json').set('x-access-token', token2).end(function (err, res) {
        if (res) {
          res.status.should.equal(403);
          res.body.should.have.property('message').equal('Sorry only the author can edit this idea!');
        }
        done();
      });
    });
  });

  describe('Delete Method', function () {
    it('should return 403 if the user deleting an idea is not the author', function (done) {
      _chai2.default.request(app).delete('/api/v1/idea/' + ideaId, _ideaControllers2.default.delete).set('Accept', 'application/json').set('x-access-token', token2).end(function (err, res) {
        if (res) {
          res.status.should.equal(403);
          res.body.should.have.property('message').equal('Sorry only the author can delete this idea!');
        }
        done();
      });
    });
    it('should return 200 when the author of an idea deletes that idea', function (done) {
      _chai2.default.request(app).delete('/api/v1/idea/' + ideaId, _ideaControllers2.default.delete).set('Accept', 'application/json').set('x-access-token', jwtToken).end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('Idea deleted successfully');
        }
        done();
      });
    });
  });
  describe('Search Method', function () {
    it('should return 200 if searhedTerm is found', function (done) {
      var searchQuery = 'Test';
      _chai2.default.request(app).post('/api/v1/search?offset=1&limit=5', _ideaControllers2.default.publicIdeas).set('Accept', 'application/json').set('x-access-token', jwtToken).send({ searchQuery: searchQuery }).end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('Ideas successfully fetched');
          expect(res.body).to.have.property('pageInfo');
        }
        done();
      });
    });
  });
  describe('Filter Method', function () {
    it('should return 200 if category is found', function (done) {
      var category = 'Test';
      _chai2.default.request(app).post('/api/v1/idea/category?offset=1&limit=5', _ideaControllers2.default.getCategory).set('Accept', 'application/json').set('x-access-token', jwtToken).send({ category: category }).end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('Ideas successfully fetched');
          expect(res.body).to.have.property('pageInfo');
        }
        done();
      });
    });
  });
}); // End of Test Suite

describe('Comments', function () {
  var ideaId = void 0;
  before(function (done) {
    var title = 'Test';
    var description = 'Testing is fun';
    var category = 'Test';
    var ideaStatus = 'public';
    _chai2.default.request(app).post('/api/v1/idea', _ideaControllers2.default.create).set('Accept', 'application/json').send({
      title: title, description: description, category: category, ideaStatus: ideaStatus
    }).set('x-access-token', jwtToken).end(function (err, res) {
      if (res) {
        ideaId = res.body.postedIdea._id;
      }
      done();
    });
  });

  describe('Create method', function () {
    it('should return 200 when comment is saved', function (done) {
      var comment = 'Nice App Baddoo';
      _chai2.default.request(app).post('/api/v1/comment', _commentController2.default.create).set('Accept', 'application/json').set('x-access-token', jwtToken).send({ ideaId: ideaId, comment: comment }).end(function (err, res) {
        if (res) {
          res.status.should.equal(201);
          res.body.should.have.property('message').equal('Comment saved successfully!');
        }
        done();
      });
    });
    it('should return 400 if comment field is empty', function (done) {
      var comment = '';
      _chai2.default.request(app).post('/api/v1/comment', _commentController2.default.create).set('Accept', 'application/json').set('x-access-token', jwtToken).send({ ideaId: ideaId, comment: comment }).end(function (err, res) {
        if (res) {
          res.status.should.equal(400);
          res.body.should.have.property('message').equal('comment field cannot be empty');
        }
        done();
      });
    });
    it('should return 404 if idea not found', function (done) {
      var comment = 'Nice App Baddoo';
      var ideaId = '5a264b0d5298759168667fe5';
      _chai2.default.request(app).post('/api/v1/comment', _commentController2.default.create).set('Accept', 'application/json').set('x-access-token', jwtToken).send({ ideaId: ideaId, comment: comment }).end(function (err, res) {
        if (res) {
          res.status.should.equal(404);
          res.body.should.have.property('message').equal('idea not found!');
        }
        done();
      });
    });
  });
  describe('Fetch Method', function () {
    it('should return 200 when comments are fetched successfully', function (done) {
      _chai2.default.request(app).get('/api/v1/comment/' + ideaId, _commentController2.default.fetchComment).set('Accept', 'application/json').set('x-access-token', jwtToken).end(function (err, res) {
        if (res) {
          res.status.should.equal(200);
          res.body.should.have.property('message').equal('Comments fetched Successfully!');
        }
        done();
      });
    });
  });
});