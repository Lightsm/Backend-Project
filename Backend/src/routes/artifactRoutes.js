const express = require("express");
const router = express.Router();

const {
  createArtifact,
  getAllArtifacts,
  getArtifactById,
  updateArtifact,
  deleteArtifact,
} = require("../controllers/artifactController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../utils/upload");

// PUBLIC
router.get("/", getAllArtifacts);
router.get("/:id", getArtifactById);

// ADMIN ONLY
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createArtifact
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateArtifact
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteArtifact);

module.exports = router;