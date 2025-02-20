export const isLessThanHours = (date: Date, hours: number) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff < hours * 3_600_000;
};

export const getDaysAgo = (date: Date): number => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfInput = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffDays = Math.floor(
    (startOfToday.getTime() - startOfInput.getTime()) / (24 * 60 * 60 * 1000)
  );

  return Math.max(0, diffDays);
};
