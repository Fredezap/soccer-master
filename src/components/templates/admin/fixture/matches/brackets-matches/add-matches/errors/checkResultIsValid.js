const validateMatchResult = (matchResult, stage) => {
  let {
    localTeamScore,
    visitorTeamScore,
    localTeamPenaltyScore,
    visitorTeamPenaltyScore
  } = matchResult

  // Convertir '' a null
  if (localTeamScore === '') localTeamScore = null
  if (visitorTeamScore === '') visitorTeamScore = null
  if (localTeamPenaltyScore === '') localTeamPenaltyScore = null
  if (visitorTeamPenaltyScore === '') visitorTeamPenaltyScore = null

  // Detectar estado de scores
  const bothScoresEmpty = localTeamScore === null && visitorTeamScore === null
  const oneScoreEmpty = (localTeamScore === null && visitorTeamScore !== null) ||
                        (visitorTeamScore === null && localTeamScore !== null)

  if (oneScoreEmpty) {
    return {
      isValid: false,
      error: 'Both team scores must be provided or left empty.'
    }
  }

  // Si ambos están definidos, validar que sean números válidos
  if (!bothScoresEmpty) {
    if (
      typeof localTeamScore !== 'number' || isNaN(localTeamScore) || localTeamScore < 0 ||
      typeof visitorTeamScore !== 'number' || isNaN(visitorTeamScore) || visitorTeamScore < 0
    ) {
      return {
        isValid: false,
        error: 'Team scores must be non-negative numbers.'
      }
    }

    const isDraw = localTeamScore === visitorTeamScore && localTeamScore > 0

    const isDefined = val => val !== null && val !== undefined && val !== ''
    const anyPenaltyDefined = isDefined(localTeamPenaltyScore) || isDefined(visitorTeamPenaltyScore)

    // Si es empate y es knockout, deben estar los penales
    if (isDraw && !anyPenaltyDefined && stage === 'knockout') {
      return {
        isValid: false,
        error: 'If the match ends in a draw, penalty scores must be provided.'
      }
    }

    // Si se definieron penales, validarlos
    if (anyPenaltyDefined) {
      if (
        typeof localTeamPenaltyScore !== 'number' || localTeamPenaltyScore < 0 ||
        typeof visitorTeamPenaltyScore !== 'number' || visitorTeamPenaltyScore < 0
      ) {
        return {
          isValid: false,
          error: 'Penalty scores must be non-negative numbers.'
        }
      }

      if (localTeamPenaltyScore === visitorTeamPenaltyScore) {
        return {
          isValid: false,
          error: 'Penalty scores must not be equal.'
        }
      }
    }
  }

  return {
    isValid: true,
    error: null
  }
}

export default validateMatchResult