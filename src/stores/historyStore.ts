import { create } from 'zustand';
import type { ChangeLogEntry } from '../types';

interface HistoryStore {
  entries: ChangeLogEntry[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  cursor: string | null;
  addEntry: (e: ChangeLogEntry) => void;
  appendEntries: (entries: ChangeLogEntry[]) => void;
  setEntries: (entries: ChangeLogEntry[]) => void;
  setLoading: (v: boolean) => void;
  setLoadingMore: (v: boolean) => void;
  setHasMore: (v: boolean) => void;
  setCursor: (cursor: string | null) => void;
  reset: () => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  entries: [],
  isLoading: false,
  isLoadingMore: false,
  hasMore: true,
  cursor: null,
  addEntry: (e) =>
    set((state) => {
      if (state.entries.some((entry) => entry.id === e.id)) return state
      const next = [e, ...state.entries]
      return { entries: next.slice(0, 1000) }
    }),
  appendEntries: (entries) =>
    set((state) => {
      if (entries.length === 0) return state;
      const existing = new Set(state.entries.map((e) => e.id));
      const next = entries.filter((e) => !existing.has(e.id));
      const merged = [...state.entries, ...next]
      return { entries: merged.slice(0, 1000) };
    }),
  setEntries: (entries) => set({ entries }),
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingMore: (isLoadingMore) => set({ isLoadingMore }),
  setHasMore: (hasMore) => set({ hasMore }),
  setCursor: (cursor) => set({ cursor }),
  reset: () =>
    set({
      entries: [],
      isLoading: false,
      isLoadingMore: false,
      hasMore: true,
      cursor: null,
    }),
}));
