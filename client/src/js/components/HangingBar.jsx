import React, { Component } from 'react';
import TextBox from '../utils/TextBox';

/**
 *
 *
 * @class HangingBar
 * @extends {Component}
 */
class HangingBar extends Component {
  /**
   * Creates an instance of HangingBar.
   * @param {any} props 
   * @memberof HangingBar
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }
  /**
   *
   *
   * @returns {void}
   * @memberof HangingBar
   */
  render() {
    const { title } = this.state;
    return (
      <div id="crossBar">
        <div className="container">
          <div>
            <div className="row">
              <div className="input-field col s6">
                <TextBox
                  className="textBox"
                  onChange={(value) => { this.setState({ title: value }); }}
                  label="title"
                  currentValue={title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HangingBar;
