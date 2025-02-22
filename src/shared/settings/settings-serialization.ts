export const endpointsStringToArray = (endpoints: string) =>
  endpoints
    .split("\n")
    .map((str) => str.trim())
    .filter((_) => _);

export const parseEndpointsFromQuery = (endpointsQueryString: string | null) =>
  endpointsQueryString
    ?.split(";")
    .map((str) => str.trim())
    .filter((_) => _) ?? [];
