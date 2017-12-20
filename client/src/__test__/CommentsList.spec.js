import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import localStorageMock from './mocks/localStorageMock';
import Comments from '../js/components/Comments';
import CommentsList from '../js/components/CommentsList';
import MockDetails from './mocks/mockDetails';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Comments Component', () => {
  it('should mount with this props', () => {
    const wrapper = mount(<CommentsList
      comments={MockDetails.nextProps.comments}
      ideas={MockDetails.ideas}
    />);
    expect(wrapper.props).toBeDefined();
  });
  it('should call componentWillReceiveProps', () => {
    const wrapper = shallow(<CommentsList
      comments={MockDetails.nextProps.comments}
      ideas={MockDetails.ideas}
    />);
    const componentSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(MockDetails.nextProps);
    expect(componentSpy).toHaveBeenCalled();
  });
  it('should call onEvent function', () => {
    const wrapper = shallow(<CommentsList
      comments={MockDetails.nextProps.comments}
      ideas={MockDetails.ideas}
    />);
    const onEventSpy = jest.spyOn(wrapper.instance(), 'onEvent');
    wrapper.instance().onEvent(MockDetails.event);
    expect(onEventSpy).toHaveBeenCalled();
  });
  it('should call postComment function', () => {
    const wrapper = shallow(<CommentsList
      comments={MockDetails.nextProps.comments}
      ideas={MockDetails.ideas}
    />);
    const postCommentSpy = jest.spyOn(wrapper.instance(), 'postComment');
    wrapper.instance().postComment();
    expect(postCommentSpy).toHaveBeenCalled();
  });
});
