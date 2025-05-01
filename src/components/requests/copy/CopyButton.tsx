import { LuClipboardCopy } from "react-icons/lu";
import { ViewId, viewsDefinitions } from "../views/Views";
import { useRequests } from "@/stores";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type CopyButtonProps = {
  currentView?: ViewId;
};
export const CopyButton = ({ currentView }: CopyButtonProps) => {
  const { mergeRequests } = useRequests();
  const [copied, setCopied] = useState(false);

  const copyRequests = () => {
    if (!mergeRequests?.length) return;
    const view =
      viewsDefinitions[currentView ?? "compact"] ?? viewsDefinitions.compact;

    navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([view.copyString(mergeRequests)], {
          type: "text/plain;charset=utf-8",
        }),
        "text/html": new Blob([view.copyHtml(mergeRequests)], {
          type: "text/html;charset=utf-8",
        }),
      }),
    ]);

    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    setTimeout(() => setCopied(false), 1000);
  }, [copied]);

  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip={copied ? "Copied!" : "Copy to clipboard"}
    >
      <button
        aria-label="copy"
        className={twMerge(
          "transition-all join-item btn btn-sm disabled:bg-base-200! disabled:opacity-75",
          copied && "border-base-content/50"
        )}
        onClick={copyRequests}
        disabled={!mergeRequests?.length}
      >
        <LuClipboardCopy />
      </button>
    </div>
  );
};
