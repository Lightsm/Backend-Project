const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Artifact = sequelize.define("Artifact", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING, allowNull: false },

  description: { type: DataTypes.TEXT },

  image: { type: DataTypes.STRING },
});

module.exports = Artifact;