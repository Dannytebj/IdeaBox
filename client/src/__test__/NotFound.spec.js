import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { NavLink } from 'react-router-dom';
import Img from 'react-image';
import localStorageMock from './mocks/localStorageMock';
import NotFound from '../js/components/NotFound';

Enzyme.configure({ adapter: new Adapter() });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Navigator Component', () => {
  const wrapper = shallow(<NotFound />);
  it('should have <Img />', () => {
    expect(wrapper.find(Img)).toHaveLength(1);
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
});
