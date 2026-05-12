const repo = require("../repositories/pinRepository");

exports.createPin = (userId, artifactId) => {
  return repo.createPin(userId, artifactId);
};

exports.getUserPins = (userId) => {
  return repo.getUserPins(userId);
};

exports.deletePin = (userId, artifactId) => {
  return repo.deletePin(userId, artifactId);
};