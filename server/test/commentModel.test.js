import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/User';
import Idea from '../models/Idea';
import Comment from '../models/Comment';
import convertCase from '../utils/convertCase';
import testUser from '../utils/testSeeders';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('Comment Model', () => {
  let authorId;
  let author;
  let ideaId;
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
  it('create a new idea first', (done) => {
    const {
      title, description, category, ideaStatus
    } = testUser.ideaDetail;
    const ideaDetails = {
      title, description, category, ideaStatus, author, authorId
    };
    const newIdea = new Idea(ideaDetails);
    newIdea.save((error, createdIdea) => {
      if (!error) {
        ideaId = createdIdea._id;
        done();
      }
    });
  });
  it('Should Create a new comment', (done) => {
    const commentDetails = {
      author: authorId,
      comment: testUser.comment,
      ideaId
    };
    const comment = new Comment(commentDetails);
    comment.save((error, newComment) => {
      if (!error) {
        expect(newComment.comment).to.eql('How far this idea?');
        done();
      }
    });
  });
  it('Should throw an error if comment field is not provided', (done) => {
    const commentDetails = {
      author,
      ideaId
    };
    const comment = new Comment(commentDetails);
    comment.save((error) => {
      if (error) {
        expect(error.errors.comment.message).to.eql('Path `comment` is required.');
        done();
      }
    });
  });
});

