import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AppStore from 'AppStore'; // eslint-disable-line
import localStorageMock from './mocks/localStorageMock';
import EditProfile from '../js/components/EditProfile';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('EditProfile Component', () => {
  it('should mount properly', () => {
    const wrapper = mount(<EditProfile />);
    expect(wrapper).toBeDefined();
  });
  it('should call onEvent function', () => {
    const wrapper = mount(<EditProfile />);
    const onEventSpy = jest.spyOn(wrapper.instance(), 'onEvent');
    wrapper.instance().onEvent(MockDetails.event);
    expect(onEventSpy).toHaveBeenCalled();
  });
  it('should call handleUpdate function', () => {
    const wrapper = mount(<EditProfile />);
    const handleUpdateSpy = jest.spyOn(wrapper.instance(), 'handleUpdate');
    wrapper.instance().handleUpdate();
    expect(handleUpdateSpy).toHaveBeenCalled();
  });
});
