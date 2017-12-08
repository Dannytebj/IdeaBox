import React, { Component } from 'react';
import $ from 'jquery';
import SideBar from '../components/SideBar';
import HangingBar from '../components/HangingBar';


/**
 * @description This class handles the user's dashboard
 *
 * @class DashBoard
 * @extends {Component}
 */
class DashBoard extends Component {
  /**
   * Creates an instance of DashBoard.
   * @param {any} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   * @return {void}
   * @memberof DashBoard
   */
  componentDidMount() {
    $('#menu-toggle').click((e) => {
      e.preventDefault();
      $('#crossBar').toggleClass('toggled');
    });
  }
  /**
   *
   *
   * @returns {void}
   * @memberof DashBoard
   */
  render() {
    return (
      <div className="container-fluid">
        <SideBar /> <HangingBar />
        <a
          className="toggler"
          id="menu-toggle"
        >I have an Idea!
        </a>
      </div>
    );
  }
}
export default DashBoard;

