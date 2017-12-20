import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import SignInSignUp from '../js/components/SignInSignUp';
import TextBox from '../js/utils/TextBox';
import Button from '../js/utils/Button';
import AppStore from 'AppStore'; // eslint-disable-line
import AppActions from './mocks/AppActions'; // eslint-disable-line
import ResetPassword from '../js/components/ResetPassword';


Enzyme.configure({ adapter: new Adapter() });

describe('SignInSignUp Component', () => {
  it('should mount with the following components', () => {
    const wrapper = mount(<SignInSignUp />);
    expect(wrapper.find(ResetPassword)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(TextBox)).toHaveLength(5);
  });
  it('should have an initial state  to be set to 0', () => {
    const wrapper = mount(<SignInSignUp />);
    expect(wrapper.state().email.length).toEqual(0);
    expect(wrapper.state().password.length).toEqual(0);
    expect(wrapper.state().username.length).toEqual(0);
    expect(wrapper.state().name.length).toEqual(0);
  });
  it('should show 2 textbox if state set to signingIn', () => {
    const wrapper = mount(<SignInSignUp />);
    wrapper.setState({ signingIn: true });
    expect(wrapper.find(TextBox)).toHaveLength(2);
  });
  it('should call toggleSignInUp function if clicked', () => {
    const wrapper = shallow(<SignInSignUp />);
    const toggleSignInUpSpy = jest.spyOn(wrapper.instance(), 'toggleSignInUp');
    wrapper.instance().toggleSignInUp();
    expect(wrapper.state().signingIn).toBe(true);
    expect(toggleSignInUpSpy).toHaveBeenCalled();
  });
  it('should call handleEvents function if clicked', () => {
    const wrapper = mount(<SignInSignUp />);
    const handleEventsSpy = jest.spyOn(wrapper.instance(), 'handleEvents');
    wrapper.instance().handleEvents();
    expect(handleEventsSpy).toHaveBeenCalled();
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(AppStore, 'addChangeListener');
    mount(<SignInSignUp />);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(AppStore, 'removeChangeListener');
    const wrapper = mount(<SignInSignUp />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  it('should call signIn action on sign in', () => {
    const wrapper = mount(<SignInSignUp />);
    const listenerSpy = spyOn(AppActions, 'signIn');
    const handleEventsSpy = jest.spyOn(wrapper.instance(), 'handleEvents');
    wrapper.setState({
      signingIn: true,
      email: 'dannytebj@gmail.com',
      password: 'abc123'
    });
    wrapper.instance().handleEvents();
    expect(handleEventsSpy).toHaveBeenCalled();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('should update the state of textbox', () => {
    const wrapper = mount(<SignInSignUp />);
    wrapper.find('input .email').simulate(
      'change',
      { target: { value: 'danny@myself.com' } }
    );
    wrapper.find('input .name').simulate(
      'change',
      { target: { value: 'danny boy' } }
    );
    wrapper.find('input .user-name').simulate(
      'change',
      { target: { value: 'dannyO' } }
    );
    wrapper.find('input .password').simulate(
      'change',
      { target: { value: 'abc123' } }
    );
    wrapper.find('input .confirm-password').simulate(
      'change',
      { target: { value: 'abc123' } }
    );
    expect(wrapper.state().email).toEqual('danny@myself.com');
    expect(wrapper.state().username).toEqual('dannyO');
    expect(wrapper.state().password).toEqual('abc123');
    expect(wrapper.state().confirmPassword).toEqual('abc123');
  });
});
