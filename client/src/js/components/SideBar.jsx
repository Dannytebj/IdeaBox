import React, { Component } from 'react';
import $ from 'jquery';

/**
 *@description Handles the sidebar actions
 *
 * @class SideBar
 * @extends {Component}
 */
class SideBar extends Component {
  /**
   * Creates an instance of SideBar.
   * @param {any} props
   * @memberof SideBar
   */
  constructor(props) {
    super(props)
  }

  /**
   *
   *
   * @memberof SideBar
   * @returns {void}
   */
  componentWillMount() {
  }
  /**
   *
   *
   * @returns {void}
   * @memberof SideBar
   */
  render() {
    const username = localStorage.getItem('username');
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
            Welcome, {username}
            </div>
          </li>
          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider" /></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <a href="" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
      </div>
    );
  }
}
export default SideBar;
