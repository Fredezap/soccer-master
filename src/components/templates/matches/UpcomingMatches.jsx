import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'
import logoGetter from '../../common/logo-getter/logoGetter'
import MatchExtraInfo from './MatchExtraInfo'

const UpcomingMatches = () => {
  const { upcomingMatches } = useOrderedMatches()

  const getLogo = (team, isLocalTeam) => {
    return logoGetter(team, isLocalTeam)
  }

  return (
    <div style={{ marginTop: '60px' }} className="row bg-light p-4 rounded">
      <div className="col-12 title-section">
        <h2 className="heading">Upcoming Matches</h2>
      </div>
      {upcomingMatches !== null && upcomingMatches.length !== 0
        ? (
          upcomingMatches.map((match, index) => (
            <div key={match.matchId || index} className="col-lg-6 mb-4">
              <div className="bg-light p-4 rounded">
                <div className="widget-body">
                  <div className="widget-vs">
                    <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                      <div className="team-2 text-center match-data">
                        <div className="img-box">
                          <img src={getLogo(match?.LocalTeam, true)} alt="Image"></img>
                        </div>
                        <h3>{match?.LocalTeam?.name || 'Team 1'}</h3>
                      </div>
                      <div>
                        <span className="vs"><span>VS</span></span>
                      </div>
                      <div className="team-2 text-center match-data">
                        <div className="img-box">
                          <img src={getLogo(match?.VisitorTeam, false)} alt="Image"></img>
                        </div>
                        <h3>{match?.VisitorTeam?.name || 'Team 2'}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <MatchExtraInfo match={match}/>

              </div>
            </div>
          ))
        )
        : (
          <div className="no-info-founded">
            <span>No matches founded</span>
          </div>
        )}
    </div>
  )
}

export default UpcomingMatches