import React, { Component } from 'react';
import AppAction from '../actions/AppActions';

/**
 *
 *
 * @class ResetPassword
 * @extends {Component}
 */
class ResetPassword extends Component {
  /**
   * Creates an instance of ResetPassword.
   * @param {any} props
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.onEvent = this.onEvent.bind(this);
    this.sendResetMail = this.sendResetMail.bind(this);
  }
  /**
   *
   * @returns {void}
   * @param {any} event
   * @memberof ResetPassword
   */
  onEvent(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   *
   * @memberof ResetPassword
   * @return {void}
   */
  sendResetMail() {
    const { email } = this.state;
    AppAction.resetPassword(email);
  }

  /**
   *
   *
   * @memberof ResetPassword
   * @returns {void}
   */
  render() {
    return (
      <div className="container">
        <div id="resetPassword" className="modal">
          <div className="modal-content">
            <h4>Reset Password</h4>
            <div className="row">
              <div className="col s12">
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.onEvent}
                  placeholder="Please enter the email you registered with"
                  className="validate"
                />
                <button
                  onClick={this.sendResetMail}
                  className="btn-large waves-effect waves-light orange"
                >
                  Send Reset Mail
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-action modal-close waves-effect waves-green btn-flat "
              >close
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;

