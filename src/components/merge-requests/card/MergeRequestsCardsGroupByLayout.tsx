import { MergeRequestsCards } from "@/components/merge-requests/card/MergeRequestCards";
import {
  Layout,
  MergeRequestsLayout,
} from "@/components/merge-requests/MergeRequestsLayout";
import { groupBy, MergeRequest } from "@/shared";
import { useMergeRequests } from "@/stores";

export type MergeRequestsCardsGroupByLayoutProps = {
  layout: Layout;
  groupByKey: {
    [K in keyof MergeRequest]: MergeRequest[K] extends string ? K : never;
  }[keyof MergeRequest];
  groupClassName?: string;
  withProjectName?: boolean;
};
export const MergeRequestsCardsGroupByLayout = ({
  layout,
  groupByKey,
  groupClassName,
  withProjectName,
}: MergeRequestsCardsGroupByLayoutProps) => {
  const { mergeRequests } = useMergeRequests();
  const mergeRequestsByGroup = mergeRequests
    ? Object.entries(groupBy(mergeRequests, (mr) => mr[groupByKey]))
    : [];

  if (mergeRequests === null) return <Skeletons layout={layout} />;

  return (
    <MergeRequestsLayout layout={layout}>
      <section className="transition-all px-4 sm:px-8 pb-8 gap-8 flex flex-row flex-wrap">
        {mergeRequestsByGroup.map(([group, mergeRequests]) => (
          <MergeRequestsCards
            key={group}
            group={group}
            groupClassName={groupClassName}
            mergeRequests={mergeRequests}
            withProjectName={withProjectName}
          />
        ))}
      </section>
    </MergeRequestsLayout>
  );
};

const Skeletons = ({ layout }: { layout: Layout }) => (
  <MergeRequestsLayout layout={layout}>
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
