const { sequelize } = require("../config/db");

const ArtifactSymbol = sequelize.define("ArtifactSymbol", {}, { timestamps: false });

module.exports = ArtifactSymbol;