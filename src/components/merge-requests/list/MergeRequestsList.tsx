import { MergeRequest } from "@/shared";
import { StateBadges } from "../content/StateBadges";
import { BranchBadge } from "../content/BranchBadge";
import { AuthorBadge } from "../content/AuthorBadge";
import { RelativeDateBadge } from "../content/RelativeDateBadge";

export type MergeRequestsListProps = {
  mergeRequests: MergeRequest[];
};
export const MergeRequestsList = ({
  mergeRequests,
}: MergeRequestsListProps) => (
  <ul className="list">
    {mergeRequests.map((mr) => (
      <a href={mr.web_url}>
        <li className="list-row transition-all hover:bg-base-200 rounded-none sm:rounded-box">
          <div className="list-col-grow flex flex-col gap-1">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2 flex-wrap">
                <StateBadges mr={mr} />
                <BranchBadge mr={mr} withProjectName={true} />
              </div>
              <div className="flex flex-wrap justify-end gap-2 items-center">
                <AuthorBadge mr={mr} />
                <RelativeDateBadge mr={mr} className="min-w-[5rem] text-end" />
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <h2 className="text-lg">{mr.title}</h2>
            </div>
          </div>
        </li>
      </a>
    ))}
  </ul>
);
