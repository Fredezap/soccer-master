import FinishedMatches from './FinishedMatches'
import NextMatch from './NextMatch'
import UpcomingMatches from './UpcomingMatches'

const MatchesGrid = ({ bgColor }) => {
  return (
    <div className={`site-section matches-section ${bgColor}`}>
      <div className="container">
        <NextMatch />
        <UpcomingMatches />
        <FinishedMatches />
      </div>
    </div>
  )
}

export default MatchesGrid