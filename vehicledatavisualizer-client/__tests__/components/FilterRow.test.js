import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import FilterRow from '../../src/components/FilterRow';

describe('<FilterRow />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<FilterRow />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});