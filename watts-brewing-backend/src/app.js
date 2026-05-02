const express = require("express");
const cors = require("cors");

const app = express();
const dashboardRoutes = require("./routes/dashboardRoutes");
const stationRoutes = require("./routes/stationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
