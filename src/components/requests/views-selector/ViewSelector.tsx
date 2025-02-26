import { LinkWithQuery } from "@/components/router/LinkWithQuery";
import { JSX } from "react";
import { twMerge } from "tailwind-merge";
import { ViewId } from "../views/Views";

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
    <div className="tooltip tooltip-bottom" data-tip={label}>
      <button
        className={twMerge(
          "btn btn-sm join-item",
          currentView === itemView && "btn-active"
        )}
      >
        {icon}
      </button>
    </div>
  </LinkWithQuery>
);
