const sortTeamsByStandings = (teams = []) => {
  return [...teams].sort((a, b) => {
    // Puntos
    if (b.TeamGroup.totalTeamPoints !== a.TeamGroup.totalTeamPoints) {
      return b.TeamGroup.totalTeamPoints - a.TeamGroup.totalTeamPoints
    }

    // Diferencia de gol
    if (b.TeamGroup.goalDifference !== a.TeamGroup.goalDifference) {
      return b.TeamGroup.goalDifference - a.TeamGroup.goalDifference
    }

    // Goles a favor
    if (b.TeamGroup.goalsFor !== a.TeamGroup.goalsFor) {
      return b.TeamGroup.goalsFor - a.TeamGroup.goalsFor
    }

    // Orden alfabético (fallback)
    return a.name.localeCompare(b.name)
  })
}

export default sortTeamsByStandings