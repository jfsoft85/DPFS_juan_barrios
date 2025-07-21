const db = require('../../models');

module.exports = {
  // Listado de usuarios
  list: async (req, res) => {
    try {
      const users = await db.User.findAll({ attributes: ['id', 'name', 'email', 'image'] });
      res.json({
        count: users.length,
        users: users.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          image: `/img/users/${u.image}`,
          detail: `/api/users/${u.id}`
        }))
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al leer usuarios' });
    }
  },

  // Detalle de un usuario
  detail: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'image']
      });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        image: `/img/users/${user.image}`
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener detalle de usuario' });
    }
  }
};
