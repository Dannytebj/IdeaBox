import React, { Component } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import AppAction from '../actions/AppActions';

const propTypes = {
  match: PropTypes.object.isRequired,
};
/**
 *
 *
 * @class UpdatePassword
 * @extends {Component}
 */
class UpdatePassword extends Component {
  /**
   * Creates an instance of UpdatePassword.
   * @param {any} props
   * @memberof UpdatePassword
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: ''
    };
    this.onEvent = this.onEvent.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  /**
   *
   *
   * @memberof UpdatePassword
   * @return {void}
   */
  componentDidMount() {
  }
  /**
   *
   * @returns {void}
   * @param {any} event
   * @memberof UpdatePassword
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
   * @memberof UpdatePassword
   * @return {void}
   */
  updatePassword() {
    const { newPassword, confirmPassword } = this.state;
    const { hash } = this.props.match.params;
    if (newPassword === confirmPassword) {
      AppAction.updatePassword(newPassword, confirmPassword, hash);
    } else {
      toastr.error('Please confirm your password');
    }
  }

  /**
   *
   *
   * @returns {void}
   * @memberof UpdatePassword
   */
  render() {
    return (
      <div className="center-align">
        <div className="container">
          <div className="updatePassword">
            <div className="container">
              <h5>Enter Your new password</h5>
              <div className="row">
                <div className="col s12 m12 center-align">
                  <input
                    type="password"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.onEvent}
                    placeholder="enter new Password"
                    className="validate"
                  />
                </div>
                <div className="col s12 m12 center-align">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onEvent}
                    placeholder="confirm new Password"
                    className="validate"
                  />
                  <button
                    onClick={this.updatePassword}
                    className="btn-large waves-effect waves-light orange"
                  >
                    Update Password
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    );
  }
}
UpdatePassword.propTypes = propTypes;
export default UpdatePassword;

