const handleAddMatchErrors = ({
  setCustomError,
  selectedGroup,
  localTeam,
  visitorTeam,
  locationAndDateformData,
  selectedGroupStage
}) => {
  const selectAGroupError = 'Please select a group'
  const selectATeamError = 'Please select both teams to maka a match'
  const selectADateError = 'Please select a date'
  const selectATimeError = 'Please select a time'
  const selectALocationError = 'Please select a location'
  const matchAlreadyExist = 'Match with these teams already exists. Do you want to add this match anyway?'

  if (selectedGroup === null) {
    setCustomError(selectAGroupError)
    return true
  }

  if (localTeam === null || visitorTeam === null) {
    setCustomError(selectATeamError)
    return true
  }

  if (locationAndDateformData.date === '') {
    setCustomError(selectADateError)
    return true
  }

  if (locationAndDateformData.time === '') {
    setCustomError(selectATimeError)
    return true
  }

  if (locationAndDateformData.location === '') {
    setCustomError(selectALocationError)
    return true
  }

  const checkIfMatchExist = selectedGroupStage?.Matches?.some(match =>
    (match.localTeamId === localTeam.teamId && match.visitorTeamId === visitorTeam.teamId) ||
      (match.localTeamId === visitorTeam.teamId && match.visitorTeamId === localTeam.teamId)
  )

  if (checkIfMatchExist) {
    setCustomError(matchAlreadyExist)
    return false
  }

  setCustomError(null)
  return false
}

export default handleAddMatchErrors