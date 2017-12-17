import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import SideBar from '../components/SideBar';
import HangingBar from '../components/HangingBar';
import IdeaList from '../components/IdeaList';
import EditProfile from '../components/EditProfile';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';


/**
 * @description This class handles the user's dashboard
 *
 * @class DashBoard
 * @extends {Component}
 */
class DashBoard extends Component {
  /**
   * Creates an instance of DashBoard.
   * @param {any} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      search: '',
      category: '',
      offset: 1,
      pageInfo: {},
    };
    this.onClick = this.onClick.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }
  /**
   *
   * @returns {void}
   * @memberof DashBoard
   */
  componentDidMount() {
    this.doSearch();
    AppStore.addChangeListener(this.onChange);
  }
  /**
   *
   *
   * @memberof DashBoard
   * @return {void}
   */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }
  /**
   *
   *
   * @param {any} event
   * @memberof DashBoard
   * @returns {void}
   */
  onClick(event) {
    event.preventDefault();
    const element = document.getElementById('crossBar');
    element.classList.toggle('toggled');
    this.setState(state => ({
      modalShown: !state.modalShown
    }));
  }

  /**
   *
   * @memberof DashBoard
   * @return {void}
   */
  onChange() {
    this.setState({
      pageInfo: AppStore.getPageInfo()
    });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof DashBoard
   *
   * @returns {void}
   */
  setSearch(event) {
    event.preventDefault();
    this.setState({
      search: event.target.value
    });
  }
  /**
 * @param {void} event
 * @memberof DashBoard
 * @returns {void}
 */
  setCategory(event) {
    event.preventDefault();
    const { offset } = this.state;

    const category = event.target.value;
    this.setState({
      category,
    });
    AppActions.getCategory(offset, category);
  }
  /**
   *
   * @memberof DashBoard
   * @return {void}
   */
  doSearch() {
    const searchQuery = this.state.search;
    const { offset } = this.state;
    AppActions.getIdeas(offset, searchQuery);
  }

  /**
   * @param {string} selectedPage
   * @memberof DashBoard
   * @return {void}
   */
  pageClick(selectedPage) {
    const searchQuery = this.state.search;
    const selected = selectedPage.selected;
    const offset = Math.ceil(selected + 1);
    this.setState({
      offset
    });
    AppActions.getIdeas(offset, searchQuery);
  }


  /**
   *
   *
   * @memberof DashBoard
   * @returns {void}
   */
  render() {
    const { modalShown, pageInfo } = this.state;
    const count = pageInfo.pages;
    const caption = modalShown ? 'x' : 'have an idea?';
    return (
      <div className="container-fluid wrapper">
        <SideBar /> <HangingBar />
        <EditProfile />
        <div className="container">
          <div className="nav-wrapper">
            <div className="col s12">
              <span className="breadcrumb">DashBoard</span>
            </div>
          </div>
        </div>

        <a
          className="btn-large waves-effect waves-light red toggler"
          id="menu-toggle"
          onClick={this.onClick}
        ><span>{caption}</span>
        </a>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Enter Search Term"
                onChange={this.setSearch}
                onKeyUp={this.doSearch}
              />
            </div>
          </div>
          <div className="row">
            <div className="col m4">
              <label htmlFor="category"> Filter By Category</label>
              <select
                className="browser-default"
                onChange={this.setCategory}
                value={this.state.category}
                name="category"
                onSelect={this.filterIdeas}
              >
                <option value="" defaultValue >All</option>
                <option value="Politics">Politics</option>
                <option value="Sport">Sport</option>
                <option value="Crime">Crime</option>
                <option value="Fashion">Fashion</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Finance">Finance</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>

        <IdeaList />
        <div className="paginator center-align">
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
export default DashBoard;

