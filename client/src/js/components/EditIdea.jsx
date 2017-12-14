import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import TextBox from '../utils/TextBox';

const propTypes = {
  ideas: PropTypes.object.isRequired,
};
/**
 *
 *
 * @class EditIdea
 * @extends {Component}
 */
class EditIdea extends Component {
  /**
   * Creates an instance of EditProfile.
   * @param {any} props
   * @memberof EditIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      title: props.ideas.title || '',
      description: props.ideas.description || '',
      category: '',
      ideaStatus: 'Public'
    };
    this.onEvent = this.onEvent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.editStatus = this.editStatus.bind(this);
    this.editCategory = this.editCategory.bind(this);
  }

  /**
   *
   * @return {void}
   * @param {any} nextProps
   * @memberof EditIdea
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.ideas.title !== undefined) {
      this.setState({
        title: nextProps.ideas.title,
        description: nextProps.ideas.description,
        category: nextProps.ideas.category,
      });
    }
  }


  /**
   *
   * @returns {void}
   * @param {any} event
   * @memberof EditIdea
   */
  onEvent(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *
   * @returns {void}
   * @param {any} event
   * @memberof EditIdea
   */
  editStatus(event) {
    event.preventDefault();
    this.setState({ ideaStatus: event.target.value });
  }
  /**
   *@param {void} event
   * @returns {void}
   * @memberof EditIdea
   */
  editCategory(event) {
    event.preventDefault();
    this.setState({
      category: event.target.value
    });
  }
  /**
   *
   * @returns {void}
   * @memberof EditIdea
   */
  handleUpdate() {
    const {
      title, description, category, ideaStatus
    } = this.state;
    const ideaId = this.props.ideas._id;
    AppActions.updateIdea(ideaId, title, description, category, ideaStatus);
  }
  /**
   *
   *
   * @returns {void}
   * @memberof EditIdea
   */
  render() {
    return (
      <div id={`modal${this.props.ideas._id}`} className="modal">
        <div className="modal-content">
          <h4>Edit Idea</h4>
          <div className="container">
            <div>
              <div className="row">
                <div className="input-field col s12 m12">
                  <TextBox
                    className="textBox"
                    onChange={(value) => { this.setState({ title: value }); }}
                    label="title"
                    currentValue={this.state.title}
                  />
                </div>
                <div className="col s12 m6">
                  <label>Select a Category</label>
                  <select
                    className="browser-default"
                    onChange={this.editCategory}
                    value={this.state.category}
                    name="category"
                  >
                    <option value="" defaultValue >Choose your option</option>
                    <option value="Politics">Politics</option>
                    <option value="Sport">Sport</option>
                    <option value="Crime">Crime</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Information Technolog">Information Technology</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Finance">Finance</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <label>I want this idea</label>
                    <select
                      className="browser-default"
                      onChange={this.editStatus}
                      value={this.state.ideaStatus}
                      name="ideaStatus"
                    >
                      <option value="Public" defaultValue >Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <TextBox
                      className="description"
                      onChange={(value) => { this.setState({ description: value }); }}
                      label="description"
                      currentValue={this.state.description}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <button onClick={this.handleUpdate} className="btn-large waves-effect waves-light orange">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">close</a>
          </div>
        </div>
      </div>
    );
  }
}
EditIdea.propTypes = propTypes;
export default EditIdea;
