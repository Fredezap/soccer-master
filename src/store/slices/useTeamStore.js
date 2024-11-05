import { create } from 'zustand'

export const useTeamStore = create((set, get) => ({
  team: {
    teamId: null,
    name: '',
    players: []
  },

  setTeam: (newTeam) => {
    set({ team: newTeam })
  },

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
      // TODO: Display a modal indicating the player is already in the list
      console.warn('El jugador ya está en la lista')
      return
    }

    set(state => ({
      team: { ...state.team, players: [...state.team.players, newPlayer] }
    }))
  }
}))