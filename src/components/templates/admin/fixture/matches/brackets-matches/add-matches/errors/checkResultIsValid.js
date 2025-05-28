const validateMatchResult = (matchResult, stage) => {
  const {
    localTeamScore,
    visitorTeamScore,
    localTeamPenaltyScore,
    visitorTeamPenaltyScore
  } = matchResult

  // Validar que los scores principales no sean null, undefined, vacíos o negativos
  if (
    localTeamScore === null || localTeamScore === undefined || localTeamScore === '' || localTeamScore < 0 ||
      visitorTeamScore === null || visitorTeamScore === undefined || visitorTeamScore === '' || visitorTeamScore < 0
  ) {
    return {
      isValid: false,
      error: 'Team scores must be non-empty and non-negative.'
    }
  }

  const isDraw = localTeamScore === visitorTeamScore && localTeamScore > 0
  const penaltiesProvided = (
    localTeamPenaltyScore !== null && localTeamPenaltyScore !== undefined && localTeamPenaltyScore !== '' &&
      visitorTeamPenaltyScore !== null && visitorTeamPenaltyScore !== undefined && visitorTeamPenaltyScore !== ''
  )

  if (isDraw && !penaltiesProvided && stage === 'knockout') {
    return {
      isValid: false,
      error: 'If the match ends in a draw, penalty scores must be provided.'
    }
  }

  if (penaltiesProvided) {
    // Validar que los penales no sean negativos
    if (
      localTeamPenaltyScore < 0 || visitorTeamPenaltyScore < 0
    ) {
      return {
        isValid: false,
        error: 'Penalty scores must be non-negative.'
      }
    }

    // Penales no pueden ser iguales
    if (localTeamPenaltyScore === visitorTeamPenaltyScore) {
      return {
        isValid: false,
        error: 'Penalty scores must not be equal.'
      }
    }
  }

  return {
    isValid: true,
    error: null
  }
}

export default validateMatchResult