const express = require("express");
const cors = require("cors");

const app = express();
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
