"use client";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function ForecastCard() {
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get("/forecast");
      setForecast(res.data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-black">Loading forecast...</p>;
  if (!forecast) return <p>No Forecast</p>;

  return (
    <div className="bg-zinc-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4"> Financial Forecast </h2>
      <p> Next Month Expense: ₦{forecast.predictedExpense.toFixed(0)} </p>
      <p> Predicted Balance: ₦{forecast.predictedBalance.toFixed(0)} </p>
      <p> Trend: {forecast.spendingTrend} </p>
    </div>
  );
}
