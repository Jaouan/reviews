import { IoIosArrowForward } from "react-icons/io";
import { RelativeDateBadge } from "./RelativeDate";
import { MergeRequest } from "@/shared";

export type MergeRequestsCardProps = {
  mergeRequest: MergeRequest;
};
export const MergeRequestCard = ({
  mergeRequest: mr,
}: MergeRequestsCardProps) => (
  <a key={mr.id} href={mr.web_url} className="overflow-hidden transition-all hover:scale-105 w-full sm:w-96">
    <div className="card shadow-sm border-1 border-base-300 bg-base-200">
      <div className="card-body p-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {mr.isNew && (
              <span className="badge badge-xs badge-accent">New</span>
            )}
            <span className="badge badge-xs badge-neutral">{mr.state}</span>
            {mr.draft && (
              <span className="badge badge-xs badge-warning">Draft</span>
            )}
            {mr.has_conflicts && (
              <span className="badge badge-xs badge-error">Conflict</span>
            )}
            {mr.blocking_discussions_resolved === false && (
              <span className="badge badge-xs badge-warning">Discussions</span>
            )}
          </div>

          <span className="transition-all badge badge-xs gap-0.5 text-base-content/50 hover:text-base-content truncate">
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
        </div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{mr.title}</h2>
        </div>
        {/*<div className="flex flex-wrap">
  {mr.labels.map((label) => (
  <span key={label} className="badge badge-xs badge-neutral">
    {label}
  </span>
  ))}
  </div>*/}
        <div className="flex justify-between items-end">
          <span className="badge-xs px-0 text-base-content/50 capitalize">
            {mr.author.name?.toLowerCase()}
          </span>
          <RelativeDateBadge mergeRequest={mr} />
        </div>
      </div>
    </div>
  </a>
);
