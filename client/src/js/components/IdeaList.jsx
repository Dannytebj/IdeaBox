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
    };
    this.onChange = this.onChange.bind(this);
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
   *
   *
   * @memberof IdeaList
   * @returns {void}
   */
  render() {
    const { ideaList } = this.state;
    return (
      <div className="container ideaList">

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
