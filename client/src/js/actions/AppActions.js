import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const AppActions = {
/**
 * @description Define action methods for User view Actions
 * @param {*} email user email address
 * @param {*} password user password
 *
 * @return {object} signin payload
 */
  signIn: (email, password) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLICK_SIGN_IN,
      payload: { email, password },
    });
  },
  /**
 * @description Define action methods for User view Actions
 * @param {string} email user email address
 * @param {string} password user password
 * @param {string} confirmPassword confirm user password
 * @param {string} username users fullname
 * @param {string} name Users phone Number
 *
 * @return {object} signup payload
 */
  signUp: (email, password, confirmPassword, username, name) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLICK_SIGN_UP,
      payload: {
        email, password, confirmPassword, username, name
      },
    });
  },
  setUser: (token) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.SET_USER,
      payload: {
        token
      }
    });
  },
  /**
 * @description Define action methods for User view Actions
 * @param {string} title user email address
 * @param {string} description user password
 * @param {string} category confirm user password
 * @param {string} ideaStatus users fullname
 *
 *
 * @return {object} signup payload
 */
  createIdea: (title, description, category, ideaStatus) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CREATE_IDEA,
      payload: {
        title, description, category, ideaStatus
      }
    });
  },

  /**
   * @description Receives created idea
   * @param {object} postedIdea
   *@returns {void}
   */
  getCreatedIdea: (postedIdea) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_CREATED_IDEA,
      payload: { postedIdea }
    });
  },
  /**
   * @description Action that updates user profiles
   * @param {string} username
   * @param {string} name
   *@returns {void}
   */
  updateProfile: (username, name) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_PROFILE,
      payload: { username, name }
    });
  },
  /**
   * @description Receives updated user details
   * @param {object} user
   *@returns {void}
   */
  getUpdatedUser: (user) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_UPDATED_USER,
      payload: { user }
    });
  },
  /**
   *
   * @param  {String} offset
   * @return {void}
   */
  getUserIdeas: (offset) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_USER_IDEAS,
      payload: { offset }
    });
  },
  /**
   *
   * @param  {String} offset
   * @param {string} searchQuery
   * @return {void}
   */
  getIdeas: (offset, searchQuery) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_IDEAS,
      payload: { offset, searchQuery }
    });
  },
  /**
   *
   * @returns {void}
   * @param {object} ideas
   * @param {object} pageInfo
   */
  receiveIdeas: (ideas, pageInfo) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RECEIVE_IDEAS,
      payload: { ideas, pageInfo }
    });
  },

  /**
   *
   *
   * @param {any} ideaId
   * @param {any} title
   * @param {any} description
   * @param {any} category
   * @param {any} ideaStatus
   * @returns {void}
   */
  updateIdea: (ideaId, title, description, category, ideaStatus) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_IDEAS,
      payload: {
        ideaId, title, description, category, ideaStatus
      }
    });
  },
  /**
   * @description Receives editted idea
   * @param {object} edittedIdea
   *@returns {void}
   */
  getEdittedIdea: (edittedIdea) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_UPDATED_IDEA,
      payload: { edittedIdea }
    });
  },
  /**
   *
   * @returns {void}
   * @param {object} ideas
   * @param {object} pageInfo
   */
  receiveUserIdeas: (ideas, pageInfo) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RECEIVE_USER_IDEAS,
      payload: { ideas, pageInfo }
    });
  },
  /**
   *
   * @returns {void}
   *
   * @param {string} ideaId
   */
  getComments: (ideaId) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_COMMENTS,
      payload: { ideaId }
    });
  },
  /**
   *
   * @returns {void}
   *
   * @param {string} comments
   */
  receiveComments: (comments) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RECEIVE_COMMENTS,
      payload: { comments }
    });
  },
  /**
   *
   *
   * @param {any} ideaId
   * @param {any} comment
   * @return {void}
   */
  postComment: (ideaId, comment) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.POST_COMMENT,
      payload: { ideaId, comment }
    });
  },
  /**
   *
   *
   * @param {any} ideaId
   * @returns {void}
   */
  deleteIdea: (ideaId) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.DELETE_IDEA,
      payload: { ideaId }
    });
  }
};

export default AppActions;
