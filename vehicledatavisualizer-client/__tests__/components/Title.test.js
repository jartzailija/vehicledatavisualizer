import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import Title from '../../src/components/Title';

describe('<Title />', () => {
  describe('render()', () => {
    test('renders the component with data', () => {
      const params = {
        municipality: 'TestMunicipality',
        count: 123
      }
      const wrapper = shallow(<Title {...params} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });

    test('renders the component without municipality', () => {
      const params = {
        municipality: '',
        count: 123
      }
      const wrapper = shallow(<Title {...params} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });

    test('renders the component without count', () => {
      const params = {
        municipality: 'TestMunicipality',
        count: 0
      }
      const wrapper = shallow(<Title {...params} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});