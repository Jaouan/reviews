export const getReadableDuration = (minutes: number | null) => {
  if (minutes === null) return "";
  return minutes === 60 ? "1h" : `${minutes}m`;
};
