import { MergeRequest } from "@/shared";
import { MergeRequestCard } from "./MergeRequestCard";

export type MergeRequestsCardsProps = {
  title: string;
  mergeRequests: MergeRequest[];
};
export const MergeRequestsCards = ({
  title,
  mergeRequests,
}: MergeRequestsCardsProps) => (
  <article key={title}>
    <a
      href={mergeRequests[0]?.web_url}
      className="inline-block text-xl font-bold mb-4 mt-8"
    >
      {title}
    </a>
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {mergeRequests.map((mr) => (
        <MergeRequestCard key={mr.id} mergeRequest={mr} />
      ))}
    </div>
  </article>
);
