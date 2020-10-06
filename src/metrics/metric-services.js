const xss = require("xss");
const progressPointService = require("../progress-points/progress-point-services");

const metricService = {
  getAllMetrics(db) {
    return db.from("metrics").select("*");
  },

  getUserMetrics(db, userId) {
    return db.from("metrics").select("*").where("user_id", userId);
  },
  getMetricById(db, id) {
    return db.from("metrics").select("*").where("id", id);
  },
  getProgressPointsForMetric(db, id, userId) {
    let progressPoints = progressPointService.getByMetric(db, id);
    let result = [];
    progressPoints.forEach((point) => {
      if (point.user_id === userId) {
        result.push(progressPointService.serializeProgressPoint(point));
      }
    });
    return result;
  },
  addMetric(db, newMetric) {
    return db
      .insert(newMetric)
      .into("metrics")
      .returning("*")
      .then(([metric]) => metric)
      .then((metric) => metricService.getMetricById(db, metric.id));
  },

  serializeMetric(metric) {
    return {
      id: xss(metric.id),
      metric_name: xss(metric.metric_name),
      measurement_type: xss(metric.measurement_type),
    };
  },
};

module.exports = metricService;
