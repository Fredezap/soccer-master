import { useEffect, useState } from 'react'
import formatBracketData from '../../admin/fixture/matches/brackets-matches/main/formatBracketData.js'
import transformMatches from '../../admin/fixture/matches/brackets-matches/main/transformMatches.js'
import BracketsForUsers from './BracketsForUsers.jsx'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails.js'

const BracketMatches = ({ sectionBg, dbMatches, dbKnockoutStages }) => {
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    if (!dbMatches || !dbKnockoutStages) return

    const updatedFormattedMatches = transformMatches(dbMatches)
    const updatedRounds = formatBracketData(dbKnockoutStages, updatedFormattedMatches)

    setRounds(updatedRounds)
  }, [JSON.stringify(dbMatches), JSON.stringify(dbKnockoutStages)])

  if (!dbKnockoutStages || Object.keys(dbKnockoutStages).length === 0) return null

  return (
    <div className={`brackets-component ${sectionBg.bracketsBg}`}>
      {/* <h2>Brackets</h2> */}
      <h2>Turnierbaum</h2>
      <BracketsForUsers rounds={rounds} />
    </div>
  )
}

export default BracketMatches