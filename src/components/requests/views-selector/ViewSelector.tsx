import { LinkWithQuery } from "@/components/router/LinkWithQuery";
import { JSX } from "react";
import { twMerge } from "tailwind-merge";
import { ViewId } from "../views/views-definitions";

export type ViewSelectorProps = {
  currentView?: ViewId;
  itemLayout: ViewId;
  icon: JSX.Element;
  label: string;
};
export const ViewSelector = ({
  currentView,
  itemLayout: itemView,
  label,
  icon,
}: ViewSelectorProps) => (
  <LinkWithQuery to={`/${itemView}`}>
    <div className="join-item tooltip tooltip-bottom" data-tip={label}>
      <button
        className={twMerge(
          "btn btn-sm rounded-[inherit]",
          currentView === itemView && "btn-active"
        )}
      >
        {icon}
      </button>
    </div>
  </LinkWithQuery>
);
