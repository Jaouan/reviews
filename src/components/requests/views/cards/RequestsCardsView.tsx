import { groupBy, MergeRequest } from "@/shared";
import { useRequests } from "@/stores";
import { RequestsCards } from "./RequestCards";
import { twMerge } from "tailwind-merge";

export type RequestsCardsGroupByLayoutProps = {
  groupByKey?: {
    [K in keyof MergeRequest]: MergeRequest[K] extends string ? K : never;
  }[keyof MergeRequest];
  groupClassName?: string;
  withProjectName?: boolean;
};
export const RequestsCardsGroupByLayout = ({
  groupByKey,
  groupClassName,
  withProjectName,
}: RequestsCardsGroupByLayoutProps) => {
  const { mergeRequests } = useRequests();

  const mergeRequestsByGroup: [string | undefined, MergeRequest[]][] =
    groupByKey
      ? Object.entries(groupBy(mergeRequests ?? [], (mr) => mr[groupByKey]))
      : [["", mergeRequests ?? []]];

  return (
    <section className="transition-all px-4 sm:px-8 pb-8 gap-8 flex flex-col">
      {mergeRequestsByGroup.map(([group, mergeRequests]) => (
        <RequestsCards
          key={group}
          group={group}
          groupClassName={groupClassName}
          mergeRequests={mergeRequests}
          withProjectName={withProjectName}
        />
      ))}
    </section>
  );
};

export type RequestsCardsGroupByLayoutSkeletonProps = {
  compact?: boolean;
};
export const RequestsCardsGroupByLayoutSkeleton = ({
  compact = false,
}: RequestsCardsGroupByLayoutSkeletonProps) => {
  const groupsCount = compact ? 1 : 3;
  const cardsCount = compact ? 8 : 3;
  return (
    <section className="transition-all px-4 sm:px-8 pb-8 gap-16 w-full flex flex-row flex-wrap">
      {Array.from({ length: groupsCount }).map((_, i) => (
        <article key={i} className="w-full">
          {compact ? null : <div className="skeleton w-48 h-6 mb-4"></div>}
          <div
            className={twMerge(
              "flex flex-wrap gap-4",
              compact ? "justify-center" : ""
            )}
          >
            {Array.from({ length: cardsCount }).map((_, i) => (
              <div
                key={i}
                className="transition-all skeleton w-full sm:w-96 h-28"
              ></div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
};
