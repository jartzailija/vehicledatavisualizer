//Replacing node-fetch by a mocking function to provide a fake elasticsearch connection
const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const SearchHelper = require('../SearchHelper');
const esResponses = require('../__mocks__/esResponses');

describe('Testing SearchHelper functions', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('getOptions', () => {
    it('parse the output from ElasticSearch', () => {
      fetch.mockResponse(JSON.stringify({
        aggregations: {
          byField: {
            buckets: [
              'Parainen', 'Parkano', 'Parikkala'
            ]
          }
        }
      }));
      SearchHelper.getOptions('municipality', 'Pa').then(res => {
        expect(res).toEqual(['Parainen', 'Parkano', 'Parikkala']);
      });
    });
  });

  describe('executeQuery', () => {
    it('no parameters', () => {
      fetch.mockResponse(JSON.stringify(esResponses.executeQueryWithNoParams));
      SearchHelper.executeQuery().then(res => {
        expect(res).toEqual(esResponses.executeQueryWithNoParamsResult);
      });
    });

    it('with parameters "municipality" and "Joensuu"', () => {
      fetch.mockResponse(JSON.stringify(esResponses.executeQueryWithParams));
      SearchHelper.executeQuery('municipality', 'Joensuu').then(res => {
        expect(res).toEqual(esResponses.executeQueryWithParamsResult);
      });
    });
  });
});
