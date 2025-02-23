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
      <section className="transition-all px-4 sm:px-8 pb-8 gap-8 flex flex-row flex-wrap">
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
    <section className="transition-all px-4 sm:px-8 pb-8 gap-8 w-full flex flex-row flex-wrap">
      <article className="w-full">
        <div className="skeleton w-48 h-8 mb-4"></div>
        <div className="flex flex-wrap gap-4">
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
        </div>
      </article>
      <article className="w-full">
        <div className="skeleton w-48 h-8 mb-4"></div>
        <div className="flex flex-wrap gap-4">
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
        </div>
      </article>
    </section>
  </MergeRequestsLayout>
);
