import { ApiSettings } from "@/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MergeRequestsStore = ApiSettings & {
  save: (newApiSettings: ApiSettings) => void;
};

export const useSettings = create<MergeRequestsStore>()(
  persist(
    (set) => ({
      tokens: {},
      endpoints: [],
      save: (newApiSettings) => set(newApiSettings),
    }),
    {
      name: "settings",
    }
  )
);
