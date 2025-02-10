import checkIfKnockoutMatchExist from './checkIfKnockoutMatchExist'
import checkLocationLength from './checkLocationLength'
import checkLocationNotExist from './checkLocationNotExist'
import checkTimeNotExist from './checkTimeNotExist'
import checkTimeIsNotValid from './checkTimeIsNotValid'
import checkDateIsPast from './checkDateIsPast'
import checkDateNotValid from './checkDateNotValid'
import checkDateNotExist from './checkDateNotExist'
import checkSelectedStageNotExist from './checkSelectedStageNotExist'
import checkTeamsNotExist from './checkTeamsNotExist'
import checkSameTeamsSelected from './checkSameTeamsSelected'
import checkMaxLengthPlaceholderName from './checkMaxLengthPlaceholderName'

const useKnockoutMatchErrorManager = ({
  TEAM_STATUS,
  teamStatus,
  selectedStage,
  visitorTeam,
  localTeam,
  locationAndDateformData,
  rounds,
  setCustomError,
  localTeamPlaceholder,
  visitorTeamPlaceholder,
  action
}) => {
  const maxLengthNameError = 'Name must be at most 50 characters long'
  const placeholderNameIsRequiered = 'Placeholder name is required'
  const sameTeamPlaceholderError = 'Same team placeholder selected'
  const selectAStageError = 'Please select a stage'
  const selectATeamError = 'Please select both teams to maka a match'
  const sameTeamError = 'Same team selected'
  const selectADateError = 'Please select a date'
  const selectATimeError = 'Please select a time'
  const selectALocationError = 'Please select a location'
  const invalidDateFormaterror = 'Invalid date format'
  const dateIsPastError = 'Date cannot be in the past'
  const invalidTimeFormatError = 'Invalid time format'
  const invalidLocationLengthError = 'Location must be at least 3 characters long'
  const matchAlreadyExist = 'Match with these teams already exists. Do you want to add this match anyway?'
  const today = new Date()
  const date = new Date(locationAndDateformData.date)

  if (teamStatus === TEAM_STATUS.UNDEFINED) return

  if (checkSelectedStageNotExist(selectedStage)) {
    setCustomError(selectAStageError)
    return true
  }

  if (teamStatus === TEAM_STATUS.KNOWN) {
    if (checkTeamsNotExist(localTeam, visitorTeam)) {
      setCustomError(selectATeamError)
      return true
    }

    if (checkSameTeamsSelected(localTeam, visitorTeam)) {
      setCustomError(sameTeamError)
      return true
    }
  }

  if (teamStatus === TEAM_STATUS.UNKNOWN) {
    if (checkTeamsNotExist(localTeamPlaceholder, visitorTeamPlaceholder)) {
      setCustomError(placeholderNameIsRequiered)
      return true
    }

    if (checkSameTeamsSelected(localTeamPlaceholder, visitorTeamPlaceholder)) {
      setCustomError(sameTeamPlaceholderError)
      return true
    }

    if (checkMaxLengthPlaceholderName(localTeamPlaceholder, visitorTeamPlaceholder)) {
      setCustomError(maxLengthNameError)
      return true
    }
  }

  if (checkDateNotExist(locationAndDateformData.date)) {
    setCustomError(selectADateError)
    return true
  }

  if (checkDateNotValid(date)) {
    setCustomError(invalidDateFormaterror)
    return true
  }

  if (checkDateIsPast(date, today)) {
    if (action === 'edit') return false
    setCustomError(dateIsPastError)
    return true
  }

  if (checkTimeNotExist(locationAndDateformData.time)) {
    setCustomError(selectATimeError)
    return true
  }

  if (checkTimeIsNotValid(locationAndDateformData.time)) {
    setCustomError(invalidTimeFormatError)
    return true
  }

  if (checkLocationNotExist(locationAndDateformData.location)) {
    setCustomError(selectALocationError)
    return true
  }

  if (checkLocationLength(locationAndDateformData.location)) {
    setCustomError(invalidLocationLengthError)
    return true
  }

  if (teamStatus === TEAM_STATUS.KNOWN) {
    if (checkIfKnockoutMatchExist(rounds, localTeam, visitorTeam)) {
      setCustomError(matchAlreadyExist)
    }
  }
}

export default useKnockoutMatchErrorManager