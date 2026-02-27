"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export function ForecastChart() {
  const [chartData, setChartData] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const res = await api.get("/forecast");
      setChartData(res.data.chartData);
    })();
  }, []);
  if (!chartData) return <p>Loading forecast...</p>;
  return (
    <ResponsiveContainer width={300} height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="month" />
        <Tooltip />
        <Line dataKey="balance" stroke="#22c55e" />
      </LineChart>
    </ResponsiveContainer>
  );
}
