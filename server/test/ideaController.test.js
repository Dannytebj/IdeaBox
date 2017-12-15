import chai from 'chai';
import chaiHttp from 'chai-http';
import ideaController from '../controllers/ideaControllers';
import userControllers from '../controllers/userControllers';
import commentController from '../controllers/commentController';

const app = require('../app');

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

let jwtToken;
describe('Ideas', () => {
  let token2;
  let ideaId;
  before((done) => {
    const email = 'dannytebj@gmail.com';
    const password = 'asd123';
    chai.request(app)
      .post('/api/v1/user/signIn', userControllers.signIn)
      .set('Accept', 'application/json')
      .send({ email, password })
      .end((err, res) => {
        if (res) {
          jwtToken = res.body.token;
        }
        done();
      });
  });

  describe('Create method', () => {
    it('Should return 201 when an Idea is created', (done) => {
      const title = 'Test';
      const description = 'Testing is fun';
      const category = 'Test';
      const ideaStatus = 'Public';
      chai.request(app)
        .post('/api/v1/idea', ideaController.create)
        .set('Accept', 'application/json')
        .send({
          title, description, category, ideaStatus
        })
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          if (res) {
            res.status.should.equal(201);
            res.body.should.have.property('message')
              .equal('Your just created an idea');
            ideaId = res.body.postedIdea._id;
          }
          done();
        });
    });
    it('Should return 400 when title field is left empty', (done) => {
      const title = '';
      const description = 'Testing is fun';
      const category = 'Test';
      const status = 'public';
      chai.request(app)
        .post('/api/v1/idea', ideaController.create)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, category, status
        })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('title cannot be empty');
          }
          done();
        });
    });
    it('Should return 400 when title field is left empty', (done) => {
      const title = 'Test';
      const description = '';
      const category = 'Test';
      const status = 'public';
      chai.request(app)
        .post('/api/v1/idea', ideaController.create)
        .send({
          title, description, category, status
        })
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('description cannot be empty');
          }
          done();
        });
    });
  });
  describe('Get Users Idea Method:', () => {
    it('should return 200 when users ideas are fetched', (done) => {
      const searchQuery = 'Testing';
      chai.request(app)
        .get('/api/v1/user/ideas?offset=1&limit=5', ideaController.getUsersIdeas)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({ searchQuery })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Ideas successfully fetched');
            expect(res.body).to.have.property('pageInfo');
          }
          done();
        });
    });
  });

  describe('Edit Idea method', () => {
    it('Should return 200 when an idea is edited', (done) => {
      const title = 'Editted Test';
      const description = 'I editted the content';
      const category = 'Test';
      const ideaStatus = 'public';
      chai.request(app)
        .put('/api/v1/idea', ideaController.editIdea)
        .send({
          title, description, category, ideaStatus, ideaId
        })
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Idea updated successfully!');
          }
          done();
        });
    });
    it('should signIn another user ', (done) => {
      const email = 'dannytebj@yahoo.com';
      const password = '123asd';
      chai.request(app)
        .post('/api/v1/user/signIn', userControllers.signIn)
        .send({ email, password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            token2 = res.body.token;
          }
          done();
        });
    });
    it('should return 403 if user editting an idea is not the author', (done) => {
      const title = 'Editted Test';
      const description = 'I editted the content';
      const category = 'Test';
      const ideaStatus = 'public';
      chai.request(app)
        .put('/api/v1/idea', ideaController.editIdea)
        .send({
          title, description, category, ideaStatus, ideaId
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token2)
        .end((err, res) => {
          if (res) {
            res.status.should.equal(403);
            res.body.should.have.property('message')
              .equal('Sorry only the author can edit this idea!');
          }
          done();
        });
    });
  });

  describe('Delete Method', () => {
    it(
      'should return 403 if the user deleting an idea is not the author',
      (done) => {
        chai.request(app)
          .delete(`/api/v1/idea/${ideaId}`, ideaController.delete)
          .set('Accept', 'application/json')
          .set('x-access-token', token2)
          .end((err, res) => {
            if (res) {
              res.status.should.equal(403);
              res.body.should.have.property('message')
                .equal('Sorry only the author can delete this idea!');
            }
            done();
          });
      }
    );
    it(
      'should return 200 when the author of an idea deletes that idea',
      (done) => {
        chai.request(app)
          .delete(`/api/v1/idea/${ideaId}`, ideaController.delete)
          .set('Accept', 'application/json')
          .set('x-access-token', jwtToken)
          .end((err, res) => {
            if (res) {
              res.status.should.equal(200);
              res.body.should.have.property('message')
                .equal('Idea deleted successfully');
            }
            done();
          });
      }
    );
  });
  describe('Search Method', () => {
    it('should return 200 if searhedTerm is found', (done) => {
      const searchQuery = 'Test';
      chai.request(app)
        .post('/api/v1/search?offset=1&limit=5', ideaController.publicIdeas)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({ searchQuery })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Ideas successfully fetched');
            expect(res.body).to.have.property('pageInfo');
          }
          done();
        });
    });
  });
}); // End of Test Suite

describe('Comments', () => {
  let ideaId;
  before((done) => {
    const title = 'Test';
    const description = 'Testing is fun';
    const category = 'Test';
    const ideaStatus = 'public';
    chai.request(app)
      .post('/api/v1/idea', ideaController.create)
      .set('Accept', 'application/json')
      .send({
        title, description, category, ideaStatus
      })
      .set('x-access-token', jwtToken)
      .end((err, res) => {
        if (res) {
          ideaId = res.body.postedIdea._id;
        }
        done();
      });
  });
  describe('Create method', () => {
    it('should return 200 when comment is saved', (done) => {
      const comment = 'Nice App Baddoo';
      chai.request(app)
        .post('/api/v1/comment', commentController.create)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({ ideaId, comment })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(201);
            res.body.should.have.property('message')
              .equal('Comment saved successfully!');
          }
          done();
        });
    });
    it('should return 404 if idea not found', (done) => {
      const comment = 'Nice App Baddoo';
      const ideaId = '5a264b0d5298759168667fe5';
      chai.request(app)
        .post('/api/v1/comment', commentController.create)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({ ideaId, comment })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(404);
            res.body.should.have.property('message')
              .equal('idea not found!');
          }
          done();
        });
    });
  });
});

