import { useSettingsModal } from "@/components/settings/useSettingsModel";
import { TbSettings } from "react-icons/tb";

export const SettingsButton = () => {
  const { show } = useSettingsModal();
  return (
    <div className="tooltip tooltip-bottom" data-tip={"Settings"}>
      <button
        aria-label="settings"
        className="btn btn-circle btn-ghost"
        onClick={show}
      >
        <TbSettings className="text-2xl" />
      </button>
    </div>
  );
};
