import { create } from "zustand/react";
import { fetchMergeRequests } from "../services/merge-requests-service";
import { ApiSettings, FetchError, logger, MergeRequest } from "@/shared";

type MergeRequestsResponse = {
  errors?: FetchError[];
  mergeRequests: MergeRequest[] | null;
};

type MergeRequestsStore = MergeRequestsResponse & {
  refresh: (apiSettings: ApiSettings) => Promise<void>;
};

export const useMergeRequests = create<MergeRequestsStore>((set) => ({
  mergeRequests: null,
  refresh: async (apiSettings: ApiSettings) => {
    try {
      set(await fetchMergeRequests(apiSettings));
    } catch (error) {
      logger.error("Error while fetching data:", error);
      set({ mergeRequests: [], errors: [{ cause: error }] });
    }
  },
}));
