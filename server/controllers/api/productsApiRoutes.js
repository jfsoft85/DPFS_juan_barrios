// server/routes/api/productsApiRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/productsApiController');

// GET /api/products   → listado de productos
router.get('/', controller.list);

// GET /api/products/:id → detalle de un producto
router.get('/:id', controller.detail);

module.exports = router;
