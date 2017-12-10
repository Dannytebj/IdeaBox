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
      ideaList: []
    };
    this.onChange = this.onChange.bind(this);
  }
  /**
   *
   * @returns {void}
   * @memberof IdeaList
   */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }
  /**
   * @description This is fire just before the component unmounts
   * @returns {void}
   * @memberof IdeaList
   */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }
  /**
   * @description This method is passed as callback to Store on change
   *@returns {void}
   * @memberof IdeaList
   */
  onChange() {
    this.setState({
      ideaList: AppStore.getIdeas()
    });
  }
  /**
   *
   *
   * @returns {void}
   * @memberof IdeaList
   */
  render() {
    const { ideaList } = this.state;
    console.log(ideaList);
    return (
      <div className="container">
        <div className="row">
          {
            ideaList.map(ideas => (<Ideas ideas={ideas} key={ideas._id} />))
          }
        </div>
      </div>
    );
  }
}
export default IdeaList;
