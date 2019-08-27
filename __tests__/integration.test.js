const request = require('supertest');
const app = require('../app');

//Replacing node-fetch by a mocking function to provide a fake elasticsearch connection
const fetch = require('jest-fetch-mock');

jest.setMock('node-fetch', fetch);
jest.mock('../SearchHelper');

describe('Testing API endpoints', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('GET /api/query/all', () => {
    test('tests the endpoint', done => {
      fetch.mockResponse(JSON.stringify({ secret_data: '12345' }));

      request(app)
        .get('/api/query/all')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(res => {
          if(res.body.success !== true) {
            throw new Error('/api/query/all -endpoint doesn\'t work');
          }
        })
        .expect(200, done);
    });

    describe('GET /api/:field/:value', () => {
      test('tests the endpoint', done => {
        fetch.mockResponse(JSON.stringify({ secret_data: '12345' }));
  
        request(app)
          .get('/api/query/all')
          .expect('Content-Type', "application/json; charset=utf-8")
          .expect(res => {
            if(res.body.success !== true) {
              throw new Error('/api/query/all -endpoint doesn\'t work');
            }
          })
          .expect(200, done);
      });
    });

  });
});

/*
describe('Testing API endpoints', () => {
  describe('GET /api/query/all', () => {
    test('gets all carbrands and their counts', done => {
      request(apiRouter)
        .get('/query/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});*/