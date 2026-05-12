const repo = require("../repositories/symbolRepository");

exports.createSymbol = (data) => repo.createSymbol(data);

exports.getAllSymbols = () => repo.getAllSymbols();

exports.getSymbolById = (id) => repo.getSymbolById(id);

exports.updateSymbol = (id, data) => repo.updateSymbol(id, data);

exports.deleteSymbol = (id) => repo.deleteSymbol(id);