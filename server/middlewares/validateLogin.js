const { body } = require('express-validator');

module.exports = [
  body('email')
    .notEmpty().withMessage('Debes ingresar tu email')
    .isEmail().withMessage('Debe tener un formato de email válido'),

  body('password')
    .notEmpty().withMessage('Debes ingresar tu contraseña')
];
