/**
 * LocalStorageMock serve as a mock of the localStorage for testing in Jest
 *
 * @class LocalStorageMock
 */
class LocalStorageMock {
  /**
   * @description creates a new instance of this class
   * @constructor
   * @memberOf LocalStorageMock
   */
  constructor() {
    this.store = {};
  }


  /**
   * @description clears the store
   * @method
   * @returns {void}
   */
  clear() {
    this.store = {};
  }


  /**
   * @description returns the value stored on the supplied key
   * @param {string} key The item's key to retrieve from
   * @returns {void}
   */
  getItem(key) {
    return this.store[key] || null;
  }


  /**
   * @description sets the store with the supplied key
   * @param {Object} key The key to store
   * @param {string} value The value to set the key to
   * @returns {void}
   */
  setItem(key, value) {
    this.store[key] = value;
  }
}

global.localStorage = new LocalStorageMock();
