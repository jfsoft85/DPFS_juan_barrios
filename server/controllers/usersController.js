const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = {
  registerForm: (req, res) => {
    res.render('users/register');
  },

  register: async (req, res) => {
    try {
      const existing = await db.User.findOne({ where: { email: req.body.email } });
      if (existing) {
        return res.render('users/register', {
          error: 'El email ya está registrado',
          old: req.body
        });
      }

      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        image: req.file ? req.file.filename : 'default.png'
      };

      await db.User.create(newUser);
      res.redirect('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.render('users/register', {
        error: 'Ocurrió un error al registrar el usuario',
        old: req.body
      });
    }
  },

  loginForm: (req, res) => {
    res.render('users/login');
  },

  login: async (req, res) => {
    try {
      const userToLogin = await db.User.findOne({ where: { email: req.body.email } });
      if (!userToLogin) {
        return res.render('users/login', { error: 'Email no registrado', old: req.body });
      }

      const passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);
      if (!passwordOk) {
        return res.render('users/login', { error: 'Contraseña incorrecta', old: req.body });
      }

      req.session.user = {
        id: userToLogin.id,
        name: userToLogin.name,
        email: userToLogin.email,
        image: userToLogin.image
      };

      if (req.body.remember) {
        res.cookie('recordame', req.session.user.email, { maxAge: 1000 * 60 * 5 });
      }

      res.redirect('/profile');
    } catch (error) {
      console.error('Error al hacer login:', error);
      res.render('users/login', {
        error: 'Ocurrió un error durante el login',
        old: req.body
      });
    }
  },

  profile: (req, res) => {
    res.render('users/profile', {
      user: req.session.user
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('recordame');
    res.redirect('/login');
  }
};
