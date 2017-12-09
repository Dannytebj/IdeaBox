import React, { Component } from 'react';
import SideBar from '../components/SideBar';
import HangingBar from '../components/HangingBar';
import IdeaList from '../components/IdeaList';


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
    this.state = {
      modalShown: false
    }
    this.onClick = this.onClick.bind(this);
  }

  // /**
  //  *
  //  * @return {void}
  //  * @memberof DashBoard
  //  */
  // componentDidMount() {
  //   $('#menu-toggle').click((event) => {
  //     event.preventDefault();
  //     $('#crossBar').toggleClass('toggled');
  //     $('#menu-toggle').text('x');
  //   });

  // }

  /**
   *
   *
   * @param {any} event
   * @memberof DashBoard
   * @returns {void}
   */
  onClick(event) {
    event.preventDefault();
    const element = document.getElementById('crossBar');
    element.classList.toggle('toggled');
    this.setState(state => ({
      modalShown: !state.modalShown
    }));
  }


  /**
   *
   *
   * @returns {void}
   * @memberof DashBoard
   */
  render() {
    const { modalShown } = this.state;
    const caption = modalShown ? 'x' : 'have an idea?';
    return (
      <div className="container-fluid wrapper">
        <SideBar /> <HangingBar />
        <a
          className="btn-large waves-effect waves-light red toggler"
          id="menu-toggle"
          onClick={this.onClick}
        ><span>{caption}</span>
        </a>
        <IdeaList />
      </div>
    );
  }
}
export default DashBoard;

