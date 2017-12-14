import React from 'react';
import { NavLink } from 'react-router-dom';


// class SideBar extends Component {
//   /**
//    * Creates an instance of SideBar.
//    * @param {any} props
//    * @memberof SideBar
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       category: ''
//     };
//   }

//   /**
//    *
//    *
//    * @returns {void}
//    * @memberof SideBar
//    */
//   render() {
//     return
const username = localStorage.getItem('username');
/**
 *@description Handles the sidebar actions
 *
 *@returns {void} SideBar component
 */
const SideBar = () => (
  <div>
    <ul id="slide-out" className="side-nav">
      <li>
        <div className="user-view">
          Welcome, {username}
        </div>
      </li>
      <ul id="dropdown1" className="dropdown-content">
        <li><a className="waves-effect waves-light modal-trigger" href="#modal1">Edit Profile</a></li>
        <li><NavLink to="/dashboard"> Dashboard</NavLink> </li>
        <li><NavLink to="/userIdeas"> My Ideas</NavLink> </li>
        <li className="divider" />
        <li><a href="#!">Logout</a></li>
      </ul>
      <li><a className="dropdown-button" href="#!" data-activates="dropdown1">Options<i className="material-icons right">arrow_drop_down</i></a></li>
      <li className="divider" />

    </ul>
    <a href="" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
  </div>
);
export default SideBar;
