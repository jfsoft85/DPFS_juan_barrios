// server/middlewares/authMiddleware.js

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // usuario autenticado
  }
  return res.redirect('/login');
};
