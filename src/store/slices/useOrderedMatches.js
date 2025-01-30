import { create } from 'zustand'

export const useOrderedMatches = create((set, get) => ({
  matchesByDate: [],

  setMatchesByDate: (matches) => {
    console.log('MATCHES: ', matches)
    set({ matchesByDate: matches })
  }
}))