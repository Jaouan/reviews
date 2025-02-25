import { ViewSelector } from "./ViewSelector";
import { Layout } from "@/shared";
import { views } from "./Views";
import { PropsWithClassName } from "@/shared/PropsWithClassName";
import { twMerge } from "tailwind-merge";

export type ViewsSelectorProps = {
  layout?: Layout;
} & PropsWithClassName;
export const ViewsSelector = ({ layout, className }: ViewsSelectorProps) => (
  <div className={twMerge("join", className)}>
    {Object.entries(views).map(([itemLayout, { label, icon }]) => (
      <ViewSelector
        key={itemLayout}
        currentLayout={layout}
        itemLayout={itemLayout as Layout}
        label={label}
        icon={icon}
      />
    ))}
  </div>
);
