export function calculateCatchProbability(
  fishLevel: number,
  catchRate: number
): number {
  const diff = catchRate - fishLevel;
  const probability = Math.min(Math.max(0.1 + diff / 100, 0.05), 0.95); // entre 5% et 95%
  return probability;
}
