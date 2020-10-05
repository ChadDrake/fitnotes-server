const xss = require("xss");

const progressPointService = {
  getById(db, id) {
    return db.from("progress_points").select("*").where("id", id);
  },

  addProgressPoint(db, newProgressPoint) {
    return db
      .insert(newProgressPoint)
      .into("progress_points")
      .returning("*")
      .then(([progressPoint]) => progressPoint)
      .then((progressPoint) =>
        progressPointService.getById(db, progressPoint.id)
      );
  },

  serializeProgressPoint(progressPoint) {
    return {
      id: xss(progressPoint.id),
      metric_id: xss(progressPoint.id),
      user_id: xss(progressPoint.id),
      added: progressPoint.added,
      modified: progressPoint.modified,
      value: progressPoint.value,
    };
  },
};
