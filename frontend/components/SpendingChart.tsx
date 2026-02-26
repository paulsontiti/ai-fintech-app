"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SpendingChart({
  prediction,
}: any) {

  const data = [
    {
      name: "Prediction",
      amount: Number(prediction),
    },
  ];

  return (
    <div className="w-full h-[320px] bg-white rounded-xl p-6 shadow">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#666"/>
          <YAxis stroke="#666"/>
          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#22c55e"
          />
         
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}