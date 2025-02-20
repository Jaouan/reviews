import { MergeRequestsCards } from "@/components/merge-requests/MergeRequestCards";
import { groupBy } from "@/shared";
import { useMergeRequests } from "@/stores";

export default function MergeRequestCardsPage() {
  const { mergeRequests } = useMergeRequests();
  const mergeRequestsByProject = mergeRequests
    ? Object.entries(
        groupBy(mergeRequests, (mr) => mr.references.full.split("!")[0])
      )
    : [];

  if (mergeRequests === null) return <Skeletons />;

  return (
    <section className="px-8 pb-8 gap-8 flex flex-col">
      {mergeRequestsByProject.map(([project, mergeRequests]) => (
        <MergeRequestsCards
          key={project}
          title={project}
          mergeRequests={mergeRequests}
        />
      ))}
    </section>
  );
}

const Skeletons = () => (
  <div className="mt-8 px-8 pb-8 gap-4 flex flex-col">
    <div className="skeleton h-8 max-w-64"></div>
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      <div className="skeleton h-32 w-96"></div>
      <div className="skeleton h-32 w-96"></div>
      <div className="skeleton h-32 w-96"></div>
      <div className="skeleton h-32 w-96"></div>
    </div>
    <div className="mt-8 skeleton h-8 max-w-64"></div>
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      <div className="skeleton h-32 w-96"></div>
      <div className="skeleton h-32 w-96"></div>
      <div className="skeleton h-32 w-96"></div>
      <div className="skeleton h-32 w-96"></div>
    </div>
  </div>
);
