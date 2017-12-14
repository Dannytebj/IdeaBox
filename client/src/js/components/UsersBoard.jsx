import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import SideBar from '../components/SideBar';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import UserIdeaList from '../components/UserIdeaList';

/**
 *
 *
 * @class UsersBoard
 * @extends {Component}
 */
class UsersBoard extends Component {
  /**
   * Creates an instance of UserIdeas.
   * @param {any} props
   * @memberof UserIdeas
   */
  constructor(props) {
    super(props);
    this.state = {
      offset: 1,
      pageInfo: {},
    };
    this.pageClick = this.pageClick.bind(this);
    this.getUserIdeas = this.getUserIdeas.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   *
   * @memberof UsersBoard
   * @return {void}
   */
  componentDidMount() {
    this.getUserIdeas();
    AppStore.addChangeListener(this.onChange);
  }

  /**
   *
   * @return {void}
   * @memberof UsersBoard
   */
  onChange() {
    this.setState({
      pageInfo: AppStore.getUserPageInfo()
    });
  }
  /**
   *
   * @return {void}
   * @memberof UsersBoard
   */
  getUserIdeas() {
    const { offset } = this.state;
    AppActions.getUserIdeas(offset);
  }
  /**
   * @param {string} selectedPage
   * @memberof UsersBoard
   * @return {void}
   */
  pageClick(selectedPage) {
    const selected = selectedPage.selected;
    const offset = Math.ceil(selected + 1);
    this.setState({
      offset
    });
    AppActions.getUserIdeas(offset);
  }

  /**
   *
   *
   * @returns {void}
   * @memberof UsersBoard
   */
  render() {
    const { pageInfo } = this.state;
    const count = pageInfo.pages;

    return (
      <div className="container-fluid wrapper">
        <SideBar />
        <div className="container">
          <div className="nav-wrapper">
            <div className="col s12">
              <span className="breadcrumb">My Ideas</span>
            </div>
          </div>
        </div>
        <UserIdeaList />
        <div className="center-align">
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            pageCount={count}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={this.pageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    );
  }
}
export default UsersBoard;

