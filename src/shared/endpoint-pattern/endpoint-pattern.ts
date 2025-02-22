export const expandEndpointPattern = (url: string): string[] => {
  const match = url.match(/\{([^}]+)\}/);
  if (!match) return [url];
  const ids = match[1].split(",");
  return ids.map((id) => url.replace(match[0], id));
};
