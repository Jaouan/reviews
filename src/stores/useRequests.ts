import { create } from "zustand/react";
import { fetchRequests } from "../services/requests-service";
import { ApiSettings, FetchError, logger, MergeRequest } from "@/shared";
import { luceneSearch } from "@/shared";

type RequestsResponse = {
  refreshing: boolean;
  errors?: FetchError[] | null;
  allRequests: MergeRequest[] | null;
  mergeRequests: MergeRequest[] | null;
  searchTerm: string | null;
};

type RefreshOptions = ApiSettings & { clear?: boolean };

type RequestsStore = RequestsResponse & {
  _currentRefreshId: number;
  refresh: (RefreshOptions: RefreshOptions) => Promise<void>;
  search: (term: string | null) => void;
};

export const useRequests = create<RequestsStore>((set, get) => ({
  _currentRefreshId: 0,
  refreshing: false,
  errors: null,
  allRequests: null,
  mergeRequests: null,
  searchTerm: null,
  search: (term: string | null) => {
    if (!term) {
      set((state) => ({
        searchTerm: null,
        mergeRequests: state.allRequests,
      }));
      return;
    }

    set((state) => ({
      searchTerm: term,
      mergeRequests: luceneSearch(term, state.allRequests ?? [], "title"),
    }));
  },
  refresh: async (refreshOptions: RefreshOptions) => {
    try {
      const currentRefreshId = get()._currentRefreshId + 1;
      set(
        refreshOptions.clear
          ? {
              allRequests: null,
              mergeRequests: null,
              errors: null,
              refreshing: true,
              _currentRefreshId: currentRefreshId,
            }
          : { refreshing: true, _currentRefreshId: currentRefreshId }
      );

      const { mergeRequests: allRequests, errors } = await fetchRequests(
        refreshOptions
      );

      // Abort if another refresh has started
      if (currentRefreshId !== get()._currentRefreshId) return;

      set({ refreshing: false, allRequests, errors });
      get().search(get().searchTerm);
    } catch (error) {
      logger.error("Error while fetching data:", error);
      set({
        allRequests: [],
        mergeRequests: [],
        errors: [{ cause: error }],
      });
    }
  },
}));
