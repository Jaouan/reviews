export const useSettingsModal = () => ({
  show: () => window.dispatchEvent(new CustomEvent("open-settings")),
});
