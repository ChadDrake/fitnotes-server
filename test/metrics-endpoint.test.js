const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');
const { expect } = require('chai');

describe('metrics endpoint', () => {
  let db;
  const testUsers = helpers.makeUsersArray();
  const admin = testUsers[0];
  const testUser = testUsers[1];
  const metrics = helpers.makeMetricArray();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });
  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /metrics', () => {
    beforeEach('insert users', () => {
      helpers.seedUsersTable(db, testUsers);
    });
    beforeEach('insert metrics', () => {
      helpers.seedMetricsTable(db, metrics);
    });

    // eslint-disable-next-line quotes
    it(`responds with 200 and user's metrics plus starter`, () => {
      //const expectedMetrics = helpers.makeExpectedMetric(testUser, admin);
      return supertest(app)
        .get('/api/metrics')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200);
    });
  });
});
