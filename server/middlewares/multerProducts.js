// server/middlewares/multerProducts.js
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ajusta la ruta según donde guardes las imágenes de productos
    cb(null, path.join(__dirname, '../public/img/products'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

module.exports = upload;
