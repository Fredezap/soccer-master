import { useEffect, useState } from 'react'
import NextMatch from '../../matches/NextMatch'
import TableScores from './TableScores'

const NextMatchAndTable = ({ dbKnockoutStages, sectionBg }) => {
  const [childrenComponentBg, setChildrenComponentBg] = useState('bg-dark')

  useEffect(() => {
    if (dbKnockoutStages && Object.values(dbKnockoutStages)?.length > 0) {
      setChildrenComponentBg('bg-light')
    } else {
      setChildrenComponentBg('bg-dark')
    }
  }, [dbKnockoutStages])

  return (
    <div className={`site-section ${sectionBg.matchesBg}`}>
      <div className="container">
        <NextMatch backgroundStyle={childrenComponentBg} />
        <TableScores backgroundStyle={childrenComponentBg} />
      </div>
    </div>
  )
}

export default NextMatchAndTable