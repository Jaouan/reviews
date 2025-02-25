import { MergeRequestsCards } from "@/components/merge-requests/card/MergeRequestCards";
import { MergeRequestsLayout } from "@/components/merge-requests/MergeRequestsLayout";
import { useMergeRequests } from "@/stores";

export default function MergeRequestCardsPage() {
  const { mergeRequests } = useMergeRequests();

  if (mergeRequests === null) return <Skeletons />;

  return (
    <MergeRequestsLayout layout="compact">
      <section className="transition-all px-4 sm:px-8 pb-8">
        <MergeRequestsCards mergeRequests={mergeRequests} />
      </section>
    </MergeRequestsLayout>
  );
}

const Skeletons = () => (
  <MergeRequestsLayout layout="compact">
    <section className="transition-all px-4 sm:px-8 pb-8">
      <article>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
          <div className="transition-all skeleton w-full sm:w-96 h-28"></div>
        </div>
      </article>
    </section>
  </MergeRequestsLayout>
);
