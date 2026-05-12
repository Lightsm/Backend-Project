const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Gallery = sequelize.define("Gallery", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING, allowNull: false },

  location: { type: DataTypes.STRING },
});

module.exports = Gallery;