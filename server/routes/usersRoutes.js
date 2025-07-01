const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

const upload = require('../middlewares/multerUsers');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');

// Registro
router.get('/register', guestMiddleware, controller.registerForm);
router.post('/register', upload.single('image'), validateRegister, controller.register);

// Login
router.get('/login', guestMiddleware, controller.loginForm);
router.post('/login', validateLogin, controller.login);

// Perfil protegido
router.get('/profile', authMiddleware, controller.profile);

// Logout
router.get('/logout', controller.logout);

module.exports = router;
