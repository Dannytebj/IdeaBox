import axios from 'axios';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import appHistory from './history';
import SetTokenHeader from '../utils/SetTokenHeader';

module.exports = {
  signIn({ email, password }) {
    axios.post('/api/v1/signIn', { email, password })
      .then((response) => {
        const { token, username, message } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        appHistory.push('/dashboard');
        AppActions.setUser(token);
        SetTokenHeader(token);
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  signUp({
    email, password, confirmPassword, username, name
  }) {
    axios.post('/api/v1/signUp', {
      email, password, confirmPassword, username, name
    }).then((response) => {
      const { token, username, message } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      appHistory.push('/dashboard');
      AppActions.setUser(token);
      SetTokenHeader(token);
      toastr.success(message);
    }).catch((error) => {
      const { message } = error.response.data;
      toastr.error(message);
    });
  },
};
