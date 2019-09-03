import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

// Component to be tested
import Chart from '../../src/components/Chart';

describe('<Chart />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const hasCarBrands = true;
      const data = [{
        title: 'CarBrand1',
        count: 40
      }, {
        title: 'CarBrand2',
        count: 83
      }];
      const municipality = 'TestMunicipality';
      const count = 123;
      const onSectorClick = () => console.log('Click');
      const wrapper = shallow(<Chart
        hasCarBrands={hasCarBrands}
        municipality={municipality}
        count={count}
        data={data}
        onSectorClick={onSectorClick}
      />);
      const component = wrapper.dive();

      expect(component.find(ReactMinimalPieChart).name()).toBe('ReactMinimalPieChart');
    });
  });
});