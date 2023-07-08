const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const security = require ("./middleware/security")
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(security.extractUserFromJwt)
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  console.log("middiware tings");
  return next();
});

app.get("/", (request, res) => {
  console.log("hi");
  return res.status(200).json({ ping: "pong" });
});



/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})


module.exports = app
