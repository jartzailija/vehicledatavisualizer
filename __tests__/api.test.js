const request = require('supertest');
const app = require('../app');

//Replacing the original SearchHelper by a mock module
jest.mock('../SearchHelper');

describe('Testing API endpoints', () => {

  describe('GET /api/query/all', () => {
    it('tests the endpoint', done => {

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

  describe('GET /api/query/:field/:value', () => {
    it('tests the endpoint', done => {

      request(app)
        .get('/api/query/field/value')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(res => {
          if(!res.body.success || res.body.field !== 'field' || res.body.value !== 'value') {
            throw new Error('/api/query/:field/:value -endpoint doesn\'t work');
          }
        })
        .expect(200, done);
    });
  });

  describe('GET /api/query/summary/municipality/:municipality/carbrand/:carBrand', () => {
    it('tests the endpoint', done => {

      request(app)
        .get('/api/query/summary/municipality/kunta/carbrand/auto')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(res => {
          if(res.body.municipality !== 'kunta' || res.body.carbrand !== 'auto') {
            throw new Error('/api/query/summary/municipality/:municipality/carbrand/:carBrand -endpoint doesn\'t work');
          }
        })
        .expect(200, done);
    });
  });

  describe('GET /api/query/summary/carbrand/:carBrand', () => {
    it('tests the endpoint', done => {

      request(app)
        .get('/api/query/summary/carbrand/auto')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(res => {
          if(res.body.carbrand !== 'auto') {
            throw new Error('/api/query/summary/carbrand/:carBrand -endpoint doesn\'t work');
          }
        })
        .expect(200, done);
    });
  });

  describe('GET /api/values/:field/:suggestion', () => {
    it('tests the endpoint', done => {

      request(app)
        .get('/api/values/field/suggestion')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(res => {
          if(res.body.field !== 'field' || res.body.suggestion !== 'suggestion') {
            throw new Error('/api/values/:field/:suggestion -endpoint doesn\'t work');
          }
        })
        .expect(200, done);
    });
  });
  
});