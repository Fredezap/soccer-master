const checkTeamsNotExist = (localTeam, visitorTeam) => {
  if (localTeam === null || visitorTeam === null) return true
  if (localTeam === undefined || visitorTeam === undefined) return true
  if (localTeam === '' || visitorTeam === '') return true
}

export default checkTeamsNotExist