const express = require("express");
const metricService = require("./metric-services");
const { requireAuth } = require("../middleware/JWTAuth");
const config = require("../config");

const metricRouter = express.Router();

metricRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    let result = [];
    metricService
      .getUserMetrics(req.app.get("db"), config.ADMIN_USER_ID)
      .then((gum) => {
        gum.forEach((metric) => result.push(metric));
      })
      .then(() => {
        return metricService.getUserMetrics(req.app.get("db"), req.user.id);
      })

      .then((gum) => {
        gum.forEach((metric) => result.push(metric));
      })

      .then(() => {
        res.json(result.map((metric) => metricService.serializeMetric(metric)));
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    const { id, metric_name, measurement_type } = req.body;
    const newMetric = {
      id,
      metric_name,
      measurement_type,
      user_id: req.user.id,
    };

    for (const [key, value] of Object.entries(newMetric))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });

    metricService
      .addMetric(req.app.get("db"), newMetric)
      .then((metric) => {
        res.status(201).json(metricService.serializeMetric(metric[0]));
      })
      .catch(next);
  });

module.exports = metricRouter;
