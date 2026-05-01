export type EnergyTrendPoint = {
  time: string;
  value: number;
};

export type TotalEnergyTrendPoint = {
  time: string;
  value_kWh: number;
};

export type KineticSource = {
  total_kWh: number;
  contribution_percent: number;
  realTimeRate_kWh_per_min: number;
  peakTime: string;
  efficiency_percent: number;
  energyPerTrainStop_kWh: number;
  trend: EnergyTrendPoint[];
};

export type VibrationSource = {
  total_kWh: number;
  contribution_percent: number;
  realTimeRate_kWh_per_min: number;
  peakTime: string;
  activeSensors: number;
  energyPerTrainPass_kWh: number;
  bestTrackSection: string;
  trend: EnergyTrendPoint[];
};

export type AirflowSource = {
  total_kWh: number;
  contribution_percent: number;
  realTimeRate_kWh_per_min: number;
  peakTime: string;
  turbineEfficiency_percent: number;
  energyPerTrainPass_kWh: number;
  bestLocation: string;
  trend: EnergyTrendPoint[];
};

export type EnergySources = {
  kinetic: KineticSource;
  vibration: VibrationSource;
  airflow: AirflowSource;
};

export type Station = {
  name: string;
  total_kWh: number;
  kinetic: number;
  vibration: number;
  airflow: number;
  rank: number;
};

export type TopPerformingStation = {
  name: string;
  energyGenerated_kWh: number;
};

export type AIInsights = {
  prediction: {
    nextPeakTime: string;
    expectedEnergy_kWh: number;
  };
  recommendations: string[];
};

export type Alert = {
  type: "info" | "warning" | "error";
  message: string;
};

export type DashboardDataType = {
  summary: {
    totalEnergyGenerated_kWh: number;
    realTimeGenerationRate_kWh_per_min: number;
    peakGenerationTime: string;
    systemEfficiency_percent: number;
    totalConnectedDevices: number;
    energyStorageLevel_percent: number;
  };

  sources: EnergySources;

  energyTrend_total: TotalEnergyTrendPoint[];

  stations: Station[];

  topPerformingStation: TopPerformingStation;

  aiInsights: AIInsights;

  alerts: Alert[];
};

export type EnergyTab = "kinetic" | "vibration" | "airflow";