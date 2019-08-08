import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMockStore } from "redux-test-utils";
import shallowWithStore from '../utils/shallowWithStore';
import {setInput} from '../../src/redux/actions';

// Component to be tested
import Suggester from '../../src/components/Suggester';
import SuggesterContainer, {mapDispatchToProps, mapStateToProps} from '../../src/containers/Suggester';

describe('<Suggester />', () => {

  const mockState = {
    municipalities: {
      input: 'kunta',
      suggestions: ['kunta1', 'kunta2'],
      selected: ''
    }
  };
  let store;
  //let container; 

  beforeEach(() => {
    store = createMockStore(mockState);
  });

  it('renders', () => {
    const container = shallowWithStore(<SuggesterContainer name="name" description="description" />, store);
    expect(container).toBeTruthy();
  });

  //No need to test connection, it's taken care by the 3rd party library
  //TODO: JATKA
  it('test dispatch', () => {
    const dispatch = jest.fn();

    const readyDispatch = mapDispatchToProps(dispatch, {name: 'j'})
    readyDispatch.changeText('', {newValue: 'jo', method: ''});
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SET_INPUT', payload: 'jo'});

    readyDispatch.select();
  });

  it('gets the state', () => {

  });
});