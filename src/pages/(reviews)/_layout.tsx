import { Error } from "@/components/layout/Error";
import { logger } from "@/shared";
import { useMergeRequests, useSettings } from "@/stores";
import { useEffect } from "react";
import { LuPartyPopper } from "react-icons/lu";
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
  const { mergeRequests, errors, refresh } = useMergeRequests();

  useEffect(() => {
    refresh({
      endpoints,
      tokens,
    });
  }, [endpoints, tokens]);

  useEffect(() => {
    errors?.forEach((error) =>
      toast.error(`Unable to fetch ${error.endpoint ?? "endpoints"}`)
    );
  }, [errors]);

  const addDemoEndpoints = () => {
    save({
      endpoints: ["/mock-api/v4/merge_requests"],
    });
  };

  if (!endpoints.length) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen text-base-content">
        <LuPartyPopper className="text-[5rem]" />
        <p className="ml-4 text-base-content/50 text-center">
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
        </p>
      </div>
    );
  }

  if (mergeRequests !== null && !mergeRequests.length) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen text-base-content">
        <LuPartyPopper className="text-[5rem]" />
        <p className="ml-4 text-base-content/50 text-center">
          You have no open merge requests.
        </p>
      </div>
    );
  }
  return <Outlet />;
}
