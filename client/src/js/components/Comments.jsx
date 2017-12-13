import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  comment: PropTypes.object.isRequired,
};
const Comments = ({ comment }) => (
  <div className="collection">
    <span className="thumbnails">{comment.author.name}</span>
    <span className="thumbnails rightSide">{moment(comment.createdAt).format('llll')}</span>
    <p className="collection-item">{comment.comment}</p>
  </div>
);


Comments.propTypes = propTypes;
export default Comments;
