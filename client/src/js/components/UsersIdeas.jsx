import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import EditIdea from '../components/EditIdea';
import AppActions from '../actions/AppActions';

const propTypes = {
  ideas: PropTypes.object.isRequired,
};
/**
 *
 *
 * @class UsersIdeas
 * @extends {Component}
 */
class UsersIdeas extends Component {
  /**
   * Creates an instance of UsersIdeas.
   * @param {any} props
   * @memberof UsersIdeas
   */
  constructor(props) {
    super(props);
    this.deleteIdea = this.deleteIdea.bind(this);
  }
  /**
 *
 * @returns {void}
 * @memberof UsersIdeas
 */
  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 30 });
    $('.modal').modal();
  }
  /**
   *
   * @memberof UsersIdeas
   * @return {void}
   */
  deleteIdea() {
    const { ideas } = this.props;
    AppActions.deleteIdea(ideas._id);
  }
  /**
   *
   *
   * @returns {void}
   * @memberof UsersIdeas
   */
  render() {
    const { ideas } = this.props;
    return (
      <div className="col s12 m4">
        <div className="card blue-grey lighten-5">
          <div className="card-content black-text">
            <span className="card-title">{ideas.title}</span>
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
              data-tooltip="edit idea"
              href={`#modal${ideas._id}`}
            >
              <i className="material-icons">create</i>
            </a>
            <a href="#" onClick={this.deleteIdea}>
              <i
                className="material-icons tooltipped"
                data-position="top"
                data-delay="30"
                data-tooltip="delete idea"
              >delete
              </i>

            </a>
          </div>
        </div>
        <EditIdea
          ideas={ideas}
        />
      </div>
    );
  }
}
UsersIdeas.propTypes = propTypes;
export default UsersIdeas;
