import { MergeRequest } from "@/shared";
import { IoIosArrowForward } from "react-icons/io";

export type BranchBadgeProps = {
  mr: MergeRequest;
};
export const BranchBadge = ({ mr }: BranchBadgeProps) => (
  <span className="badge badge-xs gap-0.5 text-base-content/50 truncate">
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
