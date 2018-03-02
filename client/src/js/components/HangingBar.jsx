import React, { Component } from 'react';
import map from 'lodash/map';
import AppActions from '../actions/AppActions';
import TextBox from '../utils/TextBox';
import categories from '../utils/categories';

/**
 *
 *
 * @class HangingBar
 * @extends {Component}
 */
class HangingBar extends Component {
  /**
   * Creates an instance of HangingBar.
   * @param {any} props
   * @memberof HangingBar
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: '',
      ideaStatus: 'Public'
    };
    this.setCategory = this.setCategory.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.handleCreateIdea = this.handleCreateIdea.bind(this);
  }

  /**
   *
   * @returns {void}
   * @param {any} event
   * @memberof HangingBar
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
   * @memberof HangingBar
   */
  setStatus(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *@param {void} event
   * @returns {void}
   * @memberof HangingBar
   */
  setCategory(event) {
    event.preventDefault();
    this.setState({
      category: event.target.value
    });
  }
  /**
   * @description When called triggers the createIdea action
   * @return {void}
   * @memberof HangingBar
   */
  handleCreateIdea() {
    const {
      title, description, category, ideaStatus
    } = this.state;
    AppActions.createIdea(title, description, category, ideaStatus);
    this.setState({
      title: '',
      description: '',
      category: '',
      ideaStatus: 'Public'
    });
  }
  /**
   *
   *
   * @memberof HangingBar
   * @returns {void}
   */
  render() {
    const { title } = this.state;
    const option = map(categories, (value, key) =>
      <option key={value} value={value}>{key}</option>);
    return (
      <div id="crossBar">
        <div className="container">
          <div>
            <div className="row">
              <div className="input-field col s12 m6">
                <TextBox
                  className="textBox"
                  onChange={(value) => { this.setState({ title: value }); }}
                  label="title"
                  currentValue={title}
                />
              </div>
              <div className="col s12 m6">
                <label htmlFor="category">Select a Category</label>
                <select
                  className="browser-default"
                  onChange={this.setCategory}
                  value={this.state.category}
                  name="category"
                  id="category"
                >
                  <option value="" >Choose  a Category</option>
                  {option}
                </select>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <label htmlFor="test1">I want my Idea:</label>
                  <input
                    value="Private"
                    onChange={this.setStatus}
                    name="ideaStatus"
                    type="radio"
                    id="private"
                  />
                  <label htmlFor="private">Private</label>
                  <input
                    defaultChecked
                    value="Public"
                    name="ideaStatus"
                    onChange={this.setStatus}
                    type="radio"
                    id="public"
                  />
                  <label htmlFor="public">Public</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <textarea
                    id="textarea1"
                    className="materialize-textarea description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onEvent}
                  />
                  <label htmlFor="textarea1">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <button
                    onClick={this.handleCreateIdea}
                    className="btn-large waves-effect waves-light orange"
                  >Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HangingBar;
