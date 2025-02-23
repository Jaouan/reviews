import { MergeRequest } from "@/shared";
import { MergeRequestCard } from "./MergeRequestCard";
import { twMerge } from "tailwind-merge";

export type MergeRequestsCardsProps = {
  mergeRequests: MergeRequest[];
  group?: string;
  groupClassName?: string;
  withProjectName?: boolean;
};
export const MergeRequestsCards = ({
  group,
  mergeRequests,
  withProjectName,
  groupClassName,
}: MergeRequestsCardsProps) => (
  <div key={group} className="w-full">
    {group && (
      <span
        className={twMerge(
          "transition-all inline-block text-sm opacity-50 hover:opacity-100 tracking-wide mb-4",
          groupClassName
        )}
      >
        {group === "undefined" || group === "null" ? "Others" : group}
      </span>
    )}
    <div
      className={twMerge(
        "flex flex-wrap gap-4",
        group ? null : "justify-center"
      )}
    >
      {mergeRequests.map((mr) => (
        <MergeRequestCard
          key={mr.id}
          mergeRequest={mr}
          withProjectName={withProjectName}
        />
      ))}
    </div>
  </div>
);
