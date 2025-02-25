import { LinkWithQuery } from "@/components/router/LinkWithQuery";
import { Layout } from "@/shared";
import { JSX } from "react";
import { twMerge } from "tailwind-merge";

export type ViewSelectorProps = {
  currentLayout?: Layout;
  itemLayout: Layout;
  icon: JSX.Element;
  label: string;
};
export const ViewSelector = ({
  currentLayout,
  itemLayout,
  label,
  icon,
}: ViewSelectorProps) => (
  <LinkWithQuery to={`/${itemLayout}`}>
    <div className="tooltip tooltip-bottom" data-tip={label}>
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
