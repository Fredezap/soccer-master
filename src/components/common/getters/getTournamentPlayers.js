const GetTournamentPlayers = (currentTournament) => {
  let players = []
  if (!currentTournament) return players

  players = currentTournament?.Teams?.flatMap(team =>
    team.Players?.map(p => ({
      value: p.playerId, // ✅ lo que se envía al backend
      text: `${p.name} (${team.name})`, // ✅ lo que se muestra
      name: p.name,
      playerId: p.playerId,
      teamId: team.teamId,
      teamName: team.name
    }))
  )

  return players
}

export default GetTournamentPlayers