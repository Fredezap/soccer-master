import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'
import logoGetter from '../../common/logo-getter/logoGetter'
import MatchExtraInfo from './MatchExtraInfo'

const NextMatch = () => {
  const { nextMatch } = useOrderedMatches()

  const getLogo = (team, isLocalTeam) => {
    return logoGetter(team, isLocalTeam)
  }

  return (
    <div className="row mb-5">
      <div className="col-lg-12">
        <div className="widget-next-match">
          <div className="widget-title">
            <h3>Next Match</h3>
          </div>
          {nextMatch.length !== 0
            ? (
              <div>
                <div className="widget-body mb-3">
                  <div className="widget-vs">
                    <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                      <div className="team-2 text-center match-data">
                        <div className="img-box">
                          <img src={getLogo(nextMatch?.LocalTeam, true)} alt="Team 1"></img>
                        </div>
                        <h3>{nextMatch?.LocalTeam?.name || 'Team 1'}</h3>
                      </div>
                      <div>
                        <span className="vs"><span>VS</span></span>
                      </div>
                      <div className="team-2 text-center match-data">
                        <div className="img-box">
                          <img src={getLogo(nextMatch?.VisitorTeam, false)} alt="Team 2"></img>
                        </div>
                        <h3>{nextMatch?.VisitorTeam?.name || 'Team 2'}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <MatchExtraInfo match={nextMatch} />
              </div>
            )
            : (
              <div className="no-info-founded">
                <span>No match info founded</span>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default NextMatch