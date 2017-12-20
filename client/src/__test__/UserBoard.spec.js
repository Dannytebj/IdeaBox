import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AppStore from 'AppStore'; // eslint-disable-line
import SideBar from '../js/components/SideBar';
import UserBoard from '../js/components/UsersBoard';
import UserIdeaList from '../js/components/UserIdeaList';
import localStorageMock from './mocks/localStorageMock';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('UserBoard Component', () => {
  it('should mount with these components', () => {
    const wrapper = shallow(<UserBoard />);
    expect(wrapper.find(SideBar)).toHaveLength(1);
    expect(wrapper.find(UserIdeaList)).toHaveLength(1);
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(AppStore, 'addChangeListener');
    shallow(<UserBoard />);
    expect(listenerSpy).toHaveBeenCalled();
  });

  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy = spyOn(AppStore, 'removeChangeListener');
    const wrapper = shallow(<UserBoard />);
    wrapper.unmount();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('should call pageClick function', () => {
    const selectedPage = {
      selected: 1,
    };
    const wrapper = shallow(<UserBoard />);
    const pageClickSpy = jest.spyOn(wrapper.instance(), 'pageClick');
    wrapper.instance().pageClick(selectedPage);
    expect(pageClickSpy).toHaveBeenCalled();
  });
});
