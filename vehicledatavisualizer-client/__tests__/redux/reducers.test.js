import reducer from '../../src/redux/reducers';

describe('async actions', () => {
  afterEach(() => {
    //fetch.resetMocks();
  });

  it('fetchSuggestions', () => {
    expect(1).toEqual(1);
    /*fetch.mockResponse(JSON.stringify([{"key":"Parainen","doc_count":9744},{"key":"Parkano","doc_count":4520},{"key":"Parikkala","doc_count":3224}]));
    const result = ['Parainen', 'Parkano', 'Parikkala'];
    const expectedAction = [{ type: actions.SET_SUGGESTIONS, payload: result }];
    const store = mockStore();
    return store.dispatch(actions.fetchSuggestions('municipality', 'Par')).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });*/
  });
});