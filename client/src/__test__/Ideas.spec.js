import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import localStorageMock from './mocks/localStorageMock';
import CommentsList from '../js/components/CommentsList';
import AppStore from '../js/stores/AppStore';
import Ideas from '../js/components/Ideas';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Ideas Component', () => {
  it('should mount properly with this component', () => {
    const wrapper = mount(<Ideas ideas={MockDetails.ideas} />);
    expect(wrapper.find(CommentsList)).toBeDefined();
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(AppStore, 'addChangeListener');
    mount(<Ideas ideas={MockDetails.ideas} />);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(AppStore, 'removeChangeListener');
    const wrapper = mount(<Ideas ideas={MockDetails.ideas} />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  it('should call dogetComments function', () => {
    const wrapper = mount(<Ideas ideas={MockDetails.ideas} />);
    const dogetCommentsSpy = jest.spyOn(wrapper.instance(), 'dogetComments');
    wrapper.instance().dogetComments();
    expect(dogetCommentsSpy).toHaveBeenCalled();
  });
});
