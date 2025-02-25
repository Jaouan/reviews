import { getReadableDuration } from "@/shared/duration/duration";
import { useMergeRequests, useSettings } from "@/stores";
import { IoIosArrowDown } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

export type RefreshItemProps = {
  label?: string;
  duration: number | null;
};

export type RefreshButtonProps = {
  triggerRefresh: () => void;
};
export const RefreshButton = ({ triggerRefresh }: RefreshButtonProps) => {
  const refreshing = useMergeRequests(
    useShallow(({ refreshing }) => refreshing)
  );
  const { autoRefresh, save } = useSettings(
    useShallow(({ autoRefresh, save }) => ({ autoRefresh, save }))
  );

  const RefreshItem = ({ label, duration }: RefreshItemProps) => (
    <li>
      <button
        onClick={() => {
          save({ autoRefresh: duration });
          // Ensure the dropdown is closed
          (document.activeElement as HTMLElement)?.blur?.();
        }}
      >
        {label ?? getReadableDuration(duration)}
      </button>
    </li>
  );

  return (
    <div className="flex flex-nowrap">
      <div className="tooltip tooltip-bottom" data-tip="Refresh">
        <button
          className={twMerge(
            "px-2 btn btn-sm join-item rounded-r-[0]",
            refreshing && "bg-base-200!"
          )}
          onClick={triggerRefresh}
          disabled={refreshing}
        >
          <MdRefresh className={twMerge(refreshing && "animate-spin")} />
          {!!autoRefresh && (
            <span className="text-[0.6rem]">
              {getReadableDuration(autoRefresh)}
            </span>
          )}
        </button>
      </div>
      <div className={twMerge("dropdown dropdown-end")}>
        <button className={twMerge("btn btn-sm p-1 join-item rounded-l-[0]")}>
          <IoIosArrowDown className="text-[0.5rem]" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-300 rounded-box z-1 p-2 shadow-sm"
        >
          <RefreshItem label="off" duration={null} />
          <RefreshItem duration={15} />
          <RefreshItem duration={30} />
          <RefreshItem duration={60} />
        </ul>
      </div>
    </div>
  );
};
