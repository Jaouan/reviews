import { MergeRequestsLayout } from "@/components/merge-requests/MergeRequestsLayout";
import { MergeRequestsList } from "@/components/merge-requests/list/MergeRequestsList";
import { useMergeRequests } from "@/stores";

export default function MergeRequestCardsPage() {
  const { mergeRequests } = useMergeRequests();

  if (mergeRequests === null) return <Skeletons />;

  return (
    <MergeRequestsLayout layout="list">
      <section className="px-8 pb-8">
        <MergeRequestsList mergeRequests={mergeRequests} />
      </section>
    </MergeRequestsLayout>
  );
}

const Skeletons = () => (
  <MergeRequestsLayout layout="list">
    <section className="px-8 pb-8 my-1">
      <ul className="flex flex-col gap-2">
        <li className="skeleton w-full h-20"></li>
        <li className="skeleton w-full h-20"></li>
        <li className="skeleton w-full h-20"></li>
        <li className="skeleton w-full h-20"></li>
        <li className="skeleton w-full h-20"></li>
        <li className="skeleton w-full h-20"></li>
      </ul>
    </section>
  </MergeRequestsLayout>
);
