import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import DataView from '../../src/components/DataView';

describe('<DataView />', () => {
  describe('render()', () => {
    test('renders the component with data', () => {
      const params = { 
        hasData: true,
        age: 13.6,
        motorSize: 1730,
        mileage: 204759,
        power: 82,
        municipality: 'TestMunicipality',
        count: 123,
        carBrand: "Toyota"
      }
      const wrapper = shallow(<DataView {...params} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });

    test('renders the component without data', () => {
      const params = { 
        hasData: false,
        age: 0,
        motorSize: 0,
        mileage: 0,
        power: 0,
        municipality: '',
        count: 0,
        carBrand: ""
      }
      const wrapper = shallow(<DataView {...params} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});