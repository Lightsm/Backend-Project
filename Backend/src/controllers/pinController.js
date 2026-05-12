const { Pin, Artifact } = require("../models");

exports.createPin = async (req, res) => {
  try {
    const { artifactId } = req.body;

    const existingPin = await Pin.findOne({
      where: {
        UserId: req.user.id,
        ArtifactId: artifactId,
      },
    });

    if (existingPin) {
      return res.status(400).json({ message: "Already pinned" });
    }

    const pin = await Pin.create({
      UserId: req.user.id,
      ArtifactId: artifactId,
    });

    res.status(201).json(pin);
  } catch (err) {
    console.error("PIN CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUserPins = async (req, res) => {
  try {
    const pins = await Pin.findAll({
      where: { UserId: req.user.id },
      include: [Artifact],
    });

    res.json(pins);
  } catch (err) {
    console.error("GET PINS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.deletePin = async (req, res) => {
  try {
    const pin = await Pin.findOne({
      where: {
        UserId: req.user.id,
        ArtifactId: req.params.artifactId,
      },
    });

    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    await pin.destroy();

    res.json({ message: "Unpinned successfully" });
  } catch (err) {
    console.error("DELETE PIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};