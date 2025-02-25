import { useMergeRequests } from "@/stores";
import { PropsWithChildren } from "react";
import { BiGhost } from "react-icons/bi";
import { SearchField } from "./search/SearchField";
import { PiWarningCircleBold } from "react-icons/pi";
import { Layout } from "@/shared";
import { ViewsSelector } from "./views-selector/ViewsSelector";
import { DropViewSelector } from "./views-selector/DropViewSelector";

export type MergeRequestsLayoutProps = {
  layout?: Layout;
} & PropsWithChildren;
export const MergeRequestsLayout = ({
  layout,
  children,
}: MergeRequestsLayoutProps) => {
  const { errors, mergeRequests } = useMergeRequests();
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 mx-4 flex flex-row gap-2 justify-end items-center">
        <SearchField />
        <ViewsSelector layout={layout} className="hidden sm:flex" />
        <DropViewSelector layout={layout} className="sm:hidden" />
      </div>
      {!!errors?.length && (
        <div className="mx-4 alert alert-soft alert-warning">
          <PiWarningCircleBold />
          Some endpoints encountered errors, merge requests may be missing.
        </div>
      )}
      {children}
      {mergeRequests && !mergeRequests.length && (
        <div className="flex flex-col justify-center items-center m-8 opacity-50">
          <BiGhost className="text-4xl animate-bounce" />
          <div>Nothing.</div>
        </div>
      )}
    </div>
  );
};
