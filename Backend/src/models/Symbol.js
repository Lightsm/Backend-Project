const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Symbol = sequelize.define("Symbol", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING, allowNull: false },

  description: { type: DataTypes.TEXT },

  image: { type: DataTypes.STRING },
});

module.exports = Symbol;