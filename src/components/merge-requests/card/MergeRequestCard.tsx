import { RelativeDateBadge } from "../content/RelativeDateBadge";
import { MergeRequest } from "@/shared";
import { StateBadges } from "../content/StateBadges";
import { BranchBadge } from "../content/BranchBadge";
import { AuthorBadge } from "../content/AuthorBadge";

export type MergeRequestCardProps = {
  mergeRequest: MergeRequest;
};
export const MergeRequestCard = ({
  mergeRequest: mr,
}: MergeRequestCardProps) => (
  <a
    key={mr.id}
    href={mr.web_url}
    className="transition-all hover:scale-105 w-full sm:w-96"
  >
    <div className="card shadow-xs border-1 border-base-300 bg-base-200">
      <div className="card-body p-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <StateBadges mr={mr} />
          </div>
          <BranchBadge mr={mr} />
        </div>
        <div className="flex justify-between overflow-hidden">
          <h2 className="text-lg">{mr.title}</h2>
        </div>
        <div className="flex justify-between items-end">
          <AuthorBadge mr={mr} />
          <RelativeDateBadge mr={mr} />
        </div>
      </div>
    </div>
  </a>
);
