import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            <p className="descriptions"> {ideas.description } </p>
          </div>
          <div className="card-action">
            <a className="waves-effect waves-light modal-trigger" href={`#modal${ideas._id}`}><i className="material-icons">create</i></a>            
            <a href="#" onClick={this.deleteIdea}><i className="material-icons">delete</i></a>
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
