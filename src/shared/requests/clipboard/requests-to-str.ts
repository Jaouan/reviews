import { groupBy } from "@/shared/group-by/group-by";
import { getHumanRelativeDate } from "@/shared/time/human-time/human-time";
import { MergeRequest } from "@/shared/types";

export const requestsGroupToStringFactory =
  (
    groupKey: {
      [K in keyof MergeRequest]: MergeRequest[K] extends string ? K : never;
    }[keyof MergeRequest] = "project"
  ) =>
  (requests: MergeRequest[]) => {
    const requestsByGroup = Object.entries(
      groupBy(requests, (mr) => mr[groupKey] ?? "Others")
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
