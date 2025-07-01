const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// Registro
router.get('/register', guestMiddleware, controller.registerForm);
router.post('/register', upload.single('image'), controller.register);

// Login
router.get('/login', guestMiddleware, controller.loginForm);
router.post('/login', controller.login);

// Perfil (solo si está logueado)
router.get('/profile', authMiddleware, controller.profile);

// Logout
router.get('/logout', controller.logout);

module.exports = router;
