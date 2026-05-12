const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const artifactRoutes = require("./artifactRoutes");
const symbolRoutes = require("./symbolRoutes");
const pinRoutes = require("./pinRoutes");

const likeRoutes = require("./likeRoutes");

router.use("/likes", likeRoutes);

router.use("/auth", authRoutes);
router.use("/artifacts", artifactRoutes);
router.use("/symbols", symbolRoutes);
router.use("/pins", pinRoutes);

module.exports = router;