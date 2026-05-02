const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const dashboardRoutes = require("./routes/dashboardRoutes");
const stationRoutes = require("./routes/stationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const allowedOrigins = new Set([
  "http://localhost:3000",
  process.env.FRONTEND_URL,
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
