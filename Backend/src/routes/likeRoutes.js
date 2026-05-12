const express = require("express");
const router = express.Router();

const { toggleLike } = require("../controllers/likeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, toggleLike);

module.exports = router;