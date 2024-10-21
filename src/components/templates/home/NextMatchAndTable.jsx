import NextMatch from './NextMatch'
import TableScores from './TableScores'

const NextMatchAndTable = () => {
  return (
    <div className="site-section bg-dark">
      <div className="container">
        <div className="row">
          <NextMatch />
          <TableScores />
        </div>
      </div>
    </div>
  )
}

export default NextMatchAndTable