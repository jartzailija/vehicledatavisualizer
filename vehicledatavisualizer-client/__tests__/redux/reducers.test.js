import reducer from '../../src/redux/reducers';
import * as actions from '../../src/redux/actions';

describe('reducers', () => {
  afterEach(() => {
    //fetch.resetMocks();
  });

  const initialState = {
    municipalities: {
      selected: '',
      input: '',
      suggestions: []
    },
    averageData: {
      hasData: false,
      age: 0,
      mileage: 0,
      count: 0,
      motorSize: 0,
      power: 0
    },
    carBrands: {
      hasCarBrands: false,
      data: [],
      count: 0,
      selected: ''
    }
  };

  describe('municipalities', () => {
    
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('SET_INPUT', () => {
      const payload = 'input';
      expect(reducer({}, {type: actions.SET_INPUT, payload: payload}))
      .toEqual({...initialState, municipalities: {...initialState.municipalities, input: payload}});
    });

    it('SET_SUGGESTIONS', () => {
      const payload = ['eka', 'toka'];
      expect(reducer({}, {type: actions.SET_SUGGESTIONS, payload: payload}))
      .toEqual({...initialState, municipalities: {...initialState.municipalities, suggestions: payload}});
    });

    it('EMPTY_SUGGESTIONS', () => {
      const payload = [];
      expect(reducer({}, {type: actions.EMPTY_SUGGESTIONS}))
      .toEqual({...initialState, municipalities: {...initialState.municipalities, suggestions: payload}});
    });

    it('SELECT_MUNICIPALITY', () => {
      const payload = 'Joensuu';
      expect(reducer({}, {type: actions.SELECT_MUNICIPALITY, payload: payload}))
      .toEqual({...initialState, municipalities: {...initialState.municipalities, selected: payload}});
    });

    it('UNSELECT_MUNICIPALITY', () => {
      const payload = '';
      expect(reducer({}, {type: actions.UNSELECT_MUNICIPALITY}))
      .toEqual({...initialState, municipalities: {...initialState.municipalities, selected: payload}});
    });
  });

  describe('carBrands', () => {

    it('HAS_CARBRANDS', () => {
      const payload = true;
      expect(reducer({}, {type: actions.HAS_CARBRANDS, payload: payload}))
      .toEqual({...initialState, carBrands: {...initialState.carBrands, hasCarBrands: payload}});
    });

    it('SET_CARBRANDS', () => {
      const payload = ['eka', 'toka'];
      expect(reducer({}, {type: actions.SET_CARBRANDS, payload: payload}))
      .toEqual({...initialState, carBrands: {...initialState.carBrands, data: payload}});
    });

    it('SET_CARBRANDS_COUNT', () => {
      const payload = 33;
      expect(reducer({}, {type: actions.SET_CARBRANDS_COUNT, payload: payload}))
      .toEqual({...initialState, carBrands: {...initialState.carBrands, count: payload}});
    });

    it('SELECT_CARBRAND', () => {
      const payload = 'Volvo';
      expect(reducer({}, {type: actions.SELECT_CARBRAND, payload: payload}))
      .toEqual({...initialState, carBrands: {...initialState.carBrands, selected: payload}});
    });

    it('UNSELECT_CARBRAND', () => {
      const payload = '';
      expect(reducer({}, {type: actions.UNSELECT_CARBRAND}))
      .toEqual({...initialState, carBrands: {...initialState.carBrands, selected: payload}});
    });

    it('RESET_CARBRANDS', () => {
      const payload = '';
      expect(reducer({}, {type: actions.RESET_CARBRANDS}))
      .toEqual({...initialState});
    });
  });

  describe('averageData', () => {

    it('SET_AVERAGE_DATA', () => {
      const payload = {
        hasData: true,
        age: 15,
        mileage: 200000,
        count: 1000,
        motorSize: 1800,
        power: 90
      };
      expect(reducer({}, {type: actions.SET_AVERAGE_DATA, payload: payload}))
      .toEqual({...initialState, averageData: {...payload}});
    });

    it('EMPTY_AVERAGE_DATA', () => {
      expect(reducer({}, {type: actions.EMPTY_AVERAGE_DATA}))
      .toEqual({...initialState});
    });
  });
});