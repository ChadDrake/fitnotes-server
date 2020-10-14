const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');
const { expect } = require('chai');

describe('progress-points', () => {
  let db;
  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[1];
  const metrics = helpers.makeMetricArray();
  const progressPoints = helpers.makeProgressPointArray();

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
  describe('/progress-points', () => {
    describe('POST /progress-points', () => {
      beforeEach('insert users', () => {
        return helpers.seedUsersTable(db, testUsers);
      });
      beforeEach('insert metrics', () => {
        return helpers.seedMetricsTable(db, metrics);
      });

      it('should return 201 and a new progress-point in database given valid data', () => {
        const newProgressPoint = {
          id: 'f869148e-0e37-11eb-adc1-0242ac120002',
          metric_id: 'd20ae3b8-0cce-11eb-adc1-0242ac120002',
          value: 4,
        };
        return supertest(app)
          .post('/api/progress-points')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newProgressPoint)
          .expect(201)
          .expect((res) => {
            db.from('progress_points')
              .select('*')
              .where({ id: res.body.id })
              .first()
              .then((row) => {
                expect(row.id).to.eql(newProgressPoint.id);
                expect(row.metric_id).to.eql(newProgressPoint.metric_id);
                expect(row.value).to.eql(newProgressPoint.value.toString());
                expect(row.created_at).to.exist;
                expect(row.updated_at).to.exist;
              });
          });
      });
    });
  });
  describe('/progress-points/:metric_id', () => {
    describe('GET /progress_points/:metric_id', () => {
      beforeEach('insert users', () => {
        return helpers.seedUsersTable(db, testUsers);
      });
      beforeEach('insert metrics', () => {
        return helpers.seedMetricsTable(db, metrics);
      });
      beforeEach('insert progress points', () => {
        return helpers.seedProgressPointsTable(db, progressPoints);
      });
      it('should return 200 and an array of progressPoints', () => {
        const metricId = metrics[0].id;
        return supertest(app)
          .get(`/api/progress-points/${metricId}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body[0].metric_id).to.exist;
          });
      });
    });
  });
});
