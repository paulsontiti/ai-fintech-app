export function predictNextMont(data: number[]) {
  if (data.length < 2) {
    return data[0] ?? 0;
  }

  const growthRates = [];

  for (let i = 1; i < data.length; i++) {
    growthRates.push(Number(data[i]) - Number(data[i - 1]) / Number(data[i]));
  }

  const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;

  const lastMonth = data[data.length - 1]

  return Number(lastMonth) * (1 + avgGrowth)
}
