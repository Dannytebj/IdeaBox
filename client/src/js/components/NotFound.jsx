import React from 'react';
import { NavLink } from 'react-router-dom';
import Img from 'react-image';
/**
 * @description This component is rendered when an invalid route is hit
 * @return {void}
 */
const NotFound = () => (
  <div className="container">
    <div className="row">
      <div className="col m6">
        <Img
      src="http://media02.hongkiat.com/funny-creative-error-404/37-error-404-page.jpg" //eslint-disable-line
          alt="NOTFOUND "
        />
      </div>
    </div>
    <div className="row">
      <div className="col m6">
        <ul className="nav navbar-nav">
          <li>
            <NavLink to="/dashboard">
        Back to Safety
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
export default NotFound;
