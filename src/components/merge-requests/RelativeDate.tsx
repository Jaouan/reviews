import { MergeRequest } from "@/shared";

const getBadgeClass = (diffDays: number): string => {
  if (diffDays > 60) return "badge badge-xs badge-neutral";
  if (diffDays > 20) return "badge badge-xs badge-error";
  if (diffDays > 10) return "badge badge-xs badge-warning";
  return "badge-xs text-base-content/50";
};
const getBadgeEmoji = (diffDays: number): string | null => {
  if (diffDays > 60) return "💀";
  return "";
};

const diffDaysString: Record<number, string> = {
  0: "Today",
  1: "Yesterday",
};

export type RelativeDateProps = {
  mergeRequest: MergeRequest;
};
export const RelativeDateBadge = ({
  mergeRequest: { updated_at, updatedDaysAgo },
}: RelativeDateProps) => {
  return (
    <div
      className="tooltip tooltip-left"
      data-tip={new Date(updated_at).toLocaleString()}
    >
      <span className={getBadgeClass(updatedDaysAgo)}>
        {diffDaysString[updatedDaysAgo] ??
          `${updatedDaysAgo} days ago ${getBadgeEmoji(updatedDaysAgo)}`}
      </span>
    </div>
  );
};
