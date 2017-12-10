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
};

export default AppActions;
