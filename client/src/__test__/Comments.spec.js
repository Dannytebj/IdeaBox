import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import localStorageMock from './mocks/localStorageMock';
import Comments from '../js/components/Comments';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Comments Component', () => {
  const comment = {
    author: {
      name: 'Sir Alex'
    },
    createdAt: Date.now(),
    comment: 'How far guy!',
  };
  it('should mount with this props', () => {
    const wrapper = mount(<Comments comment={comment} />);
    expect(wrapper.props).toBeDefined();
  });
});
