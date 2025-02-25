import { Error } from "@/components/layout/Error";
import { PageMessage } from "@/components/layout/PageMessage";
import { useSettingsModal } from "@/components/settings/useSettingsModel";
import { useRefreshMergeRequests } from "@/hooks/useRefreshMergeRequests";
import { useToastsErrors } from "@/hooks/useToastsErrors";
import { FetchError, KnownCause, logger } from "@/shared";
import { useSettings } from "@/stores";
import { LuPartyPopper } from "react-icons/lu";
import { TbSettingsQuestion, TbSettingsX } from "react-icons/tb";
import { Outlet, useRouteError } from "react-router";
import { useShallow } from "zustand/shallow";

export const Catch = () => {
  const error = useRouteError();
  logger.error("Route error:", error);
  return <Error />;
};

export default function Layout() {
  const { show } = useSettingsModal();
  const save = useSettings(useShallow(({ save }) => save));
  const { noEndpoints, errors, noMergeRequests } = useRefreshMergeRequests();
  useToastsErrors(errors);

  const addDemoEndpoints = () => {
    save({
      endpoints: ["/mock-api/v4/merge_requests"],
    });
  };

  if (noEndpoints) {
    return (
      <PageMessage icon={<TbSettingsQuestion />}>
        You haven't set up an endpoint yet.
        <div className="mt-2">
          Go to{" "}
          <button className="btn btn-sm btn-primary font-bold" onClick={show}>
            settings
          </button>{" "}
          to add one, or{" "}
          <button
            className="btn btn-sm btn-accent font-bold"
            onClick={addDemoEndpoints}
          >
            try out the demo
          </button>
        </div>
      </PageMessage>
    );
  }

  if (errors?.length && noMergeRequests) {
    const hasUnauthorized = errors.some(
      (error) => (error.cause as KnownCause)?.unauthorized
    );
    const tokensTips =
      hasUnauthorized &&
      JSON.stringify(
        errors
          .filter(
            (error) =>
              error.endpoint && (error.cause as KnownCause)?.unauthorized
          )
          .reduce((acc: Record<string, string>, error: FetchError) => {
            acc[error.endpoint ?? "unknown"] = "Bearer <TOKEN>";
            return acc;
          }, {}),
        null,
        2
      );
    return (
      <PageMessage icon={<TbSettingsX />}>
        You have no open merge requests...
        {hasUnauthorized ? (
          <div className="flex flex-col gap-2 alert alert-soft alert-error ">
            <div className="flex items-center gap-2">
              <span>
                ... but some endpoints seem to be unauthorized. Check your{" "}
                <button className="btn btn-outline btn-xs" onClick={show}>
                  settings
                </button>{" "}
                and try again.
              </span>
            </div>
            <div className="p-4 rounded-box font-mono whitespace-pre bg-base-100 max-w-[80vw] overflow-auto">
              {tokensTips}
            </div>
          </div>
        ) : (
          <div className="alert alert-soft alert-error">
            ... but some endpoints encountered errors.
          </div>
        )}
      </PageMessage>
    );
  }

  if (noMergeRequests) {
    return (
      <PageMessage icon={<LuPartyPopper />}>
        You have no open merge requests.
      </PageMessage>
    );
  }

  return <Outlet />;
}
