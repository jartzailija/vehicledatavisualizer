import { combineReducers } from 'redux';
import {
  SET_INPUT,
  SELECT_MUNICIPALITY,
  UNSELECT_MUNICIPALITY,
  SET_SUGGESTIONS,
  EMPTY_SUGGESTIONS,
  HAS_CARBRANDS,
  SET_CARBRANDS,
  SET_CARBRANDS_COUNT,
  SELECT_CARBRAND,
  SET_AVERAGE_DATA,
  EMPTY_AVERAGE_DATA,
  RESET_CARBRANDS,
  UNSELECT_CARBRAND
} from './actions';


const initialMunicipalityState = {
	selected: '',
	input: '',
	suggestions: [],
};

const updateMunicipality = (state = initialMunicipalityState, action) => {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        input: action.payload
      };
    
    case SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
      };

    case EMPTY_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      };

    case SELECT_MUNICIPALITY:
      return {
        ...state,
        selected: action.payload
      };

    case UNSELECT_MUNICIPALITY:
      return {
        ...state,
        selected: ''
      };
      
    default:
      return { ...state };
  }
};

const initialCarBrandsState = {
  hasCarBrands: false,
  data: [],
  count: 0,
  selected: ''
};

const carBrands = (state = initialCarBrandsState, action) => {
  switch(action.type) {
    case HAS_CARBRANDS:
      return {
        ...state,
        hasCarBrands: action.payload
      };

    case SET_CARBRANDS:
      return {
        ...state,
        data: action.payload
      };

    case SET_CARBRANDS_COUNT:
      return {
        ...state,
        count: action.payload
      };

    case SELECT_CARBRAND:
      return {
        ...state,
        selected: action.payload
      };

    case UNSELECT_CARBRAND:
      return {
        ...state,
        selected: ''
      };

    case RESET_CARBRANDS:
      return { ...initialCarBrandsState };

    default:
      return { ...state };
  }
};

const initialDataState = {
  hasData: false,
  age: 0,
  mileage: 0,
  count: 0,
  motorSize: 0,
  power: 0
};

const averageData = (state = initialDataState, action) => {
  switch(action.type) {
    case SET_AVERAGE_DATA:
      return {
        ...state,
        hasData: true,
        age: action.payload.age,
        mileage: action.payload.mileage,
        count: action.payload.count,
        motorSize: action.payload.motorSize,
        power: action.payload.power
      };

    case EMPTY_AVERAGE_DATA:
      return { ...initialDataState };

    default:
      return { ...state };
  };
};

const vehicleVisualizer = combineReducers({
  municipalities: updateMunicipality,
  carBrands,
  averageData
});

export default vehicleVisualizer;
