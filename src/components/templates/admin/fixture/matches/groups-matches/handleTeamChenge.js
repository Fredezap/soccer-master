const handleTeamChange = ({
  event,
  teamType,
  setVisitorTeam,
  setLocalTeam,
  dbGroups,
  showGroupMatchesDetail,
  selectedGroup,
  setCustomError
}) => {
  const teamId = event.target.value

  if (teamId === '') {
    if (teamType === 'local') {
      setLocalTeam(null)
      return
    }
    if (teamType === 'visitor') {
      setVisitorTeam(null)
      return
    }
  }

  const group = dbGroups[showGroupMatchesDetail]?.groups.find(
    (group) => group.groupId === selectedGroup.groupId
  )

  if (!group) {
    setCustomError('Group not found')
    return
  }

  const team = group.Teams.find((t) => t.teamId === parseInt(teamId))

  if (teamType === 'local') {
    setLocalTeam(team || null)
  } else if (teamType === 'visitor') {
    setVisitorTeam(team || null)
  }
}

export default handleTeamChange