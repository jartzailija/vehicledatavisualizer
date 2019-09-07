import configs from '../configs';

export const SET_INPUT = 'SET_INPUT';
export const setInput = municipality =>  {
  return { type: SET_INPUT, payload: municipality };
};

export const SELECT_MUNICIPALITY = 'SELECT_MUNICIPALITY';
export const selectMunicipality = municipality =>  {
  return { type: SELECT_MUNICIPALITY, payload: municipality };
};

export const UNSELECT_MUNICIPALITY = 'UNSELECT_MUNICIPALITY';
export const unselectMunicipality = () =>  {
  return { type: UNSELECT_MUNICIPALITY };
};

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
export const setSuggestions = suggestions =>  {
  return { type: SET_SUGGESTIONS, payload: suggestions };
};

export const EMPTY_SUGGESTIONS = 'EMPTY_SUGGESTIONS';
export const emptySuggestions = () =>  {
  return { type: EMPTY_SUGGESTIONS };
};

export const HAS_CARBRANDS = 'HAS_CARBRANDS';
export const setHavingCarBrands = yesOrNo =>  {
  return { type: HAS_CARBRANDS, payload: yesOrNo };
};

export const SET_CARBRANDS = 'SET_CARBRANDS';
export const setCarBrands = data =>  {
  return { type: SET_CARBRANDS, payload: data };
};

export const RESET_CARBRANDS = 'RESET_CARBRANDS';
export const resetCarBrands = () =>  {
  return { type: RESET_CARBRANDS };
};

export const SET_CARBRANDS_COUNT = 'SET_CARBRANDS_COUNT';
export const setCarBrandsCount = count =>  {
  return { type: SET_CARBRANDS_COUNT, payload: count };
};

export const SELECT_CARBRAND = 'SELECT_CARBRAND';
export const selectCarBrand = carBrand =>  {
  return { type: SELECT_CARBRAND, payload: carBrand };
};

export const UNSELECT_CARBRAND = 'UNSELECT_CARBRAND';
export const unSelectCarBrand = () =>  {
  return { type: UNSELECT_CARBRAND };
};

export const SET_AVERAGE_DATA = 'SET_AVERAGE_DATA';
export const setAverageData = dataObj =>  {
  return { type: SET_AVERAGE_DATA, payload: { ...dataObj }};
};

export const EMPTY_AVERAGE_DATA = 'EMPTY_AVERAGE_DATA';
export const emptyAverageData = () =>  {
  return { type: EMPTY_AVERAGE_DATA };
};

export const fetchSuggestions = (name, keyword) => {
  const editedKeyword = keyword.charAt(0).toUpperCase() + keyword.substring(1);
  const lowName = name.toLowerCase();

  return dispatch => {
    //TODO: siirrä konffifiluun
    return fetch(`${configs.frontEndUrl}/api/values/${lowName}/${editedKeyword}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        const suggestions = json.map(item => item.key);
        dispatch(setSuggestions(suggestions));
      })
      .catch(e => console.log(e));
  };
};

export const fetchDataByKeyword = (name, keyword) => {
  const editedKeyword = keyword.charAt(0).toUpperCase() + keyword.substring(1);
  const lowName = name.toLowerCase();

  return dispatch => {
    dispatch(emptyAverageData());
    dispatch(unSelectCarBrand());
    dispatch(resetCarBrands());
    //TODO: siirrä konffifiluun
    return fetch(`${configs.frontEndUrl}/api/query/${lowName}/${editedKeyword}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setHavingCarBrands(true));
        dispatch(setCarBrands(json.carBrands));
        dispatch(setCarBrandsCount(json.count));
      })
      .catch(e => console.log(e));
  }
};

export const getDataFromCarBrand = (brandName, municipality) => {

  const start = `${configs.frontEndUrl}/api/query/summary/`
  const end = municipality === '' ? `carbrand/${brandName}` : `municipality/${municipality}/carbrand/${brandName}`;
  return dispatch => {
    dispatch(emptyAverageData());
    dispatch(selectCarBrand(brandName));
    //TODO: siirrä konffifiluun
    return fetch(start + end)
      .then(response => response.json())
      .then(json => dispatch(setAverageData(json)))
      .catch(e => console.log(e));
  }
};

export const getCountrywideData = () => {
  return dispatch => {
    dispatch(emptyAverageData());
    dispatch(unSelectCarBrand());
    dispatch(resetCarBrands());
    dispatch(unselectMunicipality());
    //TODO: siirrä konffifiluun
    return fetch(`${configs.frontEndUrl}/api/query/all`)
      .then(response => response.json())
      .then(json => {
        dispatch(setHavingCarBrands(true));
        dispatch(setCarBrands(json.carBrands));
        dispatch(setCarBrandsCount(json.count));
      })
      .catch(e => console.log(e));
  }
};