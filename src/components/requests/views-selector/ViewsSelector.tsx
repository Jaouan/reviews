import { ViewSelector } from "./ViewSelector";
import { PropsWithClassName } from "@/shared/react/PropsWithClassName";
import { twMerge } from "tailwind-merge";
import { ViewId, viewsDefinitions } from "../views/Views";

export type ViewsSelectorProps = {
  currentView?: ViewId;
} & PropsWithClassName;
export const ViewsSelector = ({
  currentView,
  className,
}: ViewsSelectorProps) => (
  <div className={twMerge("join", className)}>
    {Object.entries(viewsDefinitions).map(([itemLayout, { label, icon }]) => (
      <ViewSelector
        key={itemLayout}
        currentView={currentView}
        itemLayout={itemLayout as ViewId}
        label={label}
        icon={icon}
      />
    ))}
  </div>
);
