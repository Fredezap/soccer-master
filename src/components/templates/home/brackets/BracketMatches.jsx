import { useEffect, useState } from 'react'
import formatBracketData from '../../admin/fixture/matches/brackets-matches/main/formatBracketData.js'
import transformMatches from '../../admin/fixture/matches/brackets-matches/main/transformMatches.js'
import BracketsForUsers from './BracketsForUsers.jsx'

const BracketMatches = ({ dbMatches, dbKnockoutStages }) => {
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    if (!dbMatches || !dbKnockoutStages) return

    const updatedFormattedMatches = transformMatches(dbMatches)
    const updatedRounds = formatBracketData(dbKnockoutStages, updatedFormattedMatches)

    setRounds(updatedRounds)
  }, [JSON.stringify(dbMatches), JSON.stringify(dbKnockoutStages)])

  if (!dbKnockoutStages || Object.keys(dbKnockoutStages).length === 0) return null

  return (
    <div className="brackets-component bg-dark">
      <h2>Brackets</h2>
      <BracketsForUsers rounds={rounds} />
    </div>
  )
}

export default BracketMatches