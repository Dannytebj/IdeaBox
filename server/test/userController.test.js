import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import userControllers from '../controllers/userControllers';


const app = require('../app');

const { expect } = chai;

chai.should();
chai.use(chaiHttp);


describe('Users', () => {
  describe('Sign Up', () => {
    let email;
    let name;
    let password;
    let username;
    beforeEach(() => {
      name = faker.name.findName();
      email = faker.internet.email();
      password = 'abc123';
      username = faker.name.firstName();
    });
    it('should return 201 when successful ', (done) => {
      chai.request(app)
        .post('/api/v1/signUp', userControllers.signUp)
        .send({
          email, password, username, name
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('User successfully created');
          }
          done();
        });
    });
    it('should return 409 if email supplied already exist', (done) => {
      const email = 'dannytebj@gmaiil.com';
      chai.request(app)
        .post('/api/v1/signUp', userControllers.signUp)
        .send({
          email, password, username, name
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal('The email address is already in use by another account.');
            done();
          }
        });
    });
    it('should return 400 if a badly formatted email is supplied', (done) => {
      const email = 'johndoe4me.com';
      chai.request(app)
        .post('/api/v1/signUp', userControllers.signUp)
        .send({
          email, password, username, name
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Please enter a valid email');
          }
          done();
        });
    });
    it('should return 400 if password supplied is empty', (done) => {
      const password = '';
      chai.request(app)
        .post('/api/v1/signUp', userControllers.signUp)
        .send({
          email, password, username, name
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Password cannot be empty');
          }
          done();
        });
    });
    it('should return 400 if password is weak', (done) => {
      const password = 'abc1';
      const email = 'weakpass@myself.com';
      chai.request(app)
        .post('/api/v1/signUp', userControllers.signUp)
        .send({
          email, password, username, name
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Password must be a mininum of 6 character');
          }
          done();
        });
    });
  }); // End of SignUp Test Suite

  describe('Sign In', () => {
    let email;
    let password;
    beforeEach(() => {
      email = 'dannytebj@gmail.com';
      password = 'abc123';
    });
    it('should return 200 on successful signIn', (done) => {
      chai.request(app)
        .post('/api/v1/signIn', userControllers.signIn)
        .send({ email, password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('User Sign In successful');
          }
          done();
        });
    });
    it('should return 400 when an Invalid email is passed', (done) => {
      const email = 'johndoe4me.com';
      const password = '';
      chai.request(app)
        .post('/api/v1/signIn', userControllers.signIn)
        .send({ email, password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Please enter a valid email');
          }
          done();
        });
    });
    it('should return 404 if email supplied does not exist', (done) => {
      const email = 'john.doe4me@gmail.com';
      const password = 'asd123';
      chai.request(app)
        .post('/api/v1/signIn', userControllers.signIn)
        .send({ email, password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(404);
            res.body.should.have.property('message')
              .equal('User record not Found');
          }
          done();
        });
    });
  }); // End of SignIn

  describe('Reset Password', () => {
    it('should return 404 if email address does not exit', (done) => {
      const email = 'kierra@sheard.com';
      chai.request(app)
        .post('/api/v1/resetPassword', userControllers.resetPassword)
        .send({ email })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(404);
            res.body.should.have.property('message')
              .equal('User does not exist');
          }
          done();
        });
    });
    it('should return 200 whan reset mail has been sent', (done) => {
      const email = 'dannytebj@gmail.com';
      chai.request(app)
        .post('/api/v1/resetPassword', userControllers.resetPassword)
        .send({ email })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('A reset Mail has been sent to your email');
          }
          done();
        });
    });
  }); // End of Reset Password

  describe('Update Password', () => {
    it('should return 400 if new Password is empty', (done) => {
      const newPassword = '';
      const confirmPassword = '123asd';
      const hash = 'd006d5b7e105f1d1e517066738e15b25cd1d3631';
      chai.request(app)
        .put(`/api/v1/updatePassword/${hash}`, userControllers.updatePassword)
        .send({ newPassword, confirmPassword })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('new Password cannot be empty');
          }
          done();
        });
    });
    it('should return 400 if confirm Password is empty', (done) => {
      const newPassword = '';
      const confirmPassword = '123asd';
      const hash = 'd006d5b7e105f1d1e517066738e15b25cd1d3631';
      chai.request(app)
        .put(`/api/v1/updatePassword/${hash}`, userControllers.updatePassword)
        .send({ newPassword, confirmPassword })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('new Password cannot be empty');
          }
          done();
        });
    });
    it(
      'should return 400 if new password not equal to confirm Password is',
      (done) => {
        const newPassword = '112qw';
        const confirmPassword = '123asd';
        const hash = 'd006d5b7e105f1d1e517066738e15b25cd1d3631';
        chai.request(app)
          .put(`/api/v1/updatePassword/${hash}`, userControllers.updatePassword)
          .send({ newPassword, confirmPassword })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(400);
              res.body.should.have.property('message')
                .equal('Please kindly confirm your passwords');
            }
            done();
          });
      }
    );
    it('should return 200 when new password has been updated', (done) => {
      const hash = 'd006d5b7e105f1d1e517066738e15b25cd1d3631';
      const newPassword = '123asd';
      const confirmPassword = '123asd';
      chai.request(app)
        .put(`/api/v1/updatePassword/${hash}`, userControllers.updatePassword)
        .send({ newPassword, confirmPassword })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(404);
            res.body.should.have.property('message')
              .equal('User does not exist');
          }
          done();
        });
    });
  });
});

