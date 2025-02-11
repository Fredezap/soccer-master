import FinishedMatches from './FinishedMatches'
import NextMatch from './NextMatch'
import UpcomingMatches from './UpcomingMatches'

const MatchesGrid = () => {
  return (
    <div className="site-section bg-dark">
      <div className="container">
        <NextMatch />
        <UpcomingMatches />
        <FinishedMatches />
      </div>
    </div>
  )
}

export default MatchesGrid