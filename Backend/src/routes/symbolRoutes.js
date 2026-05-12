const express = require("express");
const router = express.Router();

const {
  createSymbol,
  getSymbols,
  getSymbolById,
  updateSymbol,
  deleteSymbol,
} = require("../controllers/symbolController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../utils/upload");

router.get("/", getSymbols);
router.get("/:id", getSymbolById);

router.post("/", auth, admin, upload.single("image"), createSymbol);
router.put("/:id", auth, admin, upload.single("image"), updateSymbol);
router.delete("/:id", auth, admin, deleteSymbol);

module.exports = router;