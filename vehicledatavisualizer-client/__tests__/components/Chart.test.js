import React from 'react';
import { Row, Col } from 'reactstrap';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

import { normalCase, emptyCase, muchDataCase } from '../../__mocks__/Chart.mock';

// Component to be tested
import Chart from '../../src/components/Chart';

describe('<Chart />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(<Chart
        hasCarBrands={true}
        municipality={'TestMunicipality'}
        count={123}
        data={normalCase}
        onSectorClick={() => console.log('Click')}
      />);
      const component = wrapper.dive();

      expect(component.find(ReactMinimalPieChart).name()).toBe('ReactMinimalPieChart');
    });

    it('no carbrands', () => {
      const wrapper = shallow(<Chart
        hasCarBrands={false}
        data={emptyCase}
        municipality={''}
        count={0}
        onSectorClick={() => console.log('Click')}
      />);
      const component = wrapper.dive();
      
      expect(component.find(Row).find(Col).childAt(0).text()).toBe('Please select a municipality.');
    });
  });

  it('renders a title correctly', () => {
    const wrapper = shallow(<Chart
      hasCarBrands={true}
      municipality={'TestMunicipality'}
      count={123}
      data={normalCase}
      onSectorClick={() => console.log('Click')}
    />);
    const component = wrapper.dive();

    expect(component.find(ReactMinimalPieChart).html()).toMatch(/CarBrand1 33%/);
  });

  describe('the click event', () => {
    it('the callback is called when clicking the chart', () => {
      const mockCallBack = sinon.spy();
      const wrapper = shallow(<Chart
        hasCarBrands={true}
        municipality={'TestMunicipality'}
        count={123}
        data={normalCase}
        onSectorClick={mockCallBack}
      />);
      const component = wrapper.dive();
      component.find(ReactMinimalPieChart).simulate('click');
      expect(mockCallBack).toHaveProperty('callCount', 1);
    });
  });


  describe('over 25 car brands', () => {
    it('combine marginal car brands to reduce rendering time', () => {
      const wrapper = shallow(<Chart
        hasCarBrands={true}
        municipality={'TestMunicipality'}
        count={123}
        data={muchDataCase}
        onSectorClick={() => console.log('Click')}
      />);
      const component = wrapper.dive();
      expect(component.find(ReactMinimalPieChart).html()).toMatch(/Other/);
    });
  });
});