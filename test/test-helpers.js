const bcrypt = require('bcryptjs');
// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');
const config = require('../src/config');

function makeUsersArray() {
  return [
    {
      id: config.ADMIN_USER_ID,
      user_name: 'testuseradmin',
      password: 'P@ssword1',
      user_email: 'email123@email.com',
    },

    {
      id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      user_name: 'testuser2',
      password: 'P@ssword1',
      user_email: 'email223@email.com',
    },

    {
      id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      user_name: 'testuser3',
      password: 'P@ssword1',
      user_email: 'email323@email.com',
    },
  ];
}

function makeMetricArray() {
  return [
    {
      id: 'd20aee44-0cce-11eb-adc1-0242ac120002',
      user_id: config.ADMIN_USER_ID,
      metric_name: 'Weight',
      measurement_type: 'lbs',
    },
    {
      id: 'd20af22c-0cce-11eb-adc1-0242ac120002',
      user_id: config.ADMIN_USER_ID,
      metric_name: 'Body-Fat',
      measurement_type: 'percent',
    },
    {
      id: 'd20ae3b8-0cce-11eb-adc1-0242ac120002',
      user_id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      metric_name: 'push ups',
      measurement_type: 'push ups',
    },
    {
      id: 'd20ae6c4-0cce-11eb-adc1-0242ac120002',
      user_id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      metric_name: 'bench press',
      measurement_type: 'lbs',
    },
    {
      id: 'd20ae7c8-0cce-11eb-adc1-0242ac120002',
      user_id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      metric_name: 'squats',
      measurement_type: 'lbs',
    },
    {
      id: 'd20aeb38-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      metric_name: 'Walking',
      measurement_type: 'miles',
    },
    {
      id: 'd20aec50-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      metric_name: 'running',
      measurement_type: 'miles',
    },
    {
      id: 'd20aed22-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      metric_name: 'Mile',
      measurement_type: 'Minutes',
    },
  ];
}

function makeProgressPointArray() {
  return [
    {
      id: '64e34a3e-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aee44-0cce-11eb-adc1-0242ac120002',
      user_id: config.ADMIN_USER_ID,
      value: 1,
    },
    {
      id: '64e34caa-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aee44-0cce-11eb-adc1-0242ac120002',
      user_id: config.ADMIN_USER_ID,
      value: 2,
    },
    {
      id: '64e34dae-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aee44-0cce-11eb-adc1-0242ac120002',
      user_id: config.ADMIN_USER_ID,
      value: 3,
    },
    {
      id: '64e34e80-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20ae3b8-0cce-11eb-adc1-0242ac120002',
      user_id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      value: 4,
    },
    {
      id: '64e34f52-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20ae3b8-0cce-11eb-adc1-0242ac120002',
      user_id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      value: 5,
    },
    {
      id: '64e3524a-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20ae3b8-0cce-11eb-adc1-0242ac120002',
      user_id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      value: 6,
    },
    {
      id: '64e3531c-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aeb38-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      value: 7,
    },
    {
      id: '64e353da-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aeb38-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      value: 8,
    },
    {
      id: '64e35498-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aeb38-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      value: 9,
    },
    {
      id: '64e3554c-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aed22-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      value: 10,
    },
    {
      id: 'a8155946-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aed22-0cce-11eb-adc1-0242ac120002',
      user_id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      value: 11,
    },
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
    progress_points,
    metrics,
    users`
  );
}

function prepUsers(users) {
  const preppedUsers = users.map((user) => ({
    id: user.id,
    user_name: user.user_name,
    password: bcrypt.hashSync(user.password, 1),
    user_email: user.user_email,
  }));
  return preppedUsers;
}

function seedUsersTable(db, users) {
  return db.into('users').insert(prepUsers(users));
}

function seedMetricsTable(db, metrics) {
  return db.into('metrics').insert(metrics);
}

function makeExpectedMetric(user, admin) {
  let metrics = makeMetricArray();
  let userMetrics = metrics.filter(
    (metric) => metric.user_id === user.id || metric.user_id === admin.id
  );
  return userMetrics.map((metric) => {
    return {
      id: metric.id,
      metric_name: metric.metric_name,
      measurement_type: metric.measurement_type,
    };
  });
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

function seedProgressPointsTable(db, progressPoints) {
  return db.into('progress_points').insert(progressPoints);
}
module.exports = {
  makeMetricArray,
  makeUsersArray,
  makeProgressPointArray,
  makeExpectedMetric,
  makeAuthHeader,
  cleanTables,
  seedUsersTable,
  seedMetricsTable,
  seedProgressPointsTable,
};
