import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AppStore from 'AppStore'; // eslint-disable-line
import AppActions from './mocks/AppActions'; // eslint-disable-line
import HangingBar from '../js/components/HangingBar';
import TextBox from '../js/utils/TextBox';
import localStorageMock from './mocks/localStorageMock';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('HangingBar component', () => {
  it('should mount with this component', () => {
    const wrapper = shallow(<HangingBar />);
    expect(wrapper.find(TextBox)).toHaveLength(1);
  });
  it('should call onEvent function', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'title',
        value: 'abc'
      }
    };
    const wrapper = shallow(<HangingBar />);
    const onEventSpy = jest.spyOn(wrapper.instance(), 'onEvent');
    wrapper.instance().onEvent(event);
    expect(onEventSpy).toHaveBeenCalled();
  });
  it('should call setStatus function', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'title',
        value: 'abc'
      }
    };
    const wrapper = shallow(<HangingBar />);
    const setStatusSpy = jest.spyOn(wrapper.instance(), 'setStatus');
    wrapper.instance().setStatus(event);
    expect(setStatusSpy).toHaveBeenCalled();
  });
  it('should call setCategory function', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'title',
        value: 'abc'
      }
    };
    const wrapper = shallow(<HangingBar />);
    const setCategorySpy = jest.spyOn(wrapper.instance(), 'setCategory');
    wrapper.instance().setCategory(event);
    expect(setCategorySpy).toHaveBeenCalled();
  });
  it('should call handleCreateIdea function', () => {
    const wrapper = shallow(<HangingBar />);
    const handleCreateIdeaSpy = jest.spyOn(wrapper.instance(), 'handleCreateIdea');
    wrapper.instance().handleCreateIdea();
    expect(handleCreateIdeaSpy).toHaveBeenCalled();
  });
});
