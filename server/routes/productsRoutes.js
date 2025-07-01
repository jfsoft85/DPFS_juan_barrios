const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

const upload = require('../middlewares/multerProducts');
const validateProduct = require('../middlewares/validateProduct');

// LISTADO de productos
router.get('/', controller.index);

// DETALLE
router.get('/:id', controller.detail);

// FORMULARIO de creación
router.get('/create', controller.create);

// ACCIÓN de creación
router.post('/', upload.single('image'), validateProduct, controller.store);

// FORMULARIO de edición
router.get('/:id/edit', controller.edit);

// ACCIÓN de edición
router.put('/:id', upload.single('image'), validateProduct, controller.update);

// ACCIÓN de eliminación
router.delete('/:id', controller.destroy);

module.exports = router;
