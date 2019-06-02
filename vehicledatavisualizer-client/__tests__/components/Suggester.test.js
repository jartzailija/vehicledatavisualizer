import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMockStore } from "redux-test-utils";
import shallowWithStore from '../utils/shallowWithStore';

// Component to be tested
import Suggester from '../../src/components/Suggester';
import SuggesterContainer from '../../src/containers/Suggester';

describe('<Suggester />', () => {

  const mockState = {
    municipalities: {
      input: 'kunta',
      suggestions: ['kunta1', 'kunta2'],
      selected: ''
    }
  };

  it('renders', () => {
    const store = createMockStore(mockState);
    const container = shallowWithStore(<SuggesterContainer name="name" description="description" />, store);
    expect(container).toBeTruthy();

    /*const container = wrapper.find(SuggesterContainer);
    const component = container.dive().find(Suggester);

    console.log('container', container.debug());
    expect(wrapper.find('SuggesterContainer')).to.have.lengthOf(1);*/
  });
});