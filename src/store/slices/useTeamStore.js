import { create } from 'zustand'

export const useTeamStore = create((set, get) => ({
  team: {
    teamId: null,
    name: '',
    players: [],
    logo: {
      reader: null,
      url: null,
      file: null
    }
  },

  setTeam: (newTeam) => {
    set({ team: newTeam })
  },

  setTeamLogo: (newLogoInfo) => set((state) => ({
    team: {
      ...state.team,
      logo: { ...state.team.logo, ...newLogoInfo }
    }
  })),

  deletePlayer: (playerIndex) => {
    set(state => {
      const updatedPlayers = state.team.players.filter((_, index) => index !== playerIndex)
      return {
        team: { ...state.team, players: updatedPlayers }
      }
    })
  },

  setTeamName: (name) => {
    set(state => ({
      team: { ...state.team, name }
    }))
  },

  setNewTeamPlayer: (name) => {
    const newPlayer = { name }
    const currentPlayers = get().team.players

    if (currentPlayers.some(player => player.name === newPlayer.name)) {
      return
    }

    set(state => ({
      team: { ...state.team, players: [...state.team.players, newPlayer] }
    }))
  }
}))