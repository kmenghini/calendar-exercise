import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import Calendar from './Calendar';

configure({ adapter: new Adapter() });

test('expect page to include 1 calendar component', () => {
    const wrapper = shallow(<Page />);
    expect(wrapper.find(Calendar)).toHaveLength(1);
});

