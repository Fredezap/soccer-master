import { Bracket } from 'react-brackets'

const BracketComponent = ({ stages, matches }) => {
  const formatBracketData = (stages, matches) => {
    return stages.map(stage => {
      // console.log('type: ', stage.type)
      if (stage.type === 'group') return {}

      const stageMatches = matches?.filter(match => match.stageId === stage.stageId)

      return {
        title: stage.name,
        seeds: stageMatches.map((match, index) => ({
          id: `${stage.stageId}-match-${index}`,
          date: new Date().toDateString(),
          teams: [{ name: match.team1 }, { name: match.team2 }]
        }))
      }
    })
  }

  const customStages = stages.filter(stage => stage.type === 'knockout')
  const rounds = formatBracketData(customStages, matches)

  return (
    <div className="brackets-component">
      <h2>Tournament Bracket</h2>
      {Array.isArray(rounds) && rounds.length > 0
        ? (
          <Bracket rounds={rounds} />
        )
        : (
          <p>No bracket data available</p>
        )}
    </div>
  )
}

export default BracketComponent