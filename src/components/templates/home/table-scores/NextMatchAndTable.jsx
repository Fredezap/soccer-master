import { useEffect, useState } from 'react'
import NextMatch from '../../matches/NextMatch'
import TableScores from './TableScores'

const NextMatchAndTable = ({ dbKnockoutStages }) => {
  const [parentComponentBg, setPparentComponentBg] = useState('bg-light')
  const [childrenComponentBg, setChildrenComponentBg] = useState('bg-dark')

  useEffect(() => {
    if (dbKnockoutStages && Object.values(dbKnockoutStages)?.length > 0) {
      setPparentComponentBg('bg-light')
      setChildrenComponentBg('bg-dark')
    } else {
      setPparentComponentBg('bg-dark')
      setChildrenComponentBg('bg-light')
    }
  }, [dbKnockoutStages])

  return (
    <div className={`site-section ${parentComponentBg}`}>
      <div className="container">
        <NextMatch backgroundStyle={childrenComponentBg} />
        <TableScores backgroundStyle={childrenComponentBg} />
      </div>
    </div>
  )
}

export default NextMatchAndTable