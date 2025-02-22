import { ApiSettings, getDaysAgo, isLessThanHours, logger } from "@/shared";

const findToken = (endpoint: string, tokens: Record<string, string>) =>
  Object.entries(tokens).find(([needle]) => endpoint.startsWith(needle))?.[1];

export const fetchMergeRequests = async ({
  endpoints,
  tokens,
}: ApiSettings) => {
  const mergeRequestsResponses = (
    await Promise.all(
      endpoints.map(async (endpoint) => {
        try {
          return {
            mergeRequests: await (
              await fetch(endpoint, {
                headers: {
                  Authorization: findToken(endpoint, tokens) ?? "",
                },
              })
            ).json(),
          };
        } catch (error) {
          logger.error("Error fetching endpoint", endpoint, error);
          return { errors: [{ endpoint, cause: error }] };
        }
      })
    )
  ).flat();

  const mergeRequests = mergeRequestsResponses
    .flatMap((response) => response.mergeRequests)
    .filter((mr) => mr != null)
    .map((mr) => ({
      ...mr,
      author: mr.author.name?.toLowerCase() ?? mr.author.username,
      project: mr.references.full.split("!")[0],
      title: mr.title.replace(/Draft: */, ""),
      isNew: isLessThanHours(new Date(mr.updated_at), 8),
      updatedDaysAgo: getDaysAgo(new Date(mr.updated_at)),
    }));

  const errors = mergeRequestsResponses
    .flatMap((response) => response.errors)
    .filter((error) => error != null);

  return { mergeRequests, errors };
};
