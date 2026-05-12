const service = require("../services/artifactService");

const { Artist, Gallery, Symbol } = require("../models");

// CREATE
exports.createArtifact = async (req, res) => {
  try {
    // If image is uploaded, store image path; otherwise store null
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Find existing artist or create new artist
    const [artist] = await Artist.findOrCreate({
      where: {
        name: req.body.artistName || "Unknown Artist",
      },
    });

    // Find existing gallery or create new gallery
    const [gallery] = await Gallery.findOrCreate({
      where: {
        name: req.body.galleryName || "Unknown Gallery",
      },
      defaults: {
        location: req.body.galleryLocation || "",
      },
    });

    // Create artifact and connect it with Artist and Gallery using foreign keys
    const artifact = await service.createArtifact({
      name: req.body.name,
      description: req.body.description,
      image: imagePath,
      ArtistId: artist.id,
      GalleryId: gallery.id,
    });

    // Find existing symbol or create new symbol, then connect with artifact
    if (req.body.symbolName) {
      const [symbol] = await Symbol.findOrCreate({
        where: {
          name: req.body.symbolName,
        },
      });

      await artifact.addSymbol(symbol.id);
    }

    res.status(201).json(artifact);
  } catch (err) {
    console.error("CREATE ARTIFACT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllArtifacts = async (req, res) => {
  try {
    const artifacts = await service.getAllArtifacts(req.query);
    res.json(artifacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getArtifactById = async (req, res) => {
  try {
    const artifact = await service.getArtifactById(req.params.id);

    if (!artifact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(artifact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateArtifact = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const artifact = await service.updateArtifact(req.params.id, updatedData);

    if (!artifact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(artifact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteArtifact = async (req, res) => {
  try {
    const success = await service.deleteArtifact(req.params.id);

    if (!success) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};