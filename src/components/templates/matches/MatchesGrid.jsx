import NextMatch from './NextMatch'
import UpcomingMatches from './UpcomingMatches'

const MatchesGrid = () => {
  return (
    <div className="site-section bg-dark">
      <div className="container">

        <div className="row mb-5">
          <NextMatch />
        </div>

        <UpcomingMatches />

      </div>
    </div>
  )
}

export default MatchesGrid