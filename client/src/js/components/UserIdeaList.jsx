import React, { Component } from 'react';
import UsersIdeas from '../components/UsersIdeas';
import AppStore from '../stores/AppStore';

/**
 *
 *
 * @class UserIdeaList
 * @extends {Component}
 */
class UserIdeaList extends Component {
  /**
   * Creates an instance of UserIdeaList.
   * @param {any} props
   * @memberof UserIdeaList
   */
  constructor(props) {
    super(props);
    this.state = {
      userIdeaList: [],
      category: ''
    };
    this.onChange = this.onChange.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  /**
   *
   * @returns {void}
   * @memberof UserIdeaList
   */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }
  /**
   * @description This is fire just before the component unmounts
   * @returns {void}
   * @memberof UserIdeaList
   */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }
  /**
   * @description This method is passed as callback to Store on change
   *@returns {void}
   * @memberof UserIdeaList
   */
  onChange() {
    this.setState({
      userIdeaList: AppStore.getUserIdeas()
    });
  }
  /**
   *@param {void} event
   * @returns {void}
   * @memberof UserIdeaList
   */
  selectCategory(event) {
    event.preventDefault();
    this.setState({
      category: event.target.value
    });
  }

  /**
   *
   * @return {void}
   * @memberof UserIdeaList
   */
  render() {
    const { userIdeaList, category } = this.state;
    const filteredIdeas = userIdeaList.filter(idea =>
      idea.category.toLowerCase().indexOf(category.toLowerCase()) !== -1);
    return (
      <div className="container myIdeaList">
        <div className="row">
          <div className="col m4">
            {(userIdeaList.length > 0) ?
              <select
                className="browser-default"
                onChange={this.selectCategory}
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
            filteredIdeas.map(ideas => (<UsersIdeas ideas={ideas} key={ideas._id} />))
          }
        </div>
      </div>
    );
  }
}
export default UserIdeaList;
