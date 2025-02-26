import { groupBy } from "../group-by/group-by";
import { getHumanRelativeDate } from "../time/time";
import { MergeRequest } from "../types";

export const requestsGroupToStringFactory =
  (
    groupKey: {
      [K in keyof MergeRequest]: MergeRequest[K] extends string ? K : never;
    }[keyof MergeRequest] = "project"
  ) =>
  (requests: MergeRequest[]) => {
    const requestsByGroup = Object.entries(
      groupBy(requests, (mr) => mr[groupKey])
    );
    return requestsByGroup
      .map(
        ([group, groupRequests]) =>
          `${group}\n${requestsToString(groupRequests)}`
      )
      .join("\n\n");
  };

export const requestsToString = (requests: MergeRequest[]) =>
  requests
    .map(
      (request) =>
        `  - ${request.title} - ${request.web_url} (${getHumanRelativeDate(
          new Date(request.updated_at)
        )?.toLocaleLowerCase()})`
    )
    .join("\n");
