import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/User';
import Idea from '../models/Idea';
import convertCase from '../utils/convertCase';
import testUser from '../utils/testSeeders';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('Idea Model', () => {
  let authorId;
  let author;
  before((done) => {
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
        authorId = newUser._id;
        author = newUser.username;
        done();
      }
    });
  });
  it('should allow users create new ideas', (done) => {
    const {
      title, description, category, ideaStatus
    } = testUser.ideaDetail;
    const ideaDetails = {
      title, description, category, ideaStatus, author, authorId
    };
    const newIdea = new Idea(ideaDetails);
    newIdea.save((error, createdIdea) => {
      if (!error) {
        expect(createdIdea.title).to.eql('Test Idea');
        expect(createdIdea.description).to.eql('Test Idea Model');
        expect(createdIdea.category).to.eql('Tests');
        done();
      }
    });
  });
  it('Should throw an error if title field is not provided', (done) => {
    const ideaDetails = {
      description: testUser.description,
      category: testUser.category,
      ideaStatus: testUser.ideaStatus,
      author,
      authorId
    };
    const newIdea = new Idea(ideaDetails);
    newIdea.save((error) => {
      if (error) {
        expect(error.errors.title.message).to.eql('Path `title` is required.');
        done();
      }
    });
  });
});

