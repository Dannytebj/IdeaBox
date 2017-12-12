import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  ideas: PropTypes.object.isRequired,
};
const Ideas = ({ ideas }) => (
  <div className="col s4 m4">
    <div className="card blue-grey lighten-5">
      <div className="card-content black-text">
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
