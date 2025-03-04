import { MergeRequest } from "@/shared";
import { MergeRequestCard } from "./RequestCard";
import { twMerge } from "tailwind-merge";

export type RequestsCardsProps = {
  mergeRequests: MergeRequest[];
  group?: string;
  groupClassName?: string;
  withProjectName?: boolean;
};
export const RequestsCards = ({
  group,
  mergeRequests,
  withProjectName,
  groupClassName,
}: RequestsCardsProps) => (
  <section>
    <div className="w-full">
      {group && (
        <span
          className={twMerge(
            "transition-all inline-block text-sm opacity-50 hover:opacity-100 tracking-wide mb-4",
            groupClassName
          )}
        >
          {group}
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
  </section>
);
