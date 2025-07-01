const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('name')
    .notEmpty().withMessage('Debes completar el nombre del producto')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  body('price')
    .notEmpty().withMessage('Debes ingresar un precio')
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número positivo'),

  body('description')
    .notEmpty().withMessage('Debes ingresar una descripción')
    .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),

  body('image')
    .custom((value, { req }) => {
      const file = req.file;
      if (file) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = path.extname(file.originalname);
        if (!validExtensions.includes(ext.toLowerCase())) {
          throw new Error('Las extensiones permitidas son .jpg, .jpeg, .png, .gif');
        }
      }
      return true;
    })
];
