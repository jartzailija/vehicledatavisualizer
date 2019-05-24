import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';

// Component to be tested
import Suggester from '../../src/components/Suggester';
import SuggesterContainer from '../../src/containers/Suggester';

jest.mock('../../src/components/Suggester');

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state,
  };
};


describe('<Suggester />', () => {

  //let container;
  //let component;
  //let wrapper;

  /*beforeEach(() => {
    jest.resetAllMocks();

    const store = storeFake({
      municipalities: {
        input: 'kunta',
        suggestions: ['kunta1', 'kunta2'],
        selected: ''
      }
    });


    wrapper = shallow(
      <Provider store={store}>
        <SuggesterContainer name="name" description="description" />
      </Provider>
    ).dive();
    
    console.log('jeejee', wrapper);
    container = wrapper.find(SuggesterContainer);
    console.log('container', container);
    component = container.find(Suggester);
  });*/

  describe('render', () => {
    const store = storeFake({
      municipalities: {
        input: 'kunta',
        suggestions: ['kunta1', 'kunta2'],
        selected: ''
      }
    });

    const wrapper = shallow(
      <Provider store={store}>
        <SuggesterContainer name="name" description="description" />
      </Provider>
    ).dive();

    const container = wrapper.find(SuggesterContainer);
    const component = container.find(Suggester);

    console.log(container);
    expect(wrapper.html()).toBeTruthy();
  });
});