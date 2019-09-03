import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Row, Table, Col } from 'reactstrap';

// Component to be tested
import DataView from '../../src/components/DataView';

const dataParams = { 
  hasData: true,
  age: 13.6,
  motorSize: 1730,
  mileage: 204759,
  power: 82,
  municipality: 'TestMunicipality',
  count: 123,
  carBrand: "Toyota"
};

const noDataParams = { 
  hasData: false,
  age: 0,
  motorSize: 0,
  mileage: 0,
  power: 0,
  municipality: '',
  count: 0,
  carBrand: ""
};

describe('<DataView />', () => {
  describe('rendering aka. smoke testing', () => {
    it('renders the component with data', () => {
      const wrapper = shallow(<DataView {...dataParams} />);
      const component = wrapper.dive();
      
      expect(toJson(component)).toMatchSnapshot();
    });

    it('renders the component without data', () => {
      const wrapper = shallow(<DataView {...noDataParams} />);
      const component = wrapper.dive();
      
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe('having the right amount of content after rendering', () => {
    it('with data', () => {
      const wrapper = shallow(<DataView {...dataParams} />);
      const component = wrapper.dive();
      expect(component.find('tbody').find('tr').children()).toHaveLength(5);
    });

    it('without data', () => {
      const wrapper = shallow(<DataView {...noDataParams} />);
      const component = wrapper.dive();
      expect(component.childAt(0).text()).toEqual('Select a sector in the chart');
    });
  });
});