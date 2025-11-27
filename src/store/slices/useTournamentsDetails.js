import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTournamentsDetails = create(persist(
  (set, get) => ({
    tournaments: [],
    currentTournament: {},
    isCreating: false,

    setTournaments: (tournaments) => {
      console.log('entro en set tournamenTS', tournaments)
      set({ tournaments })
    },

    updateTournaments: (updatedTournament) => {
      console.log('entro en update')
      set((state) => ({
        tournaments: state.tournaments.map((tournament) =>
          tournament.tournamentId === updatedTournament.tournamentId
            ? { ...tournament, ...updatedTournament }
            : tournament
        )
      }))
    },

    updateCurrentTournament: (updatedTournament) => {
      console.log('entro en update current')
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
      console.log('entro en set current')
      set({ currentTournament })
    },

    setIsCreating: (isCreating) => {
      set({ isCreating })
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