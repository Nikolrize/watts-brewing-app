"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DashboardData } from "@/lib/data";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function StatCard({ title, value, suffix }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-brand">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {value} {suffix}
        </p>
      </CardContent>
    </Card>
  );
}

function TrendChart({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function ContributionChart({ value }: any) {
  const chartData = [
    { name: "Contribution", value },
    { name: "Remaining", value: 100 - value },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={80}
          label={({ name, value }) => `${name}: ${value}%`}
        >
          {chartData.map((_, i) => (
            <Cell key={i} />
          ))}
        </Pie>
        <Tooltip formatter={(val) => `${val}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("kinetic");
  const source =
    DashboardData.sources[tab as keyof typeof DashboardData.sources];
  const { kinetic, vibration, airflow } = DashboardData.sources;

  return (
    <div className="p-6 flex flex-col gap-4 overflow-y-auto">
      {/* TOP OVERVIEW */}
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="basis-1/5">
            <StatCard
              title="Total Energy"
              value={DashboardData.summary.totalEnergyGenerated_kWh}
              suffix="kWh"
            />
          </CarouselItem>

          <CarouselItem className="basis-1/5">
            <StatCard
              title="Live Rate"
              value={DashboardData.summary.realTimeGenerationRate_kWh_per_min}
              suffix="kWh/min"
            />
          </CarouselItem>

          <CarouselItem className="basis-1/5">
            <StatCard
              title="Peak Time"
              value={DashboardData.summary.peakGenerationTime}
            />
          </CarouselItem>

          <CarouselItem className="basis-1/5">
            <StatCard
              title="Efficiency"
              value={DashboardData.summary.systemEfficiency_percent}
              suffix="%"
            />
          </CarouselItem>

          <CarouselItem className="basis-1/5">
            <StatCard
              title="Devices"
              value={DashboardData.summary.totalConnectedDevices}
            />
          </CarouselItem>

          <CarouselItem className="basis-1/5">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-brand">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress
                  value={DashboardData.summary.energyStorageLevel_percent}
                />
                <p className="text-sm mt-2">
                  {DashboardData.summary.energyStorageLevel_percent}%
                </p>
              </CardContent>
            </Card>
          </CarouselItem>

          <CarouselItem className="basis-1/5">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-brand">
                  Top Performing Station
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">
                  {DashboardData.topPerformingStation.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {DashboardData.topPerformingStation.energyGenerated_kWh} kWh
                  generated
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* TABS */}
      <Tabs defaultValue="kinetic" onValueChange={setTab} className="flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="kinetic">Kinetic</TabsTrigger>
          <TabsTrigger value="vibration">Vibration</TabsTrigger>
          <TabsTrigger value="airflow">Airflow</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="flex flex-col gap-6">
          {/* SOURCE STATS */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard title="Energy" value={source.total_kWh} suffix="kWh" />
            <StatCard
              title="Contribution"
              value={source.contribution_percent}
              suffix="%"
            />

            {tab === "kinetic" && (
              <StatCard
                title="Efficiency"
                value={kinetic.efficiency_percent}
                suffix="%"
              />
            )}

            {tab === "vibration" && (
              <StatCard title="Sensors" value={vibration.activeSensors} />
            )}

            {tab === "airflow" && (
              <StatCard
                title="Turbine Eff."
                value={airflow.turbineEfficiency_percent}
                suffix="%"
              />
            )}
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-brand">Energy Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart data={source.trend} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-brand">Contribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ContributionChart value={source.contribution_percent} />
              </CardContent>
            </Card>
          </div>

          {/* AI INSIGHTS */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brand">AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Label className="text-muted-foreground">Next Peak:</Label>
                <p>{DashboardData.aiInsights.prediction.nextPeakTime}</p>
              </div>

              <div className="flex gap-2">
                <Label className="text-muted-foreground">
                  Expected Energy:
                </Label>
                <p>
                  {DashboardData.aiInsights.prediction.expectedEnergy_kWh} kWh
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">
                  Recommendations:
                </Label>
                <div className="flex gap-2">
                  {DashboardData.aiInsights.recommendations.map((rec, i) => (
                    <Badge key={i} variant="secondary">
                      {rec}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* STATION PERFORMANCE */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brand">Station Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DashboardData.stations.map((station) => (
                <div
                  key={station.name}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">
                      #{station.rank} {station.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Kinetic: {station.kinetic} | Vibration:{" "}
                      {station.vibration} | Airflow: {station.airflow}
                    </p>
                  </div>

                  <div className="font-bold">{station.total_kWh} kWh</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
