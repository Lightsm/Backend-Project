const { Symbol, ArtifactSymbol } = require("../models");
const { Op } = require("sequelize");

// CREATE
exports.createSymbol = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const symbol = await Symbol.create({
      name: req.body.name,
      description: req.body.description,
      image: imagePath,
    });

    res.status(201).json(symbol);
  } catch (err) {
    console.error("CREATE SYMBOL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getSymbols = async (req, res) => {
  try {
    const { search } = req.query;

    let where = {};

    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const symbols = await Symbol.findAll({
      where,
      include: "Artifacts",
      order: [["id", "DESC"]],
    });

    res.json(symbols);
  } catch (err) {
    console.error("GET SYMBOLS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getSymbolById = async (req, res) => {
  try {
    const symbol = await Symbol.findByPk(req.params.id, {
      include: "Artifacts",
    });

    if (!symbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }

    res.json(symbol);
  } catch (err) {
    console.error("GET SYMBOL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateSymbol = async (req, res) => {
  try {
    const symbol = await Symbol.findByPk(req.params.id);

    if (!symbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }

    let data = {
      name: req.body.name,
      description: req.body.description,
    };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    await symbol.update(data);

    res.json(symbol);
  } catch (err) {
    console.error("UPDATE SYMBOL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteSymbol = async (req, res) => {
  try {
    const symbol = await Symbol.findByPk(req.params.id);

    if (!symbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }

    // remove only relation from join table, artifact will NOT delete
    await ArtifactSymbol.destroy({
      where: {
        SymbolId: req.params.id,
      },
    });

    await symbol.destroy();

    res.json({ message: "Symbol deleted successfully" });
  } catch (err) {
    console.error("DELETE SYMBOL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};