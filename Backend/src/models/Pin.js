const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Pin = sequelize.define("Pin", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

module.exports = Pin;