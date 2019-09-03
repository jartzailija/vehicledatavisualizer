import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import Title from '../../src/components/Title';

describe('<Title />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const params = {
        municipality: 'TestMunicipality',
        count: 123
      }
      const wrapper = shallow(<Title {...params} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });

    test('shows data correctly', () => {
      const params = {
        municipality: 'Example',
        count: 123
      }
      const wrapper = shallow(<Title {...params} />);
      const component = wrapper.dive();
      expect(component.find('h2').children().reduce((text, n) => text + n.text(), '')).toEqual('Vehicle distribution in Example');
      expect(component.find('p').childAt(0).text()).toEqual('Vehicle count is 123');
    });
  });
});