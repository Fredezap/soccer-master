import NextMatch from './NextMatch'
import UpcomingMatches from './UpcomingMatches'

const MatchesGrid = () => {
  return (
    <div className="site-section bg-dark">
      <div className="container">
        <NextMatch />
        <UpcomingMatches />
      </div>
    </div>
  )
}

export default MatchesGrid