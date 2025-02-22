import { create } from "zustand/react";
import { fetchMergeRequests } from "../services/merge-requests-service";
import { ApiSettings, FetchError, logger, MergeRequest } from "@/shared";
import { luceneSearch } from "@/shared";

type MergeRequestsResponse = {
  errors?: FetchError[] | null;
  allMergeRequests: MergeRequest[] | null;
  mergeRequests: MergeRequest[] | null;
  searchTerm: string | null;
};

type MergeRequestsStore = MergeRequestsResponse & {
  refresh: (apiSettings: ApiSettings) => Promise<void>;
  search: (term: string) => void;
};

export const useMergeRequests = create<MergeRequestsStore>((set, get) => ({
  errors: null,
  allMergeRequests: null,
  mergeRequests: null,
  searchTerm: null,
  search: (term: string) => {
    if (!term) {
      set((state) => ({
        mergeRequests: state.allMergeRequests,
      }));
      return;
    }

    set((state) => ({
      searchTerm: term,
      mergeRequests: luceneSearch(term, state.allMergeRequests ?? [], "title"),
    }));
  },
  refresh: async (apiSettings: ApiSettings) => {
    try {
      set({ allMergeRequests: null, mergeRequests: null, errors: null });

      const { mergeRequests: allMergeRequests, errors } =
        await fetchMergeRequests(apiSettings);

      set({ allMergeRequests, errors });
      get().search("");
    } catch (error) {
      logger.error("Error while fetching data:", error);
      set({
        allMergeRequests: [],
        mergeRequests: [],
        errors: [{ cause: error }],
      });
    }
  },
}));
