const { body } = require('express-validator');
const path = require('path');
const db = require('../models');

module.exports = [
  body('name')
    .notEmpty().withMessage('Debes completar tu nombre')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  body('email')
    .notEmpty().withMessage('Debes ingresar un email')
    .isEmail().withMessage('Debes ingresar un email válido')
    .custom(async (value) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (user) {
        throw new Error('Este email ya está registrado');
      }
      return true;
    }),

  body('password')
    .notEmpty().withMessage('Debes ingresar una contraseña')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

  body('image')
    .custom((value, { req }) => {
      const file = req.file;
      if (file) {
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = path.extname(file.originalname);
        if (!acceptedExtensions.includes(ext.toLowerCase())) {
          throw new Error('Las extensiones permitidas son .jpg, .png, .jpeg, .gif');
        }
      }
      return true;
    })
];
