export const DashboardData = {
  summary: {
    totalEnergyGenerated_kWh: 1245.6,
    realTimeGenerationRate_kWh_per_min: 2.4,
    peakGenerationTime: "17:00 - 19:00",
    systemEfficiency_percent: 82,
    totalConnectedDevices: 128,
    energyStorageLevel_percent: 74,
  },

  sources: {
    kinetic: {
      total_kWh: 722.4,
      contribution_percent: 58,
      realTimeRate_kWh_per_min: 1.4,
      peakTime: "17:30 - 19:00",
      efficiency_percent: 88,
      energyPerTrainStop_kWh: 3.2,
      trend: [
        { time: "08:00", value: 30 },
        { time: "10:00", value: 55 },
        { time: "12:00", value: 70 },
        { time: "14:00", value: 85 },
        { time: "16:00", value: 110 },
        { time: "18:00", value: 150 },
        { time: "20:00", value: 95 },
      ],
    },

    vibration: {
      total_kWh: 336.3,
      contribution_percent: 27,
      realTimeRate_kWh_per_min: 0.7,
      peakTime: "16:00 - 18:30",
      activeSensors: 64,
      energyPerTrainPass_kWh: 1.1,
      bestTrackSection: "Tunnel B",
      trend: [
        { time: "08:00", value: 15 },
        { time: "10:00", value: 28 },
        { time: "12:00", value: 35 },
        { time: "14:00", value: 40 },
        { time: "16:00", value: 52 },
        { time: "18:00", value: 65 },
        { time: "20:00", value: 45 },
      ],
    },

    airflow: {
      total_kWh: 186.9,
      contribution_percent: 15,
      realTimeRate_kWh_per_min: 0.3,
      peakTime: "17:00 - 19:00",
      turbineEfficiency_percent: 72,
      energyPerTrainPass_kWh: 0.6,
      bestLocation: "Tunnel A",
      trend: [
        { time: "08:00", value: 10 },
        { time: "10:00", value: 15 },
        { time: "12:00", value: 18 },
        { time: "14:00", value: 22 },
        { time: "16:00", value: 28 },
        { time: "18:00", value: 35 },
        { time: "20:00", value: 25 },
      ],
    },
  },

  energyTrend_total: [
    { time: "08:00", value_kWh: 45 },
    { time: "10:00", value_kWh: 98 },
    { time: "12:00", value_kWh: 123 },
    { time: "14:00", value_kWh: 147 },
    { time: "16:00", value_kWh: 190 },
    { time: "18:00", value_kWh: 250 },
    { time: "20:00", value_kWh: 165 },
  ],

  stations: [
    {
      name: "KL Sentral",
      total_kWh: 210,
      kinetic: 130,
      vibration: 55,
      airflow: 25,
      rank: 1,
    },
    {
      name: "Pasar Seni",
      total_kWh: 180,
      kinetic: 105,
      vibration: 50,
      airflow: 25,
      rank: 2,
    },
    {
      name: "TBS",
      total_kWh: 165,
      kinetic: 95,
      vibration: 45,
      airflow: 25,
      rank: 3,
    },
    {
      name: "Bukit Bintang",
      total_kWh: 150,
      kinetic: 85,
      vibration: 40,
      airflow: 25,
      rank: 4,
    },
  ],

  topPerformingStation: {
    name: "KL Sentral",
    energyGenerated_kWh: 210,
  },

  aiInsights: {
    prediction: {
      nextPeakTime: "18:00 - 20:00",
      expectedEnergy_kWh: 1320,
    },
    recommendations: [
      "Increase vibration sensors in Tunnel B to improve output",
      "Optimize airflow turbine placement near high-speed zones",
      "Energy storage nearing capacity during peak hours",
    ],
  },

  alerts: [
    {
      type: "info",
      message: "System operating normally",
    },
    {
      type: "warning",
      message: "Airflow turbine efficiency slightly reduced at Tunnel A",
    },
  ],
};
