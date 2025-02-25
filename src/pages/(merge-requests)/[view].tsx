import { Navigate, useParams } from "react-router";
import { useMergeRequests } from "@/stores";
import { viewsDefinitions } from "@/components/merge-requests/views/Views";
import { PageMessage } from "@/components/layout/PageMessage";
import { LuPartyPopper } from "react-icons/lu";

export default function ViewPage() {
  const { view } = useParams();
  const { mergeRequests, allMergeRequests } = useMergeRequests();
  const noMergeRequests = allMergeRequests?.length === 0;
  const viewElement = viewsDefinitions[view as string];

  if (!viewElement) return <Navigate to="/by-project" replace />;

  if (mergeRequests === null) return viewElement.skeleton();

  if (noMergeRequests) {
    return (
      <PageMessage icon={<LuPartyPopper />}>
        You have no open merge requests.
      </PageMessage>
    );
  }

  return viewElement.element();
}
