const express = require("express");
const authService = require("./auth-service");

const authRouter = express.Router();

authRouter.route("/login").post(express.json(), (req, res, next) => {
  const { user_name, password } = req.body;
  const user = { user_name, password };

  for (const [key, value] of Object.entries(user))
    if (!value) {
      return res.status(400).json({ error: `Missing ${key}` });
    }

  authService
    .getUserwithUsername(req.app.get("db"), user.user_name)
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      return authService
        .comparePasswords(user.password, dbUser.password)
        .then((compareMatch) => {
          if (!compareMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
          }
          const sub = dbUser.user_name;
          const payload = { user_id: dbUser.id };
          res.send({
            authToken: authService.createJWT(sub, payload),
          });
        });
    })
    .catch(next);
});

module.exports = authRouter;
