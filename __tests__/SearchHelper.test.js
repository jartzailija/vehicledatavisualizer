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
      return expect(SearchHelper.getOptions('municipality', 'Pa'))
        .resolves.toEqual(['Parainen', 'Parkano', 'Parikkala']);
    });
  });

  describe('executeQuery', () => {
    it('no parameters', () => {
      fetch.mockResponse(JSON.stringify(esResponses.executeQueryWithNoParams));
      return expect(SearchHelper.executeQuery())
        .resolves.toEqual(esResponses.executeQueryWithNoParamsResult);
    });

    it('with parameters "municipality" and "Joensuu"', () => {
      fetch.mockResponse(JSON.stringify(esResponses.executeQueryWithParams));
      return expect(SearchHelper.executeQuery('municipality', 'Joensuu'))
        .resolves.toEqual(esResponses.executeQueryWithParamsResult);
    });
  });

  describe('getSummary', () => {
    it('with the carbrand -parameter', () => {
      fetch.mockResponse(JSON.stringify(esResponses.getSummaryWithCarBrand));

      const query = {
        carbrand: 'Toyota'
      };
      return expect(SearchHelper.getSummary(query))
        .resolves.toEqual(esResponses.getSummaryWithCarBrandResult);
    });

    it('with the carbrand and municipality -parameters', () => {
      fetch.mockResponse(JSON.stringify(esResponses.getSummaryWithCarBrandAndMunicipality));

      const query = {
        municipality: 'Lappeenranta',
        carbrand: 'Toyota'
      };
      return expect(SearchHelper.getSummary(query))
        .resolves.toEqual(esResponses.getSummaryWithCarBrandAndMunicipalityResult);
    });
  });
});
