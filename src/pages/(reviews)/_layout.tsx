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
  const { endpoints, tokens } = useSettings(
    useShallow((state) => ({
      endpoints: state.endpoints,
      tokens: state.tokens,
    }))
  );
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

  if (mergeRequests !== null && !mergeRequests.length) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen text-base-content">
        <LuPartyPopper className="text-[5rem]" />
        <p className="ml-4 text-base-content/50">
          You have no open merge requests.
        </p>
      </div>
    );
  }
  return <Outlet />;
}
