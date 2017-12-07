import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <div className="section no-pad-bot" id="index-banner">
      <div className="container center">
        <img
          className="logo"
          width="80%"
          src="https://res.cloudinary.com/dannytebj/image/upload/v1512551562/ideabox_logo_pnavss.png"
          alt="IdeadBox-Logo"
        />
        <div className="row center">
          <h5 className="header col s12 light">Ideas shape the course of history</h5>
          <br />
          <p><strong>John Maynard Keynes</strong></p>
        </div>
        <div className="row center">
          <Link to="/login">
            <p id="download-button" className="btn-large waves-effect waves-light orange">
              Get Started
            </p>
          </Link>
        </div>
        <br />
      </div>
    </div>
  </div>
);

export default Landing;
