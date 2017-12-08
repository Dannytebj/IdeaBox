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
};

export default AppActions;
