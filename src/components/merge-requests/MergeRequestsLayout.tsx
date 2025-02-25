import { useMergeRequests } from "@/stores";
import { JSX, PropsWithChildren } from "react";
import { BiGhost } from "react-icons/bi";
import { HiViewList } from "react-icons/hi";
import { TbLayoutGrid } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { SearchField } from "./search/SearchField";
import { FaRegUser } from "react-icons/fa";
import { LuFolderGit } from "react-icons/lu";
import { LiaJira } from "react-icons/lia";
import { LinkWithQuery } from "../router/LinkWithQuery";
import { PiWarningCircleBold } from "react-icons/pi";

export type Layout = "" | "by-issue" | "by-author" | "compact" | "list";

type JoinItemProps = {
  currentLayout?: Layout;
  itemLayout: Layout;
  icon: JSX.Element;
  tip: string;
};
const JoinItem = ({ currentLayout, itemLayout, tip, icon }: JoinItemProps) => (
  <LinkWithQuery to={`/${itemLayout}`}>
    <div className="tooltip tooltip-bottom" data-tip={tip}>
      <button
        className={twMerge(
          "btn btn-sm join-item",
          currentLayout === itemLayout && "btn-active"
        )}
      >
        {icon}
      </button>
    </div>
  </LinkWithQuery>
);

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
        <div className="join">
          <JoinItem
            icon={<LuFolderGit />}
            currentLayout={layout}
            itemLayout=""
            tip="By project"
          />
          <JoinItem
            icon={<LiaJira />}
            currentLayout={layout}
            itemLayout="by-issue"
            tip="By issue"
          />
          <JoinItem
            icon={<FaRegUser />}
            currentLayout={layout}
            itemLayout="by-author"
            tip="By author"
          />
          <JoinItem
            icon={<TbLayoutGrid />}
            currentLayout={layout}
            itemLayout="compact"
            tip="Condensed"
          />
          <JoinItem
            icon={<HiViewList />}
            currentLayout={layout}
            itemLayout="list"
            tip="List"
          />
        </div>
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
