export const groupBy = <T, K extends keyof any>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> =>
  array.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
