import { JSX, PropsWithChildren } from "react";
import { HiViewList } from "react-icons/hi";
import { TbGridDots, TbLayoutGrid } from "react-icons/tb";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

type Layout = "" | "by-issue" | "condensed" | "list";

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
          "btn btn-xs join-item",
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
}: MergeRequestsLayoutProps) => (
  <div className="flex flex-col gap-4">
    <div className="mt-4 mx-4 join self-end">
      <JoinItem
        icon={<TbLayoutGrid />}
        currentLayout={layout}
        itemLayout=""
        tip="Group by project"
      />
      {/*<JoinItem
        icon={<FaJira />}
        currentLayout={layout}
        itemLayout="by-issue"
      />*/}
      <JoinItem
        icon={<TbGridDots />}
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
    {children}
  </div>
);
