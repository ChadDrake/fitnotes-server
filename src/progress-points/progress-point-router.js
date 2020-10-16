const express = require('express');
const progressPointService = require('./progress-point-services');
const { requireAuth } = require('../middleware/JWTAuth');

const progressPointRouter = express.Router();

progressPointRouter
  .route('/')
  .post(requireAuth, express.json(), (req, res, next) => {
    const { id, metric_id, value } = req.body;
    const newProgressPoint = {
      id,
      metric_id,
      value,
      user_id: req.user.id,
    };

    for (const [key, value] of Object.entries(newProgressPoint))
      if (value === null)
        return res
          .status(400)
          .json({ error: `Missing ${key} in request body` });

    progressPointService
      .addProgressPoint(req.app.get('db'), newProgressPoint)
      .then((progressPoint) => {
        res
          .status(201)
          .json(progressPointService.serializeProgressPoint(progressPoint[0]));
      })
      .catch(next);
  });

progressPointRouter
  .route('/:metric_id')
  .get(requireAuth, express.json(), (req, res) => {
    const metric_id = req.params.metric_id;
    progressPointService
      .getByMetric(req.app.get('db'), metric_id, req.user)
      .then((progressPoints) => {
        res.json(
          progressPoints.map(progressPointService.serializeProgressPoint)
        );
      });
  });
module.exports = progressPointRouter;
