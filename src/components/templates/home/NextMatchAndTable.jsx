import NextMatch from '../matches/NextMatch'
import TableScores from './TableScores'

const NextMatchAndTable = () => {
  return (
    <div className="site-section bg-dark">
      <div className="container">
        <NextMatch />
        <TableScores />
      </div>
    </div>
  )
}

export default NextMatchAndTable