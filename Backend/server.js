const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./src/config/db");
const routes = require("./src/routes");

const app = express();

app.use(cors());
app.use(express.json());

// serve images
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Backend running ");
});

// error handler
app.use(require("./src/middleware/errorMiddleware"));

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  const { sequelize } = require("./src/models");

  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;