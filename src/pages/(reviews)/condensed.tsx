import { MergeRequestsCards } from "@/components/merge-requests/card/MergeRequestCards";
import { MergeRequestsLayout } from "@/components/merge-requests/MergeRequestsLayout";
import { useMergeRequests } from "@/stores";

export default function MergeRequestCardsPage() {
  const { mergeRequests } = useMergeRequests();

  if (mergeRequests === null) return <Skeletons />;

  return (
    <MergeRequestsLayout layout="condensed">
      <section className="px-8 pb-8 w-full">
        <MergeRequestsCards mergeRequests={mergeRequests} />
      </section>
    </MergeRequestsLayout>
  );
}

const Skeletons = () => (
  <MergeRequestsLayout layout="condensed">
    <section className="px-8 pb-8 gap-8 flex flex-row flex-wrap">
      <article>
        <div className="flex flex-wrap gap-4">
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
          <div className="skeleton w-96 h-28"></div>
        </div>
      </article>
    </section>
  </MergeRequestsLayout>
);
