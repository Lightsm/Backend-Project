const { Symbol } = require("../models");

exports.createSymbol = (data) => Symbol.create(data);

exports.getAllSymbols = () => Symbol.findAll();

exports.getSymbolById = (id) => Symbol.findByPk(id);

exports.updateSymbol = async (id, data) => {
  const symbol = await Symbol.findByPk(id);
  if (!symbol) return null;
  return symbol.update(data);
};

exports.deleteSymbol = async (id) => {
  const symbol = await Symbol.findByPk(id);
  if (!symbol) return null;
  await symbol.destroy();
  return true;
};