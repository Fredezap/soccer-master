import checkDateIsPast from '../brackets-matches/add-matches/errors/checkDateIsPast'
import checkDateNotExist from '../brackets-matches/add-matches/errors/checkDateNotExist'
import checkDateNotValid from '../brackets-matches/add-matches/errors/checkDateNotValid'

const handleAddMatchErrors = ({
  setCustomError,
  selectedGroup,
  localTeam,
  visitorTeam,
  locationAndDateformData,
  selectedGroupStage,
  formAction
}) => {
  const selectAGroupError = 'Please select a group'
  const selectATeamError = 'Please select both teams to maka a match'
  const selectADateError = 'Please select a date'
  const selectATimeError = 'Please select a time'
  const selectALocationError = 'Please select a location'
  const invalidLocationLength = 'Location must be at least 3 characters long'
  const matchAlreadyExist = 'Match with these teams already exists. Do you want to add this match anyway?'
  const invalidDateFormaterror = 'Invalid date format'
  const dateIsPastError = 'Date cannot be in the past'
  const sameTeamError = 'Same team selected'
  const noTeamsSelected = 'Please select the teams'

  if (localTeam === null || visitorTeam === null) {
    setCustomError(noTeamsSelected)
    return true
  }

  if (localTeam.teamId === visitorTeam.teamId) {
    setCustomError(sameTeamError)
    return true
  }

  if (selectedGroup === null) {
    setCustomError(selectAGroupError)
    return true
  }

  if (localTeam === null || visitorTeam === null) {
    setCustomError(selectATeamError)
    return true
  }

  const today = new Date()
  const date = new Date(locationAndDateformData.date)
  if (checkDateNotExist(locationAndDateformData.date)) {
    setCustomError(selectADateError)
    return true
  }

  if (checkDateNotValid(date)) {
    setCustomError(invalidDateFormaterror)
    return true
  }

  if (checkDateIsPast(date, today)) {
    if (formAction === 'edit') return false
    setCustomError(dateIsPastError)
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

  if (locationAndDateformData.location.length < 3) {
    setCustomError(invalidLocationLength)
    return true
  }

  const matchingMatches = selectedGroupStage?.Matches?.filter(match =>
    (match.localTeamId === localTeam.teamId && match.visitorTeamId === visitorTeam.teamId) ||
    (match.localTeamId === visitorTeam.teamId && match.visitorTeamId === localTeam.teamId)
  )

  if ((matchingMatches.length > 0 && formAction === 'create') ||
  (matchingMatches.length > 1)) {
    setCustomError(matchAlreadyExist)
    return false
  }
}

export default handleAddMatchErrors