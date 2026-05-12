const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Artist = sequelize.define("Artist", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Artist;