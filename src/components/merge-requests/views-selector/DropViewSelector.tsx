import { Layout } from "@/shared";
import { twMerge } from "tailwind-merge";
import { views } from "./Views";
import { LinkWithQuery } from "@/components/router/LinkWithQuery";
import { PropsWithClassName } from "@/shared/PropsWithClassName";

export type DropViewSelectorProps = {
  layout?: Layout;
} & PropsWithClassName;
export const DropViewSelector = ({
  layout,
  className,
}: DropViewSelectorProps) => (
  <div className={twMerge("dropdown dropdown-end", className)}>
    <button className={twMerge("btn btn-sm join-item")}>
      {views[layout || ""]?.icon}
    </button>
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
    >
      {Object.entries(views).map(([itemLayout, { label, icon }]) => (
        <li key={itemLayout}>
          <LinkWithQuery to={`/${itemLayout}`}>
            {icon}
            {label}
          </LinkWithQuery>
        </li>
      ))}
    </ul>
  </div>
);
