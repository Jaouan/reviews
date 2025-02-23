import { ApiSettings, parseEndpointsFromQuery } from "@/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MergeRequestsStore = ApiSettings & {
  overrideEndpoints?: string[] | null;
  save: (newSettings: Partial<MergeRequestsStore>) => void;
};

export const useSettings = create<MergeRequestsStore>()(
  persist(
    (set) => ({
      tokens: {},
      endpoints: [],
      overrideEndpoints: null,
      save: ({ endpoints, overrideEndpoints, tokens }) =>
        set((state) => ({
          endpoints: endpoints ?? state.endpoints,
          tokens: tokens ?? state.tokens,
          overrideEndpoints:
            overrideEndpoints === undefined
              ? state.overrideEndpoints
              : overrideEndpoints,
        })),
    }),
    {
      name: "settings",
      partialize: (state) => {
        // Do not persist overrideEndpoints.
        const { overrideEndpoints: _, ...rest } = state;
        return rest;
      },
    }
  )
);

const loadOverrideEndpointsFromQuery = () => {
  if (window.location.search) {
    const searchParams = new URLSearchParams(window.location.search);
    const overrideEndpoints = parseEndpointsFromQuery(
      searchParams.get("endpoints")
    );
    if (overrideEndpoints?.length) useSettings.setState({ overrideEndpoints });
  }
};
loadOverrideEndpointsFromQuery();
