import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AppStore from 'AppStore'; // eslint-disable-line
import localStorageMock from './mocks/localStorageMock';
import UsersIdeas from '../js/components/UsersIdeas';
import UserIdeaList from '../js/components/UserIdeaList';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('UserIdeaList Component', () => {
  it('should mount with this component', () => {
    const wrapper = mount(<UserIdeaList />);
    expect(wrapper.find(UsersIdeas)).toBeDefined();
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(AppStore, 'addChangeListener');
    mount(<UserIdeaList />);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(AppStore, 'removeChangeListener');
    const wrapper = mount(<UserIdeaList />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  it('should call editCategory function', () => {
    const wrapper = mount(<UserIdeaList />);
    const selectCategorySpy = jest.spyOn(wrapper.instance(), 'selectCategory');
    wrapper.instance().selectCategory(MockDetails.event);
    expect(selectCategorySpy).toHaveBeenCalled();
  });
  it('should have 2 Ideas component', () => {
    const wrapper = mount(<UserIdeaList />);
    wrapper.setState({
      userIdeaList: MockDetails.ideaList,
      category: ''
    });
    expect(wrapper.find(UsersIdeas)).toHaveLength(2);
  });
});

