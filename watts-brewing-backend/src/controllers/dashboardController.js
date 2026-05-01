const DashboardData = require("../data/mockDashboard");

const getDashboard = (req, res) => {
  res.json(DashboardData);
};

module.exports = { getDashboard };