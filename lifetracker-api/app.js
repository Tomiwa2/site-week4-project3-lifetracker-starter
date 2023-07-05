const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  console.log("middiware tings");
  return next();
});

app.get("/", (request, res) => {
  console.log("hi");
  return res.status(200).json({ ping: "pong" });
});

module.exports = app;
