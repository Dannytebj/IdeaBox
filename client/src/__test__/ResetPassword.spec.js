import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import localStorageMock from './mocks/localStorageMock';
import ResetPassword from '../js/components/ResetPassword';
import TextBox from '../js/utils/TextBox';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('ResetPassword component', () => {
  it('should mount proprerly', () => {
    const wrapper = mount(<ResetPassword />);
    expect(wrapper.find(ResetPassword)).toBeDefined();
  });
  it('should call onEvent function', () => {
    const wrapper = mount(<ResetPassword />);
    const onEventSpy = jest.spyOn(wrapper.instance(), 'onEvent');
    wrapper.instance().onEvent(MockDetails.event);
    expect(onEventSpy).toHaveBeenCalled();
  });
  it('should call sendResetMail function', () => {
    const wrapper = mount(<ResetPassword />);
    const sendResetMailSpy = jest.spyOn(wrapper.instance(), 'sendResetMail');
    wrapper.instance().sendResetMail();
    expect(sendResetMailSpy).toHaveBeenCalled();
  });
});
