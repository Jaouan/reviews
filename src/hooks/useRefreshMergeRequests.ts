import { useMergeRequests, useSettings } from "@/stores";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const useRefreshMergeRequests = () => {
  const { endpoints, overrideEndpoints, tokens } = useSettings(
    useShallow(({ endpoints, overrideEndpoints, tokens }) => ({
      endpoints,
      overrideEndpoints,
      tokens,
    }))
  );
  const { allMergeRequests, errors, refresh } = useMergeRequests(
    useShallow(({ allMergeRequests, errors, refresh }) => ({
      allMergeRequests,
      errors,
      refresh,
    }))
  );

  useEffect(() => {
    if (!endpoints) return;
    if (overrideEndpoints) return;
    refresh({
      endpoints,
      tokens,
    });
  }, [endpoints, tokens]);

  useEffect(() => {
    if (!overrideEndpoints) return;
    refresh({
      endpoints: overrideEndpoints,
      tokens,
    });
  }, [overrideEndpoints, tokens]);

  const noEndpoints = !endpoints.length;
  const noMergeRequests = allMergeRequests !== null && !allMergeRequests.length;

  return { noEndpoints, errors, noMergeRequests };
};
