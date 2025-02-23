import { Error } from "@/components/layout/Error";
import { PageMessage } from "@/components/layout/PageMessage";
import { logger } from "@/shared";
import { useMergeRequests, useSettings } from "@/stores";
import { useEffect } from "react";
import { LuPartyPopper } from "react-icons/lu";
import { TbSettingsQuestion, TbSettingsX } from "react-icons/tb";
import { Outlet, useRouteError } from "react-router";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

export const Catch = () => {
  const error = useRouteError();
  logger.error("Route error:", error);
  return <Error />;
};

export const Pending = () => <></>;

export default function Layout() {
  const { endpoints, tokens, save } = useSettings();
  const { allMergeRequests, errors, refresh } = useMergeRequests(
    useShallow(({ allMergeRequests, errors, refresh }) => ({
      allMergeRequests,
      errors,
      refresh,
    }))
  );

  useEffect(() => {
    refresh({
      endpoints,
      tokens,
    });
  }, [endpoints, tokens]);

  useEffect(() => {
    errors?.forEach((error) =>
      toast.error(`Unable to fetch ${error.endpoint ?? "endpoint"}`)
    );
  }, [errors]);

  const addDemoEndpoints = () => {
    save({
      endpoints: ["/mock-api/v4/merge_requests"],
    });
  };

  if (!endpoints.length) {
    return (
      <PageMessage icon={<TbSettingsQuestion />}>
        You have no endpoints configured.
        <div className="mt-2">
          Go to <strong>settings</strong> to add one or{" "}
          <button
            className="btn btn-sm btn-primary"
            onClick={() => addDemoEndpoints()}
          >
            <strong>try the demo</strong>
          </button>
        </div>
      </PageMessage>
    );
  }

  if (errors?.length && !allMergeRequests?.length) {
    return (
      <PageMessage icon={<TbSettingsX />}>
        You have no open merge requests, but some endpoints encountered errors.
      </PageMessage>
    );
  }

  if (allMergeRequests !== null && !allMergeRequests.length) {
    return (
      <PageMessage icon={<LuPartyPopper />}>
        You have no open merge requests.
      </PageMessage>
    );
  }

  return <Outlet />;
}
