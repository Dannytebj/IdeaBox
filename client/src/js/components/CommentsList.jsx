import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppActions from '../actions/AppActions';
import Comments from '../components/Comments';

const propTypes = {
  ideas: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

/**
 *
 *
 * @class CommentsList
 * @extends {Component}
 */
class CommentsList extends Component {
  /**
   * Creates an instance of CommentsList.
   * @param {any} props
   * @memberof CommentsList
   */
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments || [],
      comment: ''
    };
    this.onEvent = this.onEvent.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  /**
   *
   *
   * @param {any} nextProps
   * @memberof CommentsList
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.comments !== undefined) {
      this.setState({
        comments: nextProps.comments
      });
    }
  }
  /**
   *
   *
   * @param {any} event
   * @memberof CommentsList
   * @return {void}
   */
  onEvent(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
 *
 *
 * @memberof CommentsList
 * @returns {void}
 */
  postComment() {
    const ideaId = this.props.ideas._id;
    const { comment } = this.state;
    AppActions.postComment(ideaId, comment);
    this.setState({
      comment: ''
    });
  }
  /**
   *
   *
   * @returns {void}
   * @memberof CommentsList
   */
  render() {
    const { comments } = this.state;
    return (
      <div>
        <div id={`modal${this.props.ideas._id}`} className="modal modal-fixed-footer">
          <a href="#!" className="rightSide modal-action modal-close waves-effect waves-green btn-flat">
            <i className="material-icons">cancel</i>
          </a>
          <div className="modal-content">
            <div className="collection">
              <div className="collection-item">
                <p className="headers">{this.props.ideas.description}</p>
              </div>
            </div>
            <h5>Comments</h5>
            <div className="commentList">
              {
                comments.map(comment => (<Comments comment={comment} key={comment._id} />))
              }
            </div>

          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col s12 m8">
                <input
                  type="text"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.onEvent}
                  placeholder="Post your comment"
                /></div>
              <div className="col s6 m4">
                <button
                  onClick={this.postComment}
                  className="btn waves-effect waves-light orange"
                >
                  Post
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CommentsList.propTypes = propTypes;
export default CommentsList;
