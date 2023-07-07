// const express = require("express");
// const cors = require("cors");
// const { NotFoundError, BadRequestError } = require("./utils/errors");
// //const pool = require('./config/database')
// const authRoutes = require("./routes/auth");
const app = require("./app");

const { PORT } = require("./config");

// const app = express();
//const PORT = process.env.PORT || 3001;
//const router = require('./config/routes')


// app.use("/auth", authRoutes);

// app.use((req, res, next) => {
//   return next(new NostFoundError());
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
