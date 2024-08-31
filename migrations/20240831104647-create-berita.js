'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Berita', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul_berita: {
        type: Sequelize.STRING,
        allowNull: false
      },
      penulis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      konten_berita: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tanggal_posting: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Berita');
  }
};