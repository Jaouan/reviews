import { JSX, PropsWithChildren } from "react";

export type PageMessageProps = {
  icon?: JSX.Element;
} & PropsWithChildren;
export const PageMessage = ({ icon, children }: PageMessageProps) => (
  <div className="flex flex-col gap-2 justify-center items-center h-[80vh] text-base-content text-[5rem]">
    {icon}
    <div className="ml-4 text-base-content/50 text-center text-base">
      {children}
    </div>
  </div>
);
