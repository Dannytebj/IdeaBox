import axios from 'axios';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import appHistory from './history';
import SetTokenHeader from '../utils/SetTokenHeader';

module.exports = {
  /**
 * @description Define action methods for User view Actions
 * @param {*} email user email address
 * @param {*} password user password
 *
 * @return {object} signin payload
 */
  signIn({ email, password }) {
    axios.post('/api/v1/signIn', { email, password })
      .then((response) => {
        const { token, username, message } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        AppActions.setUser(token);
        SetTokenHeader(token);
        appHistory.push('/dashboard');
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
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
  createIdea({
    title, description, category, ideaStatus
  }) {
    axios.post('/api/v1/idea', {
      title, description, category, ideaStatus
    }).then((response) => {
      const { postedIdea, message } = response.data;
      AppActions.getCreatedIdea(postedIdea);
      toastr.success(message);
    }).catch((error) => {
      const { message } = error.response.data;
      toastr.error(message);
    });
  },
  updateProfile({
    username, name
  }) {
    axios.put('/api/v1/updateProfile', {
      username, name
    }).then((response) => {
      const { user, message } = response.data;
      localStorage.setItem('username', user.username);
      // AppActions.getUpdatedUser(user);
      toastr.success(message);
    }).catch((error) => {
      const { message } = error.response.data;
      toastr.error(message);
    });
  },
  getIdeas({ offset, searchQuery }) {
    const limit = 10;
    axios.post(`/api/v1/search?page=${offset}&limit=${limit}`, { searchQuery })
      .then((response) => {
        const { ideas, pageInfo } = response.data;
        AppActions.receiveIdeas(ideas, pageInfo);
      })
      .catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  getUserIdeas({ offset }) {
    const limit = 10;
    axios.get(`/api/v1/user/ideas?page=${offset}&limit=${limit}`)
      .then((response) => {
        const { ideas, pageInfo } = response.data;
        AppActions.receiveUserIdeas(ideas, pageInfo);
      })
      .catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  editIdea({
    ideaId, title, description, category, ideaStatus
  }) {
    axios.put('/api/v1/idea', {
      ideaId, title, description, category, ideaStatus
    }).then((response) => {
      const { message } = response.data;
      const offset = '1';
      AppActions.getUserIdeas(offset);
      toastr.success(message);
    }).catch((error) => {
      const { message } = error.response.data;
      toastr.error(message);
    });
  },
  getComments({ ideaId }) {
    axios.get(`/api/v1/comment/${ideaId}`)
      .then((response) => {
        const { comments } = response.data;
        AppActions.receiveComments(comments);
      })
      .catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  postComment({ ideaId, comment }) {
    axios.post('/api/v1/comment', { ideaId, comment })
      .then((response) => {
        AppActions.getComments(ideaId);
        const { message } = response.data;
        toastr.success(message);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteIdea({ ideaId }) {
    axios.delete(`/api/v1/idea/delete/${ideaId}`)
      .then((response) => {
        const { message } = response.data;
        const offset = '1';
        AppActions.getUserIdeas(offset);
        toastr.success(message);
      })
      .catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  }

};
