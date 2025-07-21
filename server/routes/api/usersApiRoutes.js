const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/usersApiController');

// GET /api/users   → listado de usuarios
router.get('/', controller.list);

// GET /api/users/:id → detalle de un usuario
router.get('/:id', controller.detail);

module.exports = router;
