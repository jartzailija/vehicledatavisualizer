import * as actions from '../../src/redux/actions';

describe('actions', () => {
  it('should create an action to set an input', () => {
    const text = 'input';
    const expectedAction = {
      type: actions.SET_INPUT,
      payload: text
    }
    expect(actions.setInput(text)).toEqual(expectedAction)
  });

  it('should create an action to set a municipality', () => {
    const text = 'input';
    const expectedAction = {
      type: actions.SELECT_MUNICIPALITY,
      payload: text
    }
    expect(actions.selectMunicipality(text)).toEqual(expectedAction)
  });

  it('should create an action to unset a municipality', () => {
    const expectedAction = {
      type: actions.UNSELECT_MUNICIPALITY
    }
    expect(actions.unselectMunicipality()).toEqual(expectedAction)
  });

  it('should create an action to set suggestions', () => {
    const suggs = ['input', 'output'];
    const expectedAction = {
      type: actions.SET_SUGGESTIONS,
      payload: suggs
    }
    expect(actions.setSuggestions(suggs)).toEqual(expectedAction)
  });

  it('should create an action to empty suggestions', () => {
    const expectedAction = {
      type: actions.EMPTY_SUGGESTIONS
    }
    expect(actions.emptySuggestions()).toEqual(expectedAction)
  });

  it('should create an action to create a boolean of having car brands', () => {
    const value = true;
    const expectedAction = {
      type: actions.HAS_CARBRANDS,
      payload: value
    }
    expect(actions.setHavingCarBrands(value)).toEqual(expectedAction)
  });

  it('should create an action to set car brands', () => {
    const value = ['input', 'output'];
    const expectedAction = {
      type: actions.SET_CARBRANDS,
      payload: value
    }
    expect(actions.setCarBrands(value)).toEqual(expectedAction)
  });

  it('should create an action to reset car brands', () => {
    const expectedAction = {
      type: actions.RESET_CARBRANDS
    }
    expect(actions.resetCarBrands()).toEqual(expectedAction)
  });

  it('should create an action to set a car brand count', () => {
    const value = 3;
    const expectedAction = {
      type: actions.SET_CARBRANDS_COUNT,
      payload: value
    }
    expect(actions.setCarBrandsCount(value)).toEqual(expectedAction)
  });

  it('should create an action to select a car brand', () => {
    const value = 'Volvo';
    const expectedAction = {
      type: actions.SELECT_CARBRAND,
      payload: value
    }
    expect(actions.selectCarBrand(value)).toEqual(expectedAction)
  });

  it('should create an action to unselect a selected car brand', () => {
    const expectedAction = {
      type: actions.UNSELECT_CARBRAND
    }
    expect(actions.unSelectCarBrand()).toEqual(expectedAction)
  });

  it('should create an action to set an average data', () => {
    const value = {data1: 'eka', data2: 'toka'};
    const expectedAction = {
      type: actions.SET_AVERAGE_DATA,
      payload: value
    }
    expect(actions.setAverageData(value)).toEqual(expectedAction)
  });

  it('should create an action to empty an average data', () => {
    const expectedAction = {
      type: actions.EMPTY_AVERAGE_DATA
    }
    expect(actions.emptyAverageData()).toEqual(expectedAction)
  });
});