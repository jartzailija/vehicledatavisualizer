import * as actions from '../../src/redux/actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
global.fetch = require('jest-fetch-mock');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('fetchSuggestions', () => {
    fetch.mockResponse(JSON.stringify([{"key":"Parainen","doc_count":9744},{"key":"Parkano","doc_count":4520},{"key":"Parikkala","doc_count":3224}]));
    const result = ['Parainen', 'Parkano', 'Parikkala'];
    const expectedAction = [{ type: actions.SET_SUGGESTIONS, payload: result }];
    const store = mockStore();
    return store.dispatch(actions.fetchSuggestions('municipality', 'Par')).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('fetchDataByKeyword', () => {
    fetch.mockResponse(JSON.stringify({"carBrands":[{"name":"Volkswagen","count":5700},{"name":"Toyota","count":5011},{"name":"Ford","count":3135}],"count":13846}));
    const expectedActions = [
      { type: actions.EMPTY_AVERAGE_DATA },
      { type: actions.UNSELECT_CARBRAND },
      { type: actions.RESET_CARBRANDS },
      { type: actions.HAS_CARBRANDS, payload: true },
      { type: actions.SET_CARBRANDS, payload: [{name:"Volkswagen",count:5700},{name:"Toyota",count:5011},{name:"Ford",count:3135}] },
      { type: actions.SET_CARBRANDS_COUNT, payload: 13846 }
    ];
    const store = mockStore();
    return store.dispatch(actions.fetchDataByKeyword('municipality', 'Joensuu')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getDataFromCarBrand', () => {
    fetch.mockResponse(JSON.stringify({"count":410713,"motorSize":1730,"mileage":204759,"power":82,"age":14}));
    const expectedActions = [
      { type: actions.EMPTY_AVERAGE_DATA },
      { type: actions.SELECT_CARBRAND, payload: 'Toyota' },
      { type: actions.SET_AVERAGE_DATA, payload: {count:410713,motorSize:1730,mileage:204759,power:82,age:14}}
    ];
    const store = mockStore();
    return store.dispatch(actions.getDataFromCarBrand('Toyota', 'Joensuu')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getCountrywideData', () => {
    fetch.mockResponse(JSON.stringify({"carBrands":[{"name":"Volkswagen","count":5700},{"name":"Toyota","count":5011},{"name":"Ford","count":3135}],"count":13846}));
    const expectedActions = [
      { type: actions.EMPTY_AVERAGE_DATA },
      { type: actions.UNSELECT_CARBRAND },
      { type: actions.RESET_CARBRANDS },
      { type: actions.UNSELECT_MUNICIPALITY },
      { type: actions.HAS_CARBRANDS, payload: true },
      { type: actions.SET_CARBRANDS, payload: [{name:"Volkswagen",count:5700},{name:"Toyota",count:5011},{name:"Ford",count:3135}] },
      { type: actions.SET_CARBRANDS_COUNT, payload: 13846 }
    ];
    const store = mockStore();
    return store.dispatch(actions.getCountrywideData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});