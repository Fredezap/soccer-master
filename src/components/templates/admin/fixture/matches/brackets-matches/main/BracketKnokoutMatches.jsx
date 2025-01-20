import { useEffect, useState } from 'react'
import AddKnockoutMatchMain from '../add-matches/AddKnockoutMatchMain'
import Brackets from '../brackets/Brackets'
import formatBracketData from './formatBracketData'
import transformMatches from './transformMatches'

const BracketKnokoutMatches = ({
  dbTeams,
  getMatches,
  dbMatches,
  dbKnockoutStages,
  getKnockoutStages
}) => {
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    const updatedFormattedMatches = transformMatches(dbMatches)
    const updatedRounds = formatBracketData(dbKnockoutStages, updatedFormattedMatches)
    setRounds(updatedRounds)
  }, [dbMatches, dbKnockoutStages])

  return (
    <div className="brackets-component">
      <h2>Tournament Bracket</h2>
      {Object.values(dbKnockoutStages)?.length === 0
        ? (
          <p>Please add knockout stages before adding matches</p>
        )
        : (
          <>
            <Brackets
              rounds={rounds}
              dbTeams={dbTeams}
              getMatches={getMatches}
              getKnockoutStages={getKnockoutStages}
            />
            <AddKnockoutMatchMain
              rounds={rounds}
              getMatches={getMatches}
              dbKnockoutStages={dbKnockoutStages}
              dbTeams={dbTeams}
              getKnockoutStages={getKnockoutStages}
            />
          </>
        )}
    </div>
  )
}

export default BracketKnokoutMatches