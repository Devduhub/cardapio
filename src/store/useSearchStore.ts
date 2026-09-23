import { create } from "zustand";

interface SearchState {
  isOpen: boolean;
  searchQuery: string;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  searchQuery: "",
  openSearch: (initialQuery = "") => set({ isOpen: true, searchQuery: initialQuery }),
  closeSearch: () => set({ isOpen: false, searchQuery: "" }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
