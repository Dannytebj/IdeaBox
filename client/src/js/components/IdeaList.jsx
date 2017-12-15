import React, { Component } from 'react';
import AppStore from '../stores/AppStore';
import Ideas from '../components/Ideas';

/**
 *@description Lists out all ideas
 *
 * @class IdeaList
 * @extends {Component}
 */
class IdeaList extends Component {
  /**
   * Creates an instance of IdeaList.
   * @param {any} props
   * @memberof IdeaList
   */
  constructor(props) {
    super(props);
    this.state = {
      ideaList: [],
      category: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }
  /**
   *
   * @memberof IdeaList
   * @returns {void}
   */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }
  /**
   * @description This is fire just before the component unmounts
   * @memberof IdeaList
   * @returns {void}
   */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }
  /**
   * @description This method is passed as callback to Store on change
   * @memberof IdeaList
   * @returns {void}
   */
  onChange() {
    this.setState({
      ideaList: AppStore.getIdeas()
    });
  }
  /**
   * @param {void} event
   * @memberof IdeaList
   * @returns {void}
   */
  setCategory(event) {
    event.preventDefault();
    this.setState({
      category: event.target.value
    });
  }
  /**
   *
   *
   * @memberof IdeaList
   * @returns {void}
   */
  render() {
    const { ideaList, category } = this.state;
    const filteredIdeas = ideaList.filter(idea =>
      idea.category.toLowerCase().indexOf(category.toLowerCase()) !== -1);
    return (
      <div className="container ideaList">
        <div className="row">
          <div className="col m4">
            {(ideaList.length > 0) ?
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
                <option value="Information Technology">Information Technology</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Finance">Finance</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </select> : ''}
          </div>
        </div>
        <div className="row">
          {
            filteredIdeas.map(ideas => (<Ideas ideas={ideas} key={ideas._id} />))
          }
        </div>
      </div>
    );
  }
}
export default IdeaList;
