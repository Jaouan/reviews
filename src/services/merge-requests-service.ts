import {
  ApiSettings,
  expandEndpointPattern,
  getDaysAgo,
  isLessThanHours,
  logger,
} from "@/shared";
import { extractIssueRef } from "@/shared/issue/extract-issue";

export const findToken = (endpoint: string, tokens: Record<string, string>) =>
  Object.entries(tokens).find(([needle]) => endpoint.startsWith(needle))?.[1];

export const extractShortProjectName = (fullReferences: string) =>
  fullReferences.split("!")[0]?.split("/").pop();

export const fetchMergeRequests = async ({
  endpoints,
  tokens,
}: ApiSettings) => {
  const expandedEndpoints = endpoints.flatMap(expandEndpointPattern);

  const mergeRequestsResponses = (
    await Promise.all(
      expandedEndpoints.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint, {
            headers: {
              Authorization: findToken(endpoint, tokens) ?? "",
            },
          });
          if (response.status === 401 || response.status === 403) {
            throw {
              unauthorized: true,
            };
          }
          if (response.status !== 200) {
            throw {
              httpStatus: response.status,
            };
          }
          return {
            mergeRequests: await response.json(),
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
      project: extractShortProjectName(mr.references.full),
      title: mr.title.replace(/Draft: */, ""),
      isNew: isLessThanHours(new Date(mr.created_at), 8),
      updatedDaysAgo: getDaysAgo(new Date(mr.updated_at)),
      issue: extractIssueRef(mr.title) ?? extractIssueRef(mr.source_branch),
    }))
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));

  const errors = mergeRequestsResponses
    .flatMap((response) => response.errors)
    .filter((error) => error != null);

  return { mergeRequests, errors };
};
