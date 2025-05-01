import { getHumanRelativeDate, MergeRequest } from "@/shared";
import { PropsWithClassName } from "@/shared/react/PropsWithClassName";
import { twMerge } from "tailwind-merge";

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

export type RelativeDateProps = {
  mr: MergeRequest;
} & PropsWithClassName;
export const RelativeDateBadge = ({
  mr: { updated_at, updatedDaysAgo },
  className,
}: RelativeDateProps) => {
  return (
    <div
      className="flex tooltip tooltip-left"
      data-tip={new Date(updated_at).toLocaleString()}
    >
      <span
        className={twMerge(
          "truncate",
          getBadgeClass(updatedDaysAgo),
          className
        )}
      >
        {`${getHumanRelativeDate(new Date(updated_at))} ${getBadgeEmoji(
          updatedDaysAgo
        )}`}
      </span>
    </div>
  );
};
