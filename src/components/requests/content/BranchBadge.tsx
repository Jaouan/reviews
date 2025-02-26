import { MergeRequest } from "@/shared";
import { IoIosArrowForward } from "react-icons/io";
import { LuGitCommitHorizontal } from "react-icons/lu";

export type BranchBadgeProps = {
  mr: MergeRequest;
  withProjectName?: boolean;
};
export const BranchBadge = ({ mr, withProjectName }: BranchBadgeProps) => (
  <span className="badge badge-xs gap-0.5 text-base-content/50 truncate">
    {withProjectName && (
      <>
        {mr.project}
        <LuGitCommitHorizontal className="m-0 text-base-content/50" />
      </>
    )}
    {mr.target_branch === "develop" ? (
      mr.source_branch
    ) : (
      <>
        {mr.source_branch}
        <IoIosArrowForward className="m-0 text-base-content/50" />
        {mr.target_branch}
      </>
    )}
  </span>
);
