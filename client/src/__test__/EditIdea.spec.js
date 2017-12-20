import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import localStorageMock from './mocks/localStorageMock';
import EditIdea from '../js/components/EditIdea';
import TextBox from '../js/utils/TextBox';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Edit Idea', () => {
  it('should mount with this component', () => {
    const wrapper = shallow(<EditIdea ideas={MockDetails.ideas} />);
    expect(wrapper.find(TextBox)).toHaveLength(2);
  });
  it('should call onEvent function', () => {
    const wrapper = shallow(<EditIdea ideas={MockDetails.ideas} />);
    const onEventSpy = jest.spyOn(wrapper.instance(), 'onEvent');
    wrapper.instance().onEvent(MockDetails.event);
    expect(onEventSpy).toHaveBeenCalled();
  });
  it('should call editStatus function', () => {
    const wrapper = shallow(<EditIdea ideas={MockDetails.ideas} />);
    const editStatusSpy = jest.spyOn(wrapper.instance(), 'editStatus');
    wrapper.instance().editStatus(MockDetails.event);
    expect(editStatusSpy).toHaveBeenCalled();
  });
  it('should call editCategory function', () => {
    const wrapper = shallow(<EditIdea ideas={MockDetails.ideas} />);
    const editCategorySpy = jest.spyOn(wrapper.instance(), 'editCategory');
    wrapper.instance().editCategory(MockDetails.event);
    expect(editCategorySpy).toHaveBeenCalled();
  });
  it('should call handleUpdate function', () => {
    const wrapper = shallow(<EditIdea ideas={MockDetails.ideas} />);
    const handleUpdateSpy = jest.spyOn(wrapper.instance(), 'handleUpdate');
    wrapper.instance().handleUpdate();
    expect(handleUpdateSpy).toHaveBeenCalled();
  });
  it('should call componentWillReceiveProps', () => {
    const wrapper = shallow(<EditIdea ideas={MockDetails.ideas} />);
    const componentSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(MockDetails.nextProps);
    expect(componentSpy).toHaveBeenCalled();
  });
  it('should update the state of textbox', () => {
    const wrapper = mount(<EditIdea ideas={MockDetails.ideas} />);
    wrapper.find('input .title').simulate(
      'change',
      { target: { value: 'Editting' } }
    );
    wrapper.find('input .description').simulate(
      'change',
      { target: { value: 'danny boy is editing' } }
    );
    expect(wrapper.state().title).toEqual('Editting');
    expect(wrapper.state().description).toEqual('danny boy is editing');
  });
});
