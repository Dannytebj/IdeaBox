import React, { Component } from 'react';
import AppActions from '../actions/AppActions';
import TextBox from '../utils/TextBox';

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
    this.handleCreateIdea = this.handleCreateIdea.bind(this);
  }

  /**
   * @description
   *@returns {void}
   * @memberof HangingBar
   */
  componentDidMount() {
 
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
   * @returns {void}
   * @memberof HangingBar
   */
  render() {
    const { title, description } = this.state;
    return (
      <div id="crossBar">
        <div className="container">
          <div>
            <div className="row">
              <div className="input-field col s6">
                <TextBox
                  className="textBox"
                  onChange={(value) => { this.setState({ title: value }); }}
                  label="title"
                  currentValue={title}
                />
              </div>
              <div className="col s6">
                <label>Select a Category</label>
                <select
                  className="browser-default"
                  onChange={this.setCategory}
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
                <div className="col s6">
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
                <div className="col s12">
                  <TextBox
                    className="description"
                    onChange={(value) => { this.setState({ description: value }); }}
                    label="description"
                    currentValue={description}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <button onClick={this.handleCreateIdea} className="btn-large waves-effect waves-light orange">Create</button>
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
