export function generateHealthScore(
  income: number,
  expenses: number,
  lastMonth: number,
  currentMonth: number,
) {
  let score = 0;

  const savingsRate = (income - expenses) / income;

  if (savingsRate > 0.2) score += 25;
  if (currentMonth < lastMonth) score += 15;
  if (currentMonth > lastMonth) score -= 10;

  return Math.max(0, Math.min(score, 100));
}
