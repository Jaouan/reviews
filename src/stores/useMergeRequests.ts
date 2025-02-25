import { create } from "zustand/react";
import { fetchMergeRequests } from "../services/merge-requests-service";
import { ApiSettings, FetchError, logger, MergeRequest } from "@/shared";
import { luceneSearch } from "@/shared";

type MergeRequestsResponse = {
  refreshing: boolean;
  errors?: FetchError[] | null;
  allMergeRequests: MergeRequest[] | null;
  mergeRequests: MergeRequest[] | null;
  searchTerm: string | null;
};

type RefreshOptions = ApiSettings & { clear?: boolean };

type MergeRequestsStore = MergeRequestsResponse & {
  _currentRefreshId: number;
  refresh: (RefreshOptions: RefreshOptions) => Promise<void>;
  search: (term: string) => void;
};

export const useMergeRequests = create<MergeRequestsStore>((set, get) => ({
  _currentRefreshId: 0,
  refreshing: false,
  errors: null,
  allMergeRequests: null,
  mergeRequests: null,
  searchTerm: null,
  search: (term: string) => {
    if (!term) {
      set((state) => ({
        searchTerm: null,
        mergeRequests: state.allMergeRequests,
      }));
      return;
    }

    set((state) => ({
      searchTerm: term,
      mergeRequests: luceneSearch(term, state.allMergeRequests ?? [], "title"),
    }));
  },
  refresh: async (refreshOptions: RefreshOptions) => {
    try {
      const currentRefreshId = get()._currentRefreshId + 1;
      set(
        refreshOptions.clear
          ? {
              allMergeRequests: null,
              mergeRequests: null,
              errors: null,
              refreshing: true,
              _currentRefreshId: currentRefreshId,
            }
          : { refreshing: true, _currentRefreshId: currentRefreshId }
      );

      const { mergeRequests: allMergeRequests, errors } =
        await fetchMergeRequests(refreshOptions);

      // Abort if another refresh has started
      if (currentRefreshId !== get()._currentRefreshId) return;

      set({ refreshing: false, allMergeRequests, errors });
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
