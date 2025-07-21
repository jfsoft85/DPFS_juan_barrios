const db = require('../../models');

module.exports = {
  // Listado de productos
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: [{ model: db.Category, as: 'category', attributes: ['id', 'name'] }]
      });

      const countByCategory = {};
      products.forEach(p => {
        const catName = p.category ? p.category.name : 'Sin categoría';
        countByCategory[catName] = (countByCategory[catName] || 0) + 1;
      });

      res.json({
        count: products.length,
        countByCategory,
        products: products.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          category: p.category ? { id: p.category.id, name: p.category.name } : null,
          detail: `/api/products/${p.id}`
        }))
      });
    } catch (error) {
      console.error('Error al obtener listado de productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  // Detalle de un producto
  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [{ model: db.Category, as: 'category', attributes: ['id', 'name'] }]
      });

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        image: `/img/products/${product.image}`,
        category: product.category ? { id: product.category.id, name: product.category.name } : null
      });
    } catch (error) {
      console.error('Error al obtener detalle de producto:', error);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  }
};
