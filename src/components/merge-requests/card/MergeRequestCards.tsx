import { MergeRequest } from "@/shared";
import { MergeRequestCard } from "./MergeRequestCard";

export type MergeRequestsCardsProps = {
  project?: string;
  mergeRequests: MergeRequest[];
};
export const MergeRequestsCards = ({
  project,
  mergeRequests,
}: MergeRequestsCardsProps) => (
  <div key={project} className="w-full">
    {project && (
      <a
        href={mergeRequests[0]?.web_url}
        className="transition-all inline-block text-sm opacity-50 hover:opacity-100 tracking-wide mb-4"
      >
        {project}
      </a>
    )}
    <div className="flex flex-wrap gap-4">
      {mergeRequests.map((mr) => (
        <MergeRequestCard key={mr.id} mergeRequest={mr} />
      ))}
    </div>
  </div>
);
