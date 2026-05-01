const stations = require("../data/mockStations");

const getAllStations = (req, res) => {
  const rankedData = [...stations]
    .sort((a, b) => b.total_kWh - a.total_kWh)
    .map((station, index) => ({
      ...station,
      rank: index + 1,
    }));

  res.json({
    success: true,
    count: rankedData.length,
    data: rankedData,
  });
};

module.exports = { getAllStations };