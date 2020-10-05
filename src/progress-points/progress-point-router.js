const express = require("express");
const path = require("path");
const progressPointService = require("./progress");
const { requireAuth } = require("../middleware/JWTAuth");

const progressPointRouter = express.Router();

progressPointRouter
  .route("/")
  .post(requireAuth, express.json(), (req, res, next) => {
    const { id, metric_id, added, modified, value } = req.body;
    const newProgressPoint = {
      id,
      metric_id,
      added,
      modified,
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
          .location(path.posix.join(req.originalURL, `/${progressPoint.id}`))
          .json(progressPointService.serializeProgressPoint(progressPoint));
      })
      .catch(next);
  });

module.exports = progressPointRouter;
