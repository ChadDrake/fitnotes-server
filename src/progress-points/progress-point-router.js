const express = require("express");
const progressPointService = require("./progress-point-services");
const { requireAuth } = require("../middleware/JWTAuth");

const progressPointRouter = express.Router();

progressPointRouter
  .route("/")
  .post(requireAuth, express.json(), (req, res, next) => {
    const { id, metric_id, value } = req.body;
    const newProgressPoint = {
      id,
      metric_id,
      value,
      user_id: req.user.id,
    };

    for (const [key, value] of Object.entries(newProgressPoint))
      if (value == null)
        return res
          .status(400)
          .json({ error: `Missing ${key} in request body` });

    progressPointService
      .addProgressPoint(req.app.get("db"), newProgressPoint)
      .then((progressPoint) => {
        res
          .status(201)
          .json(progressPointService.serializeProgressPoint(progressPoint[0]));
      })
      .catch(next);
  });

module.exports = progressPointRouter;
