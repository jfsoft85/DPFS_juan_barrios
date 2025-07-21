// server/index.js

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rememberMiddleware = require('./middlewares/rememberMiddleware');

const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const usersApiRoutes = require('./routes/api/usersApiRoutes');
const productsApiRoutes = require('./routes/api/productsApiRoutes');

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({ secret: 'EcoMercadoSecret', resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.use(rememberMiddleware);

// Compartir sesión con las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, imágenes, JS front)
app.use(express.static(path.join(__dirname, '../client')));
app.use('/img/products', express.static(path.join(__dirname, 'public/img/products')));
app.use('/img/users', express.static(path.join(__dirname, 'public/img/users')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Rutas de vistas
app.use('/products', productsRoutes);
app.use('/', usersRoutes);

// API REST
app.use('/api/users', usersApiRoutes);
app.use('/api/products', productsApiRoutes);

// Ruta raíz → redirige a listado de productos
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
