"use client";

import { useEffect } from "react";
import HealthScore from "@/components/HealthScore";

import PredictionCard from "@/components/PredictionCard";

import SpendingChart from "@/components/SpendingChart";
import AIInsight from "@/components/InsightCard";
import { useInsightsStore } from "@/store/insight.store";

export default function InsightsPage() {
  const { data, fetchInsights, loading } = useInsightsStore();

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading || !data) return <p>Loading insights...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Insights Dashboard</h1>

      {/* Top Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <HealthScore score={data.healthScore} />

        <PredictionCard prediction={data.prediction} />
      </div>

      {/* AI Insight */}
      <AIInsight insight={data.aiInsight} />

      {/* Chart */}
      <SpendingChart prediction={data.prediction} />
    </div>
  );
}
