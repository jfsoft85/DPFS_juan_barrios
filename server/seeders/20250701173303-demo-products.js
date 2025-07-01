'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Manzana',
        price: 120.00,
        discount: 0,
        description: 'Manzana roja fresca',
        image: 'manzana.jpg',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leche entera',
        price: 8000,
        discount: 10,
        description: 'Leche de vaca pasteurizada',
        image: 'leche.jpg',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
