import formatDate from '../../../../../../common/formatDate'
import formatTime from '../../../../../../common/formatTime'

const transformMatches = (dbMatches) => {
  const result = []

  for (const [date, matches] of Object.entries(dbMatches)) {
    matches.forEach((match) => {
      result.push({
        matchId: match.matchId,
        stage: match.stage,
        localTeam: match.localTeam,
        visitorTeam: match.visitorTeam,
        date: formatDate(match.date).slashDate,
        time: formatTime(match.time),
        location: match.location,
        localTeamScore: match.localTeamScore,
        visitorTeamScore: match.visitorTeamScore,
        localTeamPlaceholder: match.localTeamPlaceholder,
        visitorTeamPlaceholder: match.visitorTeamPlaceholder
      })
    })
  }

  return result
}

export default transformMatches