import { ApiSettings, parseEndpointsFromQuery } from "@/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RequestsStore = ApiSettings & {
  autoRefresh: number | null;
  overrideEndpoints?: string[] | null;
  save: (newSettings: Partial<RequestsStore>) => void;
};

export const useSettings = create<RequestsStore>()(
  persist(
    (set) => ({
      autoRefresh: null,
      tokens: {},
      endpoints: [],
      overrideEndpoints: null,
      save: ({ autoRefresh, endpoints, overrideEndpoints, tokens }) =>
        set((state) => ({
          endpoints: endpoints ?? state.endpoints,
          tokens: tokens ?? state.tokens,
          overrideEndpoints:
            overrideEndpoints === undefined
              ? state.overrideEndpoints
              : overrideEndpoints,
          autoRefresh:
            autoRefresh === undefined ? state.autoRefresh : autoRefresh,
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
