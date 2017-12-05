import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/User';
import convertCase from '../utils/convertCase';
import testUser from '../utils/testSeeders';


// const app = require('../app');

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('User Model', () => {
  it('Should Create a new user', (done) => {
    const {
      name, username, password, email
    } = testUser;
    const user = new User({
      name,
      username: convertCase(username),
      password,
      email
    });
    user.save((error, newUser) => {
      if (!error) {
        expect(newUser.email).to.eql('dannytebjj@gmail.com');
        expect(newUser.username).to.eql('Dannyboy');
        done();
      }
    });
  });
  it('Should throw an error if name field is not provided', (done) => {
    const {
      username, password, email
    } = testUser;
    const user = new User({
      username: convertCase(username),
      password,
      email
    });
    user.save((error, newUser) => {
      if (error) {
        expect(error.errors.name.message).to.eql('Path `name` is required.');
        done();
      }
    });
  });
});

