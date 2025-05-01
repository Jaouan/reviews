import { twMerge } from "tailwind-merge";
import { ViewId, viewsDefinitions } from "../views/Views";
import { LinkWithQuery } from "@/components/router/LinkWithQuery";
import { PropsWithClassName } from "@/shared/react/PropsWithClassName";

export type DropViewSelectorProps = {
  currentView?: ViewId;
} & PropsWithClassName;
export const DropViewSelector = ({
  currentView,
  className,
}: DropViewSelectorProps) => (
  <div className={twMerge("dropdown dropdown-end", className)}>
    <div tabIndex={0} className="btn btn-sm join-item">
      {viewsDefinitions[currentView || ""]?.icon}
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-300 rounded-box z-1 w-36 p-2 shadow-sm"
    >
      {Object.entries(viewsDefinitions).map(([itemLayout, { label, icon }]) => (
        <li key={itemLayout}>
          <LinkWithQuery
            to={`/${itemLayout}`}
            onClick={() => {
              // Ensure the dropdown is closed
              (document.activeElement as HTMLElement)?.blur?.();
            }}
          >
            {icon}
            {label}
          </LinkWithQuery>
        </li>
      ))}
    </ul>
  </div>
);
