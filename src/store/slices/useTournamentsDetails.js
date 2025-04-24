import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTournamentsDetails = create(persist(
  (set, get) => ({
    tournaments: [],
    currentTournament: {},

    setTournaments: (tournaments) => {
      set({ tournaments })
    },

    updateTournaments: (updatedTournament) => {
      set((state) => ({
        tournaments: state.tournaments.map((tournament) =>
          tournament.tournamentId === updatedTournament.tournamentId
            ? { ...tournament, ...updatedTournament }
            : tournament
        )
      }))
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