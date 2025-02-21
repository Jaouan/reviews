import { ApiSettings } from "@/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MergeRequestsStore = ApiSettings & {
  save: (newApiSettings: Partial<ApiSettings>) => void;
};

export const useSettings = create<MergeRequestsStore>()(
  persist(
    (set) => ({
      tokens: {},
      endpoints: [],
      save: (newApiSettings) =>
        set((state) => ({
          endpoints:
            newApiSettings.endpoints?.filter((str) => str?.trim()) ??
            state.endpoints,
          tokens: newApiSettings.tokens ?? state.tokens,
        })),
    }),
    {
      name: "settings",
    }
  )
);
