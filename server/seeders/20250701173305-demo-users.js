'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Admin',
        lastName: 'Demo',
        email: 'admin@ecomercado.com',
        password: bcrypt.hashSync('admin123', 10),
        image: 'default.jpg',
        category: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Cliente',
        lastName: 'Ejemplo',
        email: 'cliente@ecomercado.com',
        password: bcrypt.hashSync('cliente123', 10),
        image: 'default.jpg',
        category: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
