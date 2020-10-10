const express = require('express');
const authService = require('./auth-service');

const authRouter = express.Router();

authRouter.route('/login').post(express.json(), (req, res, next) => {
  const { user_name, password } = req.body;
  const user = { user_name, password };

  for (const [key, value] of Object.entries(user))
    if (!value) {
      return res.status(400).json({ error: `Missing ${key}` });
    }

  authService
    .getUserwithUsername(req.app.get('db'), user.user_name)
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      return authService
        .comparePasswords(user.password, dbUser.password)
        .then((compareMatch) => {
          if (!compareMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
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

authRouter.route('/register').post(express.json(), (req, res, next) => {
  const { id, user_name, password, user_email } = req.body;
  for (const field of ['id', 'user_name', 'password', 'user_email'])
    if (!req.body[field])
      return res
        .status(400)
        .json({ error: `Missing ${field} in request body` });
  const passwordError = authService.validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }
  authService.hasUserWithId(req.app.get('db'), id).then((hasUserWithId) => {
    if (hasUserWithId) {
      return res.status(400).json({ error: `Id already taken` });
    }
    authService
      .hasUserWithUserName(req.app.get('db'), user_name)
      .then((hasUserWithUserName) => {
        if (hasUserWithUserName) {
          return res.status(400).json({ error: `Username already taken` });
        }
        return authService
          .hashPassword(password)
          .then((hashedPassword) => {
            const newUser = {
              id,
              user_name,
              password: hashedPassword,
              user_email,
            };
            return authService
              .addUser(req.app.get('db'), newUser)
              .then((user) => {
                res.status(201).json(authService.serializeUser(user));
              });
          })
          .catch(next);
      });
  });
});

module.exports = authRouter;
