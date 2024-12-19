const formatBracketData = (stages, matches) => {
  let matchCounter = 1
  return Object.values(stages).map((stage) => {
    if (stage.type === 'group') return {}

    const stageMatches = matches?.filter((match) => match.stage.stageId === stage.stageId)

    return {
      title: stage.name,
      seeds: stageMatches.map((match) => ({
        id: match.matchId,
        matchNumber: matchCounter++,
        date: `${match.date} at ${match.time} - ${match.location}`,
        match: {
          ...match
        },
        teams: [
          {
            name: match.localTeam?.name || match.localTeamPlaceholder || null,
            score: match.localTeamScore
          },
          {
            name: match.visitorTeam?.name || match.visitorTeamPlaceholder || null,
            score: match.visitorTeamScore
          }
        ]
      }))
    }
  })
}

export default formatBracketData