import { MergeRequestsCards } from "@/components/merge-requests/card/MergeRequestCards";
import { MergeRequestsLayout } from "@/components/merge-requests/MergeRequestsLayout";
import { groupBy } from "@/shared";
import { useMergeRequests } from "@/stores";

export default function MergeRequestCardsPage() {
  const { mergeRequests } = useMergeRequests();
  const mergeRequestsByProject = mergeRequests
    ? Object.entries(groupBy(mergeRequests, (mr) => mr.project))
    : [];

  if (mergeRequests === null) return <Skeletons />;

  return (
    <MergeRequestsLayout layout="">
      <section className="px-8 pb-8 gap-8 flex flex-row flex-wrap">
        {mergeRequestsByProject.map(([project, mergeRequests]) => (
          <MergeRequestsCards
            key={project}
            project={project}
            mergeRequests={mergeRequests}
          />
        ))}
      </section>
    </MergeRequestsLayout>
  );
}

const Skeletons = () => (
  <MergeRequestsLayout layout="">
    <section className="px-8 pb-8 gap-8 flex flex-row flex-wrap">
      <article>
        <span className="block skeleton w-48 h-8 text-xl font-bold mb-4 mt-8"></span>
        <div className="flex flex-wrap gap-4">
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
        </div>
      </article>
      <article>
        <span className="block skeleton w-48 h-8 text-xl font-bold mb-4 mt-8"></span>
        <div className="flex flex-wrap gap-4">
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
        </div>
      </article>
    </section>
  </MergeRequestsLayout>
);
