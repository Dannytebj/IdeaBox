import axios from 'axios';
/**
   * Function to attach token to header
   *
   * @param {object} token
   * @returns {object} token
   */
const SetTokenHeader = (token) => {
  const setHeader = axios.create();
  const defaultHeaders = setHeader.defaults.headers.common || {};

  if (token) {
    defaultHeaders['x-access-token'] = token;
  } else {
    delete defaultHeaders['x-access-token'];
  }
  return setHeader;
};

export default SetTokenHeader;

