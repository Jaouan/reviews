import { useMergeRequests } from "@/stores";
import { JSX, PropsWithChildren } from "react";
import { BiGhost } from "react-icons/bi";
import { HiViewList } from "react-icons/hi";
import { TbLayoutGrid } from "react-icons/tb";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import { SearchField } from "./search/SearchField";
import { FaRegUser } from "react-icons/fa";
import { LuFolderGit } from "react-icons/lu";
import { LiaJira } from "react-icons/lia";

export type Layout = "" | "by-issue" | "by-author" | "condensed" | "list";

type JoinItemProps = {
  currentLayout?: Layout;
  itemLayout: Layout;
  icon: JSX.Element;
  tip: string;
};
const JoinItem = ({ currentLayout, itemLayout, tip, icon }: JoinItemProps) => (
  <Link to={`/${itemLayout}`}>
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
  </Link>
);

export type MergeRequestsLayoutProps = {
  layout?: Layout;
} & PropsWithChildren;
export const MergeRequestsLayout = ({
  layout,
  children,
}: MergeRequestsLayoutProps) => {
  const { mergeRequests } = useMergeRequests();
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
            itemLayout="condensed"
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
