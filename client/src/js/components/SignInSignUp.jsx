import React, { Component } from 'react';
import AppStore from '../stores/AppStore';
import TextBox from '../utils/TextBox';
import Button from '../utils/Button';


/**
 * @description This Class handles signUp and
 * SignIn
 *
 * @class SignInSignUp
 * @extends {Component}
 */
class SignInSignUp extends Component {
  /**
   * Creates an instance of SignInSignUp.
   * @param {any} props
   * @memberof SignInSignUp
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signingIn: false,
      confirmPassword: '',
      username: '',
      name: '',
    };
    this.toggleSignInUp = this.toggleSignInUp.bind(this);
  }

  /**
   *@description Method that listens for change when component mount
   *
   * @memberof SignInSignUp
   * @return {void}
   */
  componentDidMount() {
  }
  /**
 * @description When called it sets the state of the component to
 * signing in or  signing Up.
 * @return {void}
 * @memberof SignInSignUp
 */
  toggleSignInUp() {
    this.setState({
      signingIn: !this.state.signingIn,
    });
  }
  /**
   *
   * @return {void}
   * @memberof SignInSignUp
   */
  render() {
    const {
      name, username, email, password, confirmPassword,
      signingIn
    } = this.state;
    return (
      <div>
        <div className="row signUp">
          {(!signingIn) ? <h4 className="center">SIGN UP</h4> :
          <h4 className="center signIn">SIGN IN</h4>}
          <div className="row">
            <div className="col s12">
              {(!signingIn) ?
                <div className="row">
                  <div className="input-field col s12">
                    <TextBox
                      className="textBox"
                      onChange={(value) => { this.setState({ name: value }); }}
                      label="Full Name"
                      currentValue={name}
                    />
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <TextBox
                        className="textBox"
                        onChange={(value) => {
                      this.setState({ username: value });
                    }}
                        label="Username"
                        currentValue={username}
                      />
                    </div>
                  </div>
                </div> : <div />}
              <div className="row">
                <div className="input-field col s12">
                  <TextBox
                    className="textBox"
                    onChange={(value) => { this.setState({ email: value }); }}
                    label="Email"
                    currentValue={email}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <TextBox
                    className="password"
                    onChange={(value) => { this.setState({ password: value }); }}
                    label="Password"
                    currentValue={password}
                    isPassword
                  />
                </div>
              </div>
              {(!signingIn) ?
                <div className="row">
                  <div className="input-field col s12">
                    <TextBox
                      className="password"
                      onChange={(value) => { this.setState({ confirmPassword: value }); }}
                      label="Confirm Password"
                      currentValue={confirmPassword}
                      isPassword
                    />
                  </div>
                </div> : ''}
              <div className="center">
                <Button
                  className="btn-large waves-effect waves-light orange"
                  onClick={this.clickSign}
                  value={signingIn ? 'Sign In' : 'Sign up'}
                />
              </div>
            </div>
          </div>
          { (signingIn) ?
            <p className="message">Not registered ?
              <a
                className="toggler1"
                onClick={this.toggleSignInUp}
              >Sign Up
              </a>
            </p> :
            <p className="message">Already registered?
              <a
                className="toggler2"
                onClick={this.toggleSignInUp}
              >Sign In
              </a>
            </p>
          }
        </div>
      </div>
    );
  }
}
export default SignInSignUp;