const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  getUsers,
  updateUserRole,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// PUBLIC
router.post("/register", register);
router.post("/login", login);

// USER
router.get("/profile", authMiddleware, getProfile);

// ADMIN
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getUsers
);

router.put(
  "/users/:id/role",
  authMiddleware,
  adminMiddleware,
  updateUserRole
);

module.exports = router;