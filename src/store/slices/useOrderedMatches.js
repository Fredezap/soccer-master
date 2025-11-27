import { create } from 'zustand'

export const useOrderedMatches = create((set, get) => ({
  allMatchesByDate: [],
  nextMatch: [],
  upcomingMatches: [],
  finishedMatches: [],

  setAllMatchesByDate: (matches) => {
    set({ allMatchesByDate: matches })
  },

  setNextMatch: (match) => {
    set({ nextMatch: match })
  },

  setUpcomingMatches: (matches) => {
    set({ upcomingMatches: matches })
  },

  setFinishedMatches: (matches) => {
    set({ finishedMatches: matches })
  }
}))