import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createMockStore } from "redux-test-utils";
import shallowWithStore from '../utils/shallowWithStore';
import Autosuggest from 'react-autosuggest';
import { renderToString } from 'react-dom/server'

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

  beforeEach(() => {
    store = createMockStore(mockState);
    jest.resetModules();
  });

  describe('the proper component', () => {

    it('renders the component with data', () => {
      const wrapper = shallow(<Suggester name="name" description="description" keywordSuggestion=''
        suggestions={[]} selectedKeyword='' changeText={() => console.log('jee')} select={() => console.log('jee')} />);
      
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('test props', () => {
      var suggestions = ['eka', 'toka'];
      const wrapper = shallow(<Suggester name="name" description="description" keywordSuggestion=''
        suggestions={suggestions} selectedKeyword='' changeText={() => console.log('jee')} select={() => console.log('jee')} />);
      const props = wrapper.find(Autosuggest).props();

      test('onSuggestionsFetchRequested', () => {
        const arr = props.onSuggestionsFetchRequested({value: 'ek'});
        expect(arr.length).toBe(1);
        expect(arr[0]).toBe('eka');
      });

      test('onSuggestionsFetchRequested empty value', () => {
        const arr = props.onSuggestionsFetchRequested({value: ''});
        expect(arr.length).toBe(0);
      });

      test('getSuggestionValue', () => {
        const val = props.getSuggestionValue('jee');
        expect(val).toBe('jee');
      });

      test('onSuggestionsClearRequested', () => {
        const val = props.onSuggestionsClearRequested();
        expect(Array.isArray(val)).toBe(true);
        expect(val.length).toBe(0);
      });

      test('renderSuggestion', () => {
        const val = props.renderSuggestion('Jee');
        expect(renderToString(val)).toEqual('<div class="suggestion" data-reactroot="">Jee</div>');
      });
    });
  });

  describe('container component', () => {
    it('container component gets rendered', () => {
      const container = shallowWithStore(<SuggesterContainer name="name" description="description" />, store);
      expect(container).toBeTruthy();
    });

    describe('mapDispatchToProps', () => {
      //No need to test connection, it's taken care by the 3rd party library
      it('changeText', () => {
        const dispatch = jest.fn();
        const readyDispatch = mapDispatchToProps(dispatch, {name: 'jo'});
        readyDispatch.changeText('', {newValue: 'joe', method: ''});
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SET_INPUT', payload: 'joe'});
        expect(typeof dispatch.mock.calls[1][0]).toEqual("function");
        readyDispatch.select('', {
          suggestion: 'joe'
        });
      });

      it('select', () => {
        const dispatch = jest.fn();
        const readyDispatch = mapDispatchToProps(dispatch, {name: 'Joensuu'});
        readyDispatch.select('', {suggestion: 'Joensuu'});
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SELECT_MUNICIPALITY', payload: 'Joensuu' });
        expect(dispatch.mock.calls[1][0]).toEqual({ type: 'EMPTY_SUGGESTIONS' });
        expect(dispatch.mock.calls[2][0]).toEqual({ type: 'EMPTY_AVERAGE_DATA' });
        expect(typeof dispatch.mock.calls[3][0]).toEqual('function');
      });
    });

    describe('mapStateToProps', () => {
      it('returns correct object', () => {
        const state = mapStateToProps(mockState, {name:"name", description:"description"});
        expect(state).toEqual({name:"name",
          description:"description",
          keywordSuggestion: 'kunta',
          suggestions: ['kunta1', 'kunta2'],
          selectedKeyword: ''
        });
      });
    });
    
  });
});