const repo = require("../repositories/artifactRepository");

exports.createArtifact = async (data) => {
  return await repo.createArtifact(data);
};

exports.getAllArtifacts = async (query) => {
  return await repo.getAllArtifacts(query);
};

exports.getArtifactById = async (id) => {
  return await repo.getArtifactById(id);
};

exports.deleteArtifact = async (id) => {
  return await repo.deleteArtifact(id);
};