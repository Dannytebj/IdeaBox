import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import userControllers from '../controllers/userControllers';


const app = require('../app');

const { expect } = chai;

chai.should();
chai.use(chaiHttp);


describe('Users', () => {
  let jwtToken;
  let hash;
  before((done) => {
    mongoose.createConnection(process.env.MONGODB_TEST_URI, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });
  describe('Sign Up', () => {
    it('should return 201 when successful ', (done) => {
      const name = 'Jack Black';
      const email = 'dannytebj@yahoo.com';
      const password = 'abc123';
      const username = 'Jbizzle';
      chai.request(app)
        .post('/api/v1/user/signUp', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, password, username, name
        })
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('User successfully created');
            jwtToken = res.body.token;
          }
          done();
        });
    });
    it('should return 409 if email supplied already exist', (done) => {
      const name = 'Jack Black';
      const email = 'dannytebj@yahoo.com';
      const password = 'abc123';
      const username = 'Jbizzle';
      chai.request(app)
        .post('/api/v1/user/signUp', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, password, username, name
        })
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
      const name = 'Jack Black';
      const password = 'abc123';
      const username = 'Jbizzle';
      chai.request(app)
        .post('/api/v1/user/signUp', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, password, username, name
        })
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
      const name = 'Jack Black';
      const email = 'dannytebj@yahoo.com';
      const username = 'Jbizzle';
      chai.request(app)
        .post('/api/v1/user/signUp', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, password, username, name
        })
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
      const name = 'Jack Black';
      const username = 'Jbizzle';
      chai.request(app)
        .post('/api/v1/user/signUp', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, password, username, name
        })
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
    it('should return 200 on successful signIn', (done) => {
      const email = 'dannytebj@yahoo.com';
      const password = 'abc123';
      chai.request(app)
        .post('/api/v1/user/signIn', userControllers.signIn)
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
        .post('/api/v1/user/signIn', userControllers.signIn)
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
        .post('/api/v1/user/signIn', userControllers.signIn)
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
        .post('/api/v1/user/resetPassword', userControllers.resetPassword)
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
      const email = 'dannytebj@yahoo.com';
      chai.request(app)
        .post('/api/v1/user/resetPassword', userControllers.resetPassword)
        .send({ email })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('A reset Mail has been sent to your email');
            hash = res.body.hash;
          }
          done();
        });
    });
  }); // End of Reset Password

  describe('Update Password', () => {
    it('should return 400 if new Password is empty', (done) => {
      const newPassword = '';
      const confirmPassword = '123asd';
      chai.request(app)
        .put(`/api/v1/user/updatePassword/${hash}`, userControllers.updatePassword)
        .set('Accept', 'application/json')
        .send({ newPassword, confirmPassword })
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
      const newPassword = '123asd';
      const confirmPassword = '';
      chai.request(app)
        .put(`/api/v1/user/updatePassword/${hash}`, userControllers.updatePassword)
        .set('Accept', 'application/json')
        .send({ newPassword, confirmPassword })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('confirm Password cannot be empty');
          }
          done();
        });
    });
    it(
      'should return 400 if new password not equal to confirm Password is',
      (done) => {
        const newPassword = '112qw';
        const confirmPassword = '123asd';
        chai.request(app)
          .put(`/api/v1/user/updatePassword/${hash}`, userControllers.updatePassword)
          .set('Accept', 'application/json')
          .send({ newPassword, confirmPassword })
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
      const newPassword = '123asd';
      const confirmPassword = '123asd';
      chai.request(app)
        .put(`/api/v1/user/updatePassword/${hash}`, userControllers.updatePassword)
        .set('Accept', 'application/json')
        .send({ newPassword, confirmPassword })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(201);
            res.body.should.have.property('message')
              .equal('Your Password has been updated');
          }
          done();
        });
    });
  });
  describe('Update Profile', () => {
    it('should return 201 when another user is created', (done) => {
      const email = 'dannytebj@gmail.com';
      const password = 'asd123';
      const username = 'dannyboy';
      const name = 'daniel doe';
      chai.request(app)
        .post('/api/v1/user/signUp', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, password, username, name
        })
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('User successfully created');
          }
          done();
        });
    });
    it('Should return 409 if new username is already in use', (done) => {
      const username = 'dannyboy';
      const name = 'Dbizzle doe';
      chai.request(app)
        .put('/api/v1/user/updateProfile', userControllers.updateProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({ username, name })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(409);
            res.body.should.have.property('message')
              .equal('The username is already in use by another user.');
          }
          done();
        });
    });
    it('Should return 200 if nprofile update is successful', (done) => {
      const username = 'dannyyoo';
      const name = 'Dbizzle21';
      chai.request(app)
        .put('/api/v1/user/updateProfile', userControllers.updateProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({ username, name })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Profile Update successful');
          }
          done();
        });
    });
  });
});

