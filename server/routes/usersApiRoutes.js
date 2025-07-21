// server/routes/api/usersApiRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/usersApiController');

// GET /api/users → listado
router.get('/', controller.list);

// GET /api/users/:id → detalle
router.get('/:id', controller.detail);

module.exports = router;
