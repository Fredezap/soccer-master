import { create } from 'zustand'

export const useOrderedMatches = create((set, get) => ({
  matchesByDate: [],

  setMatchesByDate: (matches) => {
    set({ matchesByDate: matches })
  }
}))