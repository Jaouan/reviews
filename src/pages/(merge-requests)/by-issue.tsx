import { MergeRequestsCardsGroupByLayout } from "@/components/merge-requests/card/MergeRequestsCardsGroupByLayout";

export default function MergeRequestCardsPage() {
  return (
    <MergeRequestsCardsGroupByLayout
      layout="by-issue"
      groupByKey="issue"
      withProjectName
    />
  );
}
