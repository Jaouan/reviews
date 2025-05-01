import { groupBy } from "@/shared/group-by/group-by";
import { escapeHtml } from "@/shared/html/escape-html";
import { getHumanRelativeDate } from "@/shared/time/human-time/human-time";
import { MergeRequest } from "@/shared/types";

export const requestsGroupToHtmlFactory =
  (
    groupKey: {
      [K in keyof MergeRequest]: MergeRequest[K] extends string ? K : never;
    }[keyof MergeRequest] = "project"
  ) =>
  (requests: MergeRequest[]) => {
    const requestsByGroup = Object.entries(
      groupBy(requests, (mr) => mr[groupKey] ?? "Others")
    );
    return `<pre>${requestsByGroup
      .map(
        ([group, groupRequests]) =>
          `<span style="font-weight:bold;">${escapeHtml(
            group
          )}</span>\n${requestsToHtml(groupRequests)}`
      )
      .join("\n\n")}</pre>`;
  };

export const requestsToHtml = (requests: MergeRequest[]) =>
  requests
    .map(
      (request) =>
        `- <a href="${encodeURI(request.web_url)}">${escapeHtml(
          request.title
        )}</a> <span style="color:gray;">(${getHumanRelativeDate(
          new Date(request.updated_at)
        )?.toLocaleLowerCase()})</span>`
    )
    .join("\n");
