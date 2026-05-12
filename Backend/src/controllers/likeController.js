const { Like } = require("../models");

exports.toggleLike = async (req, res) => {
  try {
    const { artifactId } = req.body;

    const existingLike = await Like.findOne({
      where: {
        UserId: req.user.id,
        ArtifactId: artifactId,
      },
    });

    if (existingLike) {
      await existingLike.destroy();
      return res.json({ message: "Like removed" });
    }

    const like = await Like.create({
      UserId: req.user.id,
      ArtifactId: artifactId,
    });

    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};