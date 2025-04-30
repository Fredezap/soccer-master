import { create } from 'zustand'

export const useSideMenuStore = create((set, get) => ({
  showTournamentList: false,
  showTournamentOptions: false,

  setShowTournamentLists: (showTournamentList) => {
    set({ showTournamentList })
  },

  setShowTournamentOptions: (showTournamentOptions) => {
    set({ showTournamentOptions })
  }
}))