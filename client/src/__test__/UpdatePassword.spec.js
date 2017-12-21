import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AppStore from 'AppStore'; // eslint-disable-line
import localStorageMock from './mocks/localStorageMock';
import UpdatePassword from '../js/components/UpdatePassword';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('EditProfile Component', () => {
  const match = {
    params: 'sncjeuwow38e3ss'
  };
  const wrapper = mount(<UpdatePassword match={match} />);
  it('should mount properly', () => {
    expect(wrapper).toBeDefined();
  });
  it('should call onEvent function', () => {
    const onEventSpy = jest.spyOn(wrapper.instance(), 'onEvent');
    wrapper.instance().onEvent(MockDetails.event);
    expect(onEventSpy).toHaveBeenCalled();
  });
  it('should call handleUpdate function', () => {
    const updatePasswordSpy = jest.spyOn(wrapper.instance(), 'updatePassword');
    wrapper.instance().updatePassword();
    expect(updatePasswordSpy).toHaveBeenCalled();
  });
});
