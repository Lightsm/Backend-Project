const {
  Artifact,
  Artist,
  Gallery,
  Symbol,
  Like,
  Pin,
} = require("../models");

const { Op } = require("sequelize");

exports.createArtifact = async (data) => {
  return await Artifact.create(data);
};

exports.getAllArtifacts = async (query) => {
  const { search, symbol } = query;

  let whereClause = {};

  if (search) {
    whereClause.name = {
      [Op.iLike]: `%${search}%`,
    };
  }

  return await Artifact.findAll({
    where: whereClause,
    include: [
      Artist,
      Gallery,
      {
        model: Symbol,
        where: symbol ? { name: symbol } : undefined,
        required: !!symbol,
      },
      Like,
      Pin,
    ],
    order: [["id", "DESC"]],
  });
};

exports.getArtifactById = async (id) => {
  return await Artifact.findByPk(id, {
    include: [Artist, Gallery, Symbol, Like, Pin],
  });
};

exports.deleteArtifact = async (id) => {
  const artifact = await Artifact.findByPk(id);

  if (!artifact) return null;

  await artifact.destroy();
  return true;
};