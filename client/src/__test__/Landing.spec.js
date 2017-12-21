import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-15';
import localStorageMock from './mocks/localStorageMock';
import Landing from '../js/components/Landing';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Landing Page Component', () => {
  it('should mount with this component defined', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(Link)).toBeDefined();
  });
});
