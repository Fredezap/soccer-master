import { useEffect } from 'react'
import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'
import logoGetter from '../../common/logo-getter/logoGetter'
import MatchExtraInfo from './MatchExtraInfo'
import siteCountDownForNextMatch from '../../../js/main/site/siteCountDownForNextMatch'
import { useNextMatchRemainingTime } from '../../../store/slices/useNextMatchRemainingTime'
import getTournaments from '../../common/getters/GetTournaments'

const NextMatch = ({ backgroundStyle }) => {
  const { nextMatch } = useOrderedMatches()
  const { remaining, setRemainingTime } = useNextMatchRemainingTime()
  const { fetchTournamentDetails } = getTournaments()

  const getLogo = (team, isLocalTeam) => {
    return logoGetter(team, isLocalTeam)
  }

  const handleCountdownFinish = (status) => {
    if (status !== remaining) {
      setRemainingTime(status)
    }
  }

  const { countdown } = siteCountDownForNextMatch(handleCountdownFinish)

  useEffect(() => {
    if (!remaining) {
      fetchTournamentDetails()
    }
  }, [remaining])

  useEffect(() => {
    if (nextMatch?.date) {
      countdown(nextMatch)
    }
  }, [nextMatch])

  return (
    <div className="row mb-5">
      <div className="col-lg-12">
        <div className={`widget-next-match ${backgroundStyle}`}>
          <div className="widget-title">
            <h3>Next Match</h3>
          </div>
          {nextMatch && nextMatch.length !== 0
            ? (
              <div>
                <div className="widget-body mb-3">
                  <div className="widget-vs">
                    <div className="next-match-teams">
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

                <MatchExtraInfo match={nextMatch} isNextMatch={true} />
              </div>
            )
            : (
              <div className="no-info-founded">
                <span>No match found</span>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default NextMatch