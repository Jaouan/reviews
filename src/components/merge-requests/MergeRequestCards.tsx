import { MergeRequest } from "@/shared";
import { MergeRequestCard } from "./MergeRequestCard";

export type MergeRequestsCardsProps = {
  project: string;
  mergeRequests: MergeRequest[];
};
export const MergeRequestsCards = ({
  project,
  mergeRequests,
}: MergeRequestsCardsProps) => (
  <article key={project}>
    <a
      href={mergeRequests[0]?.web_url}
      className="inline-block text-xl font-bold mb-4 mt-8"
    >
      {project}
    </a>
    <div className="flex flex-wrap gap-4">
      {mergeRequests.map((mr) => (
        <MergeRequestCard key={mr.id} mergeRequest={mr} />
      ))}
    </div>
  </article>
);
