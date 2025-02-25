import { useMergeRequests, useSettings } from "@/stores";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const useRefreshMergeRequests = () => {
  const { endpoints, overrideEndpoints, tokens, autoRefresh } = useSettings(
    useShallow(({ endpoints, overrideEndpoints, tokens, autoRefresh }) => ({
      endpoints,
      overrideEndpoints,
      tokens,
      autoRefresh,
    }))
  );
  const { allMergeRequests, mergeRequests, errors, refresh } = useMergeRequests(
    useShallow(({ allMergeRequests, mergeRequests, errors, refresh }) => ({
      allMergeRequests,
      mergeRequests,
      errors,
      refresh,
    }))
  );
  const [currentEndpoints, setCurrentEndpoints] = useState(
    overrideEndpoints ?? endpoints
  );

  const triggerRefresh = () => {
    refresh({
      endpoints: currentEndpoints,
      tokens,
      clear: false,
    });
  };

  useEffect(() => {
    if (!endpoints) return;
    if (overrideEndpoints) return;
    setCurrentEndpoints(endpoints);
  }, [endpoints, overrideEndpoints, tokens]);

  useEffect(() => {
    if (!currentEndpoints?.length) return;
    triggerRefresh();
  }, [currentEndpoints, tokens]);

  useEffect(() => {
    if (autoRefresh && autoRefresh > 0) {
      const interval = setInterval(triggerRefresh, autoRefresh * 60_000);
      return () => clearInterval(interval);
    }
  }, [currentEndpoints, tokens, autoRefresh]);

  const noEndpoints = !endpoints.length;
  const noMatch = !!(allMergeRequests?.length && !mergeRequests?.length);

  return { noEndpoints, errors, noMatch, triggerRefresh };
};
