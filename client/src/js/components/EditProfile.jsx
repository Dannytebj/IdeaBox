import React, { Component } from 'react';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';


/**
 *
 *
 * @class EditProfile
 * @extends {Component}
 */
class EditProfile extends Component {
  /**
   * Creates an instance of EditProfile.
   * @param {any} props
   * @memberof EditProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
    };
    this.onEvent = this.onEvent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  /**
   *
   * @returns {void}
   * @param {any} event
   * @memberof EditProfile
   */
  onEvent(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   * @returns {void}
   * @memberof EditProfile
   */
  handleUpdate() {
    const { username, name } = this.state;
    AppActions.updateProfile(username, name);
  }
  /**
   *
   *
   * @returns {void}
   * @memberof EditProfile
   */
  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Edit Profile</h4>
          <div className="row">
            <div className="col s12">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onEvent}
                placeholder="Please enter your name"
                className="validate"
              />
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onEvent}
                placeholder="Please enter your new username"
                className="validate"
              />
              <button
                onClick={this.handleUpdate}
                className="btn-large waves-effect waves-light orange"
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">close</a>
        </div>
      </div>
    );
  }
}
export default EditProfile;
