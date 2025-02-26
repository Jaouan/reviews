export const extractIssueRef = (text?: string): string | null => {
  const match = text?.match(/\b[A-Z]{3,}-\d+\b/);
  return match ? match[0] : null;
};
