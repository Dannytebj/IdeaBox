import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  ideas: PropTypes.object.isRequired,
};
const Ideas = ({ ideas }) => (
  <div className="col s4 m3">
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{ideas.title}</span>
        <p> {ideas.description } </p>
      </div>
      <div className="card-action">
        <a href="#">This is a link</a>
        <a href="#">This is a link</a>
      </div>
    </div>
  </div>
);
Ideas.propTypes = propTypes;
export default Ideas;
