import { EventEmitter } from 'events';
import jwt from 'jsonwebtoken';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppApi';

EventEmitter.prototype._maxListeners = 20; // Set number of event emitter


let currentUser = {};
let currentPageInfo = {};
let ideaArray = [];
let userIdeas = [];
let userPageInfo = {};
let commentsArray = [];

/**
 * @description
 * @return {void}
 * @param {any} token
 */
function setCurrentUser(token) {
  const userDetails = jwt.decode(token);
  currentUser = userDetails;
}
/**
 * @description updates the ideaArray
 * @returns {void}
 * @param {any} payload
 */
function updateIdeas(payload) {
  const { postedIdea } = payload;
  if (postedIdea.ideaStatus !== 'Private') {
    ideaArray.push(postedIdea);
  }
}
/**
 *
 * @return {void}
 * @param {any} payload
 */
function setIdeas(payload) {
  const { ideas, pageInfo } = payload;
  ideaArray = ideas;
  currentPageInfo = pageInfo;
}
/**
 *
 * @return {void}
 * @param {any} payload
 */
function setUsersIdeas(payload) {
  const { ideas, pageInfo } = payload;
  userIdeas = ideas;
  userPageInfo = pageInfo;
}
/**
 * @description updates the ideaArray
 * @returns {void}
 * @param {any} payload
 */
function updateUserIdeas(payload) {
  const { editedIdea } = payload;
  userIdeas.push(editedIdea);
}

/**
 *
 *
 * @param {any} payload
 * @return {void}
 */
function setComments(payload) {
  const { comments } = payload;
  commentsArray = comments;
}
/**
 *
 *
 * @class AppStore
 * @extends {EventEmitter}
 */
class AppStore extends EventEmitter {
  /**
   * Creates an instance of AppStore.
   * @memberof AppStore
   */
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }
  /**
 * @description This method emits a change event
 * everytime the store is updated
 *
 * @memberof AppStore
 * @returns {void}
 */
  emitChange() {
    this.emit('change');
  }

  /**
   * @description Returns the curerent user signed in
   *
   * @returns {object} current user
   * @memberof AppStore
   */
  getUser() {
    return currentUser;
  }
  /**
   *
   *
   * @returns {Array} an array of ideas
   * @memberof AppStore
   */
  getIdeas() {
    return ideaArray;
  }
  /**
   *
   *
   * @returns {Array} an array of ideas
   * @memberof AppStore
   */
  getUserIdeas() {
    return userIdeas;
  }
  /**
   *
   * @returns {Object} currentPageInfo
   * @memberof AppStore
   */
  getUserPageInfo() {
    return userPageInfo;
  }
  /**
   *
   * @returns {Object} currentPageInfo
   * @memberof AppStore
   */
  getPageInfo() {
    return currentPageInfo;
  }
  /**
   *
   *
   * @returns {array} commentsArray
   * @memberof AppStore
   */
  getComments() {
    return commentsArray;
  }
  /**
   * @description This method listens for change event
   * in the store and on change initiates the callback
   *
   * @param {any} callback
   * @memberof AppStore
   * @returns {void}
   */
  addChangeListener(callback) {
    this.on('change', callback);
  }
  /**
  * @description This method removes change listeners
  *
  * @param {any} callback
  * @memberof AppStore
  * @returns {void}
  */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  /**
    *
    *
    * @param {any} { action }
    * @returns {object} payload
    * @memberof AppStore
    */
  dispatcherCallback({ action }) {
    switch (action.type) {
      case AppConstants.CLICK_SIGN_IN:
        AppAPI.signIn(action.payload);
        this.emitChange();
        break;
      case AppConstants.CLICK_SIGN_UP:
        AppAPI.signUp(action.payload);
        this.emitChange();
        break;
      case AppConstants.SET_USER:
        setCurrentUser(action.payload);
        this.emitChange();
        break;
      case AppConstants.UPDATE_PROFILE:
        AppAPI.updateProfile(action.payload);
        this.emitChange();
        break;
      case AppConstants.CREATE_IDEA:
        AppAPI.createIdea(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_CREATED_IDEA:
        updateIdeas(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_USER_IDEAS:
        AppAPI.getUserIdeas(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_USER_IDEAS:
        setUsersIdeas(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_IDEAS:
        AppAPI.getIdeas(action.payload);
        this.emitChange();
        break;
      case AppConstants.UPDATE_IDEAS:
        AppAPI.editIdea(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_UPDATED_IDEA:
        updateUserIdeas(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_IDEAS:
        setIdeas(action.payload);
        this.emitChange();
        break;
      case AppConstants.POST_COMMENT:
        AppAPI.postComment(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_COMMENTS:
        AppAPI.getComments(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_COMMENTS:
        setComments(action.payload);
        this.emitChange();
        break;
      case AppConstants.DELETE_IDEA:
        AppAPI.deleteIdea(action.payload);
        this.emitChange();
        break;
      case AppConstants.CLICK_SIGN_OUT:
        // AppAPI.signOut();
        this.emitChange();
        break;
      case AppConstants.RESET_PASSWORD:
        // AppAPI.resetPassword(action.payload);
        this.emitChange();
        break;
      default:
        break;
    }
    return true;
  }
}
export default new AppStore();
