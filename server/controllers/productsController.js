const db = require('../models');

module.exports = {
  index: async (req, res) => {
    const products = await db.Product.findAll({ include: ['category'] });
    res.render('products/index', { products });
  },

  detail: async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, {
      include: ['category']
    });
    res.render('products/detail', { product });
  },

  create: async (req, res) => {
    const categories = await db.Category.findAll();
    res.render('products/create', { categories });
  },

  store: async (req, res) => {
    try {
      await db.Product.create({
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount || 0,
        description: req.body.description,
        image: req.file ? req.file.filename : 'default.jpg',
        categoryId: req.body.category
      });
      res.redirect('/products');
    } catch (error) {
      console.error('Error al crear producto:', error);
      const categories = await db.Category.findAll();
      res.render('products/create', {
        categories,
        error: 'Ocurrió un error al guardar el producto. Por favor, revisá los campos.'
      });
    }
  },

  edit: async (req, res) => {
    const product = await db.Product.findByPk(req.params.id);
    const categories = await db.Category.findAll();
    res.render('products/edit', { product, categories });
  },

  update: async (req, res) => {
    try {
      await db.Product.update({
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount || 0,
        description: req.body.description,
        image: req.file ? req.file.filename : req.body.oldImage,
        categoryId: req.body.category
      }, {
        where: { id: req.params.id }
      });
      res.redirect('/products');
    } catch (error) {
      console.error('Error al actualizar producto:', error);

      const product = await db.Product.findByPk(req.params.id);
      const categories = await db.Category.findAll();

      res.render('products/edit', {
        product,
        categories,
        error: 'Ocurrió un error al actualizar el producto. Verificá los datos ingresados.'
      });
    }
  },

  destroy: async (req, res) => {
    await db.Product.destroy({ where: { id: req.params.id } });
    res.redirect('/products');
  }
};
