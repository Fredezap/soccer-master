const checkNoSameTeams = ({ localTeam, visitorTeam, setCustomError }) => {
  const sameTeamError = 'Same team selected'
  if (localTeam === null || visitorTeam === null) {
    setCustomError(null)
    return
  }

  if (localTeam === visitorTeam) {
    setCustomError(sameTeamError)
    return
  }

  setCustomError(null)
}

export default checkNoSameTeams