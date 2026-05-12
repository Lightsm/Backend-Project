const { Pin, Artifact } = require("../models");

exports.createPin = (userId, artifactId) => {
  return Pin.create({ UserId: userId, ArtifactId: artifactId });
};

exports.getUserPins = (userId) => {
  return Pin.findAll({
    where: { UserId: userId },
    include: [Artifact],
  });
};

exports.deletePin = async (userId, artifactId) => {
  const pin = await Pin.findOne({
    where: { UserId: userId, ArtifactId: artifactId },
  });

  if (!pin) return null;

  await pin.destroy();
  return true;
};