import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { NavLink } from 'react-router-dom';
import SideBar from '../js/components/SideBar';

Enzyme.configure({ adapter: new Adapter() });

describe('Navigator Component', () => {
  it('should have this components', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find(SideBar)).toBeDefined();
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
});
