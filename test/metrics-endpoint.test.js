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
      return helpers.seedUsersTable(db, testUsers);
    });
    beforeEach('insert metrics', () => {
      return helpers.seedMetricsTable(db, metrics);
    });

    // eslint-disable-next-line quotes
    it(`responds with 200 and user's metrics plus starter`, () => {
      const expectedMetrics = helpers.makeExpectedMetric(testUser, admin);
      return supertest(app)
        .get('/api/metrics')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, expectedMetrics);
    });
  });
  describe('POST /metrics', () => {
    beforeEach('insert users', () => {
      return helpers.seedUsersTable(db, testUsers);
    });
    beforeEach('insert metrics', () => {
      return helpers.seedMetricsTable(db, metrics);
    });
    it('responds with 201 and a new metric added to database when given valid data', () => {
      const newMetric = {
        id: 'a71fa87a-0e34-11eb-adc1-0242ac120002',
        metric_name: 'test',
        measurement_type: 'tests',
      };
      return supertest(app)
        .post('/api/metrics')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newMetric)
        .expect(201, newMetric)
        .expect((res) =>
          db
            .from('metrics')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then((row) => {
              expect(row.id).to.eql(newMetric.id);
              expect(row.metric_name).to.eql(newMetric.metric_name);
              expect(row.measurement_type).to.eql(newMetric.measurement_type);
              expect(row.user_id).to.exist;
            })
        );
    });
  });
});
