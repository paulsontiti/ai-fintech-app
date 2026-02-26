"use client";

export default function HealthScore({ score }: { score: number }) {
  return (
    <div
      className="p-6 rounded-2xl bg-gradient-to-r
    from-emerald-500 to-green-600 text-white shadow "
    >
      <h2 className="text-lg">Financial Health</h2>

      <p className="text-2xl font-bold">
        {score}<span>/100</span>
      </p>
    </div>
  );
}
