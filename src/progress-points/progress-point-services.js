const xss = require('xss');

const progressPointService = {
  getById(db, id) {
    return db.from('progress_points').select('*').where('id', id);
  },

  getByMetric(db, metric_id) {
    return db.from('progress_points').select('*').where('metric_id', metric_id);
  },

  addProgressPoint(db, newProgressPoint) {
    return db
      .insert(newProgressPoint)
      .into('progress_points')
      .returning('*')
      .then(([progressPoint]) => progressPoint)
      .then((progressPoint) =>
        progressPointService.getById(db, progressPoint.id)
      );
  },

  serializeProgressPoint(progressPoint) {
    return {
      id: xss(progressPoint.id),
      metric_id: xss(progressPoint.id),
      created_at: progressPoint.created_at,
      updated_at: progressPoint.updated_at,
      value: progressPoint.value,
    };
  },
};

module.exports = progressPointService;
