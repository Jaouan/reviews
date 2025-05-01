export const expandEndpointPattern = (url: string): string[] => {
  const match = url.match(/\{([^}]+)\}/);
  if (!match) return [url];
  const ids = match[1].split(",");
  return ids.flatMap((id) => expandEndpointPattern(url.replace(match[0], id)));
};
