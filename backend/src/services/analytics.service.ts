import prisma from "../config/prisma";

export async function getUserAnalytics(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
  });

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = transactions.reduce(
    (acc: Record<string, number>, t) => {
      acc[t.category!] = (acc[t.category!] || 0) + t.amount;
      return acc;
    },
    {},
  );

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  return {
    totalExpenses,
    topCategory,
    transactions,
  };
}
