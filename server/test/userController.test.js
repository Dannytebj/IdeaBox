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
});

