import { MergeRequest } from "@/shared";

export type StateBadgesProps = {
  mr: MergeRequest;
};
export const StateBadges = ({ mr }: StateBadgesProps) => (
  <>
    {mr.isNew && <span className="badge badge-xs badge-accent truncate">New</span>}
    <span className="badge badge-xs badge-neutral truncate">{mr.state}</span>
    {mr.draft && <span className="badge badge-xs badge-warning truncate">Draft</span>}
    {mr.has_conflicts && (
      <span className="badge badge-xs badge-error truncate">Conflict</span>
    )}
    {mr.blocking_discussions_resolved === false && (
      <span className="badge badge-xs badge-warning truncate">Discussions</span>
    )}
  </>
);
