import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AppStore from 'AppStore'; // eslint-disable-line
import AppActions from './mocks/AppActions'; // eslint-disable-line
import SideBar from '../js/components/SideBar';
import DashBoard from '../js/components/DashBoard';
import HangingBar from '../js/components/HangingBar';
import EditProfile from '../js/components/EditProfile';
import IdeaList from '../js/components/IdeaList';
import localStorageMock from './mocks/localStorageMock';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('DashBoard Component', () => {
  it('should mount with the following components', () => {
    const wrapper = shallow(<DashBoard />);
    expect(wrapper.find(SideBar)).toHaveLength(1);
    expect(wrapper.find(HangingBar)).toHaveLength(1);
    expect(wrapper.find(EditProfile)).toHaveLength(1);
    expect(wrapper.find(IdeaList)).toHaveLength(1);
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(AppStore, 'addChangeListener');
    shallow(<DashBoard />);
    expect(listenerSpy).toHaveBeenCalled();
  });

  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy = spyOn(AppStore, 'removeChangeListener');
    const wrapper = shallow(<DashBoard />);
    wrapper.unmount();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('should call setSearch function', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abc'
      }
    };
    const wrapper = shallow(<DashBoard />);
    const setSearchSpy = jest.spyOn(wrapper.instance(), 'setSearch');
    wrapper.instance().setSearch(event);
    expect(setSearchSpy).toHaveBeenCalled();
  });
  it('should call setCategory function', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'Sports'
      }
    };
    const wrapper = shallow(<DashBoard />);
    const setCategorySpy = jest.spyOn(wrapper.instance(), 'setCategory');
    wrapper.instance().setCategory(event);
    expect(setCategorySpy).toHaveBeenCalled();
  });
  it('should call pageClick function', () => {
    const selectedPage = {
      selected: 1,
    };
    const wrapper = shallow(<DashBoard />);
    const pageClickSpy = jest.spyOn(wrapper.instance(), 'pageClick');
    wrapper.instance().pageClick(selectedPage);
    expect(pageClickSpy).toHaveBeenCalled();
  });
});
