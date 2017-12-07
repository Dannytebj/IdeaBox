import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';


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
    *
    *
    * @param {any} { action }
    * @returns {object} payload
    * @memberof AppStore
    */
  dispatcherCallback({ action }) {
    switch (action.type) {
      case AppConstants.CLICK_SIGN_IN:
        // AppAPI.signIn(action.payload);
        this.emitChange();
        break;
      case AppConstants.CLICK_SIGN_UP:
        // AppAPI.signUp(action.payload);
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
