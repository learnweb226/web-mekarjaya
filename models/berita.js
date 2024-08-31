'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Berita.init({
    judul_berita: {
      type: DataTypes.STRING,
      allowNull: false
    },
    penulis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    konten_berita: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tanggal_posting: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Berita',
  });
  return Berita;
};