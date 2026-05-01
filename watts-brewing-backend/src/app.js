const express = require("express");
const cors = require("cors");

const app = express();
const dashboardRoutes = require("./routes/dashboardRoutes");
const stationRoutes = require("./routes/stationRoutes")

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stations", stationRoutes)

module.exports = app;
