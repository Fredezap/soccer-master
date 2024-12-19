import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTournamentsDetails = create(persist(
  (set, get) => ({
    tournaments: [],
    currentTournament: {},

    setTournaments: (tournaments) => {
      set({ tournaments })
    },

    updateCurrentTournament: (updatedTournament) => {
      set((state) => {
        const currentTournament = state.currentTournament.tournamentId === updatedTournament.tournamentId
          ? { ...state.currentTournament, ...updatedTournament }
          : state.currentTournament

        return {
          currentTournament
        }
      })
    },

    setCurrentTournament: (currentTournament) => {
      set({ currentTournament })
    }
  }),
  {
    name: 'tournaments-storage',
    partialize: (state) => ({
      tournaments: state.tournaments,
      currentTournament: state.currentTournament
    })
  }
))