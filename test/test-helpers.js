const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 'be80724c-0ccc-11eb-adc1-0242ac120002',
      user_name: 'testuseradmin',
      password: 'password',
      user_email: 'email123@email.com',
    },

    {
      id: '33a32b78-0ccd-11eb-adc1-0242ac120002',
      user_name: 'testuser2',
      password: 'password',
      user_email: 'email223@email.com',
    },

    {
      id: '4984594e-0ccd-11eb-adc1-0242ac120002',
      user_name: 'testuser3',
      password: 'password',
      user_email: 'email323@email.com',
    },
  ];
}

function makeMetricArray() {
  return [
    {
      id: 'd20aee44-0cce-11eb-adc1-0242ac120002',
      user_id: 'be80724c-0ccc-11eb-adc1-0242ac120002',
      metric_name: 'Weight',
      measurement_type: 'lbs',
    },
    {
      id: 'd20af22c-0cce-11eb-adc1-0242ac120002',
      user_id: 'be80724c-0ccc-11eb-adc1-0242ac120002',
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
      user_id: 'be80724c-0ccc-11eb-adc1-0242ac120002',
      value: 1,
    },
    {
      id: '64e34caa-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aee44-0cce-11eb-adc1-0242ac120002',
      user_id: 'be80724c-0ccc-11eb-adc1-0242ac120002',
      value: 2,
    },
    {
      id: '64e34dae-0cd1-11eb-adc1-0242ac120002',
      metric_id: 'd20aee44-0cce-11eb-adc1-0242ac120002',
      user_id: 'be80724c-0ccc-11eb-adc1-0242ac120002',
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
module.exports = {
  makeMetricArray,
  makeUsersArray,
  makeProgressPointArray,
  cleanTables,
  seedUsersTable,
};
