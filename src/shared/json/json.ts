export const isValidJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};
