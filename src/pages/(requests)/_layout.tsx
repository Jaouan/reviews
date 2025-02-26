import { Error } from "@/components/layout/Error";
import { PageMessage } from "@/components/layout/PageMessage";
import { FetchErrorAlert } from "@/components/requests/error/FetchErrorAlert";
import { RefreshButton } from "@/components/requests/refresh/RefreshButton";
import { SearchField } from "@/components/requests/search/SearchField";
import { DropViewSelector } from "@/components/requests/views-selector/DropViewSelector";
import { ViewsSelector } from "@/components/requests/views-selector/ViewsSelector";
import { useSettingsModal } from "@/components/settings/useSettingsModel";
import { useRefreshRequests } from "@/hooks/useRefreshRequests";
import { logger } from "@/shared";
import { useSettings } from "@/stores";
import { BiGhost } from "react-icons/bi";
import { TbSettingsQuestion } from "react-icons/tb";
import { Outlet, useParams, useRouteError } from "react-router";
import { useShallow } from "zustand/shallow";

export const Catch = () => {
  const error = useRouteError();
  logger.error("Route error:", error);
  return <Error />;
};

export default function Layout() {
  const { view } = useParams();
  const { show } = useSettingsModal();
  const save = useSettings(useShallow(({ save }) => save));
  const { noEndpoints, errors, noMatch, triggerRefresh } =
    useRefreshRequests();

  const currentView = view ?? "by-project";

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

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 mx-4 flex flex-row gap-2 justify-end items-center">
        <SearchField />
        <ViewsSelector currentView={currentView} className="hidden sm:flex" />
        <DropViewSelector currentView={currentView} className="sm:hidden" />
        <RefreshButton triggerRefresh={triggerRefresh} />
      </div>
      <FetchErrorAlert errors={errors} />
      <Outlet />
      {noMatch && (
        <div className="flex flex-col justify-center items-center m-8 opacity-50">
          <BiGhost className="text-4xl animate-bounce" />
          <div>Nothing.</div>
        </div>
      )}
    </div>
  );
}
