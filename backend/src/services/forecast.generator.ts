import prisma from "../config/prisma";

export const generateForecast = async (userId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });

    if (!transactions.length) return null;

    const monthly: Record<string, number> = {};

    transactions.forEach((tx) => {
      const month = new Date(tx.createdAt).toISOString().slice(0, 7);
      monthly[month] = (monthly[month] || 0) + tx.amount;
    });

    const values = Object.values(monthly);

    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const lastMonth = values[values.length - 1];

    const growthRate = Number(lastMonth) / average;

    const predictedExpense = average * growthRate;

    const wallet = await prisma.wallet.findFirst({
      where: {
        userId,
      },
    });

    const currentBalance = wallet?.balance || 0;

    const predictedBalance = currentBalance - predictedExpense;
    const trend = growthRate > 1 ? "Increasing" : "Stable";

    const chartData = [
      {
        montth: "Now",
        balance: currentBalance,
      },
      {
        montth: "Next Month",
        balance: predictedBalance,
      },
      {
        montth: "2 Months",
        balance: predictedBalance * 0.8,
      },
    ];

    return {
      predictedExpense,
      predictedBalance,
      spendingTrend: trend,
      chartData,
    };
  } catch (error: any) {
    console.log(error);
  }
};
