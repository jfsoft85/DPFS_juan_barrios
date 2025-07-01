const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

// LISTADO de productos
router.get('/', controller.index);

// FORMULARIO de creación (¡debe ir antes del :id!)
router.get('/create', controller.create);

// FORMULARIO de edición (¡también antes!)
router.get('/:id/edit', controller.edit);

// DETALLE de un producto
router.get('/:id', controller.detail);

// ACCIÓN de creación (POST)
router.post('/', controller.store);

// ACCIÓN de actualización (PUT)
router.put('/:id', controller.update);

// ACCIÓN de eliminación (DELETE)
router.delete('/:id', controller.destroy);

module.exports = router;
