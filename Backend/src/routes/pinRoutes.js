const express = require("express");
const router = express.Router();

const {
  createPin,
  getUserPins,
  deletePin,
} = require("../controllers/pinController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPin);
router.get("/", authMiddleware, getUserPins);
router.delete("/:artifactId", authMiddleware, deletePin);

module.exports = router;