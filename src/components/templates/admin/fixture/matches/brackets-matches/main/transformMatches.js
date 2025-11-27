import formatDate from '../../../../../../common/formatDate'
import formatTime from '../../../../../../common/formatTime'

const transformMatches = (dbMatches) => {
  const result = []
  for (const [date, matches] of Object.entries(dbMatches)) {
    matches.forEach((match) => {
      result.push({
        matchId: match.matchId,
        stage: match.Stage,
        localTeam: match.LocalTeam,
        visitorTeam: match.VisitorTeam,
        date: formatDate(match.date).slashDate,
        time: formatTime(match.time),
        location: match.location,
        localTeamScore: match.localTeamScore,
        visitorTeamScore: match.visitorTeamScore,
        localTeamPenaltyScore: match.localTeamPenaltyScore,
        visitorTeamPenaltyScore: match.visitorTeamPenaltyScore,
        localTeamPlaceholder: match.localTeamPlaceholder,
        visitorTeamPlaceholder: match.visitorTeamPlaceholder
      })
    })
  }

  const sortedMatches = result.sort((a, b) => a.matchId - b.matchId)

  return sortedMatches
}

export default transformMatches