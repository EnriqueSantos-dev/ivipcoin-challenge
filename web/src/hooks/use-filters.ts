import { create } from "zustand";

type FiltersData = {
  page: number;
  limit: number;
  search: string;
};

type FiltersState = FiltersData & {
  actions: {
    setFilters: (data: Partial<FiltersData>) => void;
  };
};

const DEFAULT_FILTERS = {
  search: "",
  page: 1,
  limit: 5,
} as const;

const FiltersStore = create<FiltersState>((set) => ({
  ...DEFAULT_FILTERS,
  actions: {
    setFilters: (data) => set((state) => ({ ...state, ...data })),
  },
}));

export const useFilters = FiltersStore;
export const useFiltersActions = () => FiltersStore.getState().actions;
