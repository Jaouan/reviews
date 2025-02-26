import { MergeRequest } from "@/shared";

export type AuthorBadgeProps = {
  mr: MergeRequest;
};
export const AuthorBadge = ({ mr }: AuthorBadgeProps) => (
  <span className="badge-xs px-0 text-base-content/50 capitalize truncate">
    {mr.author}
  </span>
);
