// server/middlewares/guestMiddleware.js

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/profile'); // si ya está logueado, lo mandamos al perfil
  }
  next(); // si no está logueado, puede continuar
};
