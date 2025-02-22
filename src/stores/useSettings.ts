import { ApiSettings, parseEndpointsFromQuery } from "@/shared";
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
          endpoints: newApiSettings.endpoints ?? state.endpoints,
          tokens: newApiSettings.tokens ?? state.tokens,
        })),
    }),
    {
      name: "settings",
    }
  )
);

const loadEndpointsFromQuery = () => {
  if (window.location.search) {
    const searchParams = new URLSearchParams(window.location.search);
    const endpoints = parseEndpointsFromQuery(searchParams.get("endpoints"));
    if (endpoints?.length) useSettings.setState({ endpoints });
  }
};
loadEndpointsFromQuery();
