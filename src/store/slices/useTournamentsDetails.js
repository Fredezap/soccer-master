import { create } from 'zustand'

export const useTournamentsDetails = create((set, get) => ({
  tournaments: [],
  currentTournament: [],

  setTournaments: (tournaments) => {
    set({ tournaments })
  },

  setCurrentTournament: (currentTournament) => {
    set({ currentTournament })
  }
}))