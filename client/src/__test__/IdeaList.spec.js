import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AppStore from 'AppStore'; // eslint-disable-line
import localStorageMock from './mocks/localStorageMock';
import Ideas from '../js/components/Ideas';
import IdeaList from '../js/components/IdeaList';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('IdeaList Component', () => {
  it('should mount with this component', () => {
    const wrapper = mount(<IdeaList />);
    expect(wrapper.find(Ideas)).toBeDefined();
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(AppStore, 'addChangeListener');
    mount(<IdeaList />);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(AppStore, 'removeChangeListener');
    const wrapper = mount(<IdeaList />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  it('should have 2 Ideas component', () => {
    const wrapper = mount(<IdeaList />);
    wrapper.setState({
      ideaList: MockDetails.ideaList,
    });
    expect(wrapper.find(Ideas)).toHaveLength(2);
  });
});

