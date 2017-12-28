import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import moment from 'moment';
import CommentsList from '../components/CommentsList';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';


const propTypes = {
  ideas: PropTypes.object.isRequired,
};
/**
 *
 *
 * @class Ideas
 * @extends {Component}
 */
class Ideas extends Component {
  /**
   * Creates an instance of Ideas.
   * @param {any} props
   * @memberof Ideas
   */
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    this.dogetComments = this.dogetComments.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   *
   *
   * @memberof Ideas
   * @return {void}
   */
  componentDidMount() {
    $('.modal').modal();
    $('.tooltipped').tooltip({ delay: 30 });
    AppStore.addChangeListener(this.onChange);
  }
  /**
   *
   *
   * @memberof Ideas
   * @return {void}
   */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }
  /**
   *
   *
   * @memberof Ideas
   * @return {void}
   */
  onChange() {
    this.setState({
      comments: AppStore.getComments()
    });
    // console.log(AppStore.getComments());
  }
  /**
   *
   *
   * @memberof Ideas
   * @return {void}
   */
  dogetComments() {
    AppActions.getComments(this.props.ideas._id);
  }

  /**
 *
 *
 * @memberof Ideas
 * @returns {void}
 */
  render() {
    const { ideas } = this.props;
    return (
      <div className="col s12 m4">
        <div className="card blue-grey lighten-5">
          <div className="card-content black-text">
            <span className="card-title">{ideas.title}</span>
            <span className="thumbnails rightSide">{ideas.category}</span>
            <span className="thumbnails">{moment(ideas.updatedAt).format('llll')}</span>
            {(ideas.modified === true) ? <span className=" rightSide chip"> Edited</span> : ''}
            <p className="descriptions"> {compiler(`${ideas.description.slice(0, 30)}...`)}
              <span className="thumbnails">
                <a
                  className="modal-trigger thumbnails"
                  href={`#modal${ideas._id}`}
                  onClick={this.dogetComments}
                > read more
                </a>
              </span>
            </p>
          </div>
          <div className="card-action">
            <a
              className="waves-effect waves-light modal-trigger tooltipped"
              data-position="top"
              data-delay="30"
              data-tooltip="Comments"
              href={`#modal${ideas._id}`}
              onClick={this.dogetComments}
            >
              <i className="material-icons">comment</i>
            </a>
            <a
              className="waves-effect waves-light tooltipped"
              data-position="top"
              data-delay="30"
              data-tooltip="share on twitter"
              href={`https://twitter.com/intent/tweet?text=This%20idea%20is%20amazing%20you%20should%20read%20it&url=${window.location.origin}/modal${ideas._id}`}
            >
              <i className="material-icons">share</i>
            </a>
          </div>
        </div>
        <CommentsList ideas={ideas} comments={this.state.comments} />
      </div>
    );
  }
}
Ideas.propTypes = propTypes;
export default Ideas;
