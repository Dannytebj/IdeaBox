import AppActions from '../js/actions/AppActions';
import AppConstants from '../js/constants/AppConstants';
import AppDispatcher from '../js/dispatcher/AppDispatcher';
import Mockdetails from '../__test__/mocks/mockDetails';

/* global jest */

jest.mock('axios');
jest.mock('../js/dispatcher/AppDispatcher');


describe('IdeaBox', () => {
  let dispatcher;
  let email;
  let username;
  let name;
  let password;
  beforeEach(() => {
    dispatcher = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatcher.mockReset();
  });
  it('should dispatch a view action that sign In users', () => {
    email = 'danny@myself.com';
    password = 'asd123';
    AppActions.signIn(email, password);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CLICK_SIGN_IN,
      payload: { email, password },
    });
  });
  it('should dispatch a view action that sign Up users', () => {
    email = 'danny@myself.com';
    password = 'asd123';
    const confirmPassword = 'asd123';
    name = 'Jimmy Jatt';
    username = 'JimmyJ';
    AppActions.signUp(email, password, confirmPassword, username, name);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CLICK_SIGN_UP,
      payload: {
        email, password, confirmPassword, username, name
      },
    });
  });
  it('should dispatch a view action that creates an idea', () => {
    const title = 'Title';
    const description = 'Test descriptions';
    const category = 'Test';
    const ideaStatus = 'Public';
    AppActions.createIdea(title, description, category, ideaStatus);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CREATE_IDEA,
      payload: {
        title, description, category, ideaStatus
      },
    });
  });
  it('should dispatch a view action that gets created idea', () => {
    const postedIdea = Mockdetails.postedIdea;
    AppActions.getCreatedIdea(postedIdea);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_CREATED_IDEA,
      payload: {
        postedIdea
      },
    });
  });
  it('should dispatch a view action that updates users profile', () => {
    username = 'dannyO';
    name = 'Daniel Atebije';
    AppActions.updateProfile(username, name);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.UPDATE_PROFILE,
      payload: { username, name }
    });
  });
  it('should dispatch a view action that gets updated user info', () => {
    const user = Mockdetails.user;
    AppActions.getUpdatedUser(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_UPDATED_USER,
      payload: { user }
    });
  });
  it('should dispatch a view action that gets user ideas', () => {
    const offset = '1';
    AppActions.getUserIdeas(offset);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_USER_IDEAS,
      payload: { offset }
    });
  });
  it('should dispatch a view action that gets user ideas', () => {
    const offset = '1';
    const searchQuery = 'sdjhb';
    AppActions.getIdeas(offset, searchQuery);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_IDEAS,
      payload: { offset, searchQuery }
    });
  });
  it('should dispatch a view action that gets ideas according to category', () => {
    const offset = '1';
    const category = 'TEST';
    AppActions.getCategory(offset, category);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_CATEGORY,
      payload: { offset, category }
    });
  });
  it('should dispatch a view action that receives Ideas', () => {
    const { ideas, pageInfo } = Mockdetails;
    AppActions.receiveIdeas(ideas, pageInfo);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RECEIVE_IDEAS,
      payload: { ideas, pageInfo }
    });
  });
  it('should dispatch a view action that updates an idea', () => {
    const ideaId = 'dbaksjbybfy8093';
    const title = 'Title';
    const description = 'Test descriptions';
    const category = 'Test';
    const ideaStatus = 'Public';
    AppActions.updateIdea(ideaId, title, description, category, ideaStatus);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.UPDATE_IDEAS,
      payload: {
        ideaId, title, description, category, ideaStatus
      },
    });
  });
  it('should dispatch a view action that gets updated ideas', () => {
    const edittedIdea = Mockdetails.ideas;
    AppActions.getEdittedIdea(edittedIdea);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_UPDATED_IDEA,
      payload: { edittedIdea }
    });
  });
  it('should dispatch a view action that receives users Ideas', () => {
    const { ideas, pageInfo } = Mockdetails;
    AppActions.receiveUserIdeas(ideas, pageInfo);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RECEIVE_USER_IDEAS,
      payload: { ideas, pageInfo }
    });
  });
  it('should dispatch a view action that gets comments on an idea', () => {
    const ideaId = 'svbkhbvy8920sdv';
    AppActions.getComments(ideaId);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_COMMENTS,
      payload: { ideaId }
    });
  });
  it('should dispatch a view action that receives comments on an idea', () => {
    const { comments } = Mockdetails;
    AppActions.receiveComments(comments);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RECEIVE_COMMENTS,
      payload: { comments }
    });
  });
  it('should dispatch a view action that posts a users comments on an idea', () => {
    const { comment, ideaId } = Mockdetails;
    AppActions.postComment(ideaId, comment);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.POST_COMMENT,
      payload: { ideaId, comment }
    });
  });
  it('should dispatch a view action that deletes an idea', () => {
    const { ideaId } = Mockdetails;
    AppActions.deleteIdea(ideaId);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.DELETE_IDEA,
      payload: { ideaId }
    });
  });
  it('should dispatch a view action that sends a reset password email', () => {
    const email = 'dannyboy@gmail.com';
    AppActions.resetPassword(email);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RESET_PASSWORD,
      payload: { email }
    });
  });
  it('should dispatch a view action that updates a users password', () => {
    const newPassword = 'abc123';
    const confirmPassword = 'abc123';
    const hash = 'sckgb238ph3lwugig';
    AppActions.updatePassword(newPassword, confirmPassword, hash);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.UPDATE_PASSWORD,
      payload: { newPassword, confirmPassword, hash }
    });
  });
  it('should dispatch a view action that signs a user out', () => {
    AppActions.signOut();
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CLICK_SIGN_OUT,
    });
  });
});
