import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'
import logoGetter from '../../common/logo-getter/logoGetter'
import MatchExtraInfo from './MatchExtraInfo'

const FinishedMatches = () => {
  const { finishedMatches } = useOrderedMatches()

  const getLogo = (team, isLocalTeam) => {
    return logoGetter(team, isLocalTeam)
  }

  const reversedFinishedMatches = [...finishedMatches].reverse()

  return (
    <div style={{ marginTop: '60px' }} className="row bg-light p-4 rounded">
      <div className="col-12 title-section">
        <h2 className="heading">Finished Matches</h2>
      </div>
      {reversedFinishedMatches !== null && reversedFinishedMatches.length !== 0
        ? (
          reversedFinishedMatches.map((match, index) => (
            <div key={match.matchId || index} className="col-lg-6 mb-4">
              <div className="bg-light p-4 rounded">
                <div className="widget-body mb-3">
                  <div className="widget-vs">
                    <div className="next-match-teams">
                      <div className="team-2 text-center match-data">
                        <div className="img-box">
                          <img src={getLogo(match?.LocalTeam, true)} alt="Image"></img>
                        </div>
                        <h3>
                          {match?.LocalTeam?.name
                            ? match?.LocalTeam?.name
                            : match?.localTeamPlaceholder
                              ? match.localTeamPlaceholder
                              : 'Team 1'}
                        </h3>
                        {' '}
                        <strong className="text-white">
                          {match?.localTeamScore !== null && match?.localTeamScore !== undefined
                            ? `(${match?.localTeamScore})`
                            : '(-)'}
                        </strong>
                      </div>
                      <div>
                        <span className="vs"><span>VS</span></span>
                      </div>
                      <div className="team-2 text-center match-data">
                        <div className="img-box">
                          <img src={getLogo(match?.visitorTeam, false)} alt="Image"></img>
                        </div>
                        <h3>
                          {match?.visitorTeam?.name
                            ? match?.visitorTeam?.name
                            : match?.visitorTeamPlaceholder
                              ? match.visitorTeamPlaceholder
                              : 'Team 2'}
                        </h3>
                        {' '}
                        <strong className="text-white">
                          {match?.visitorTeamScore !== null && match?.visitorTeamScore !== undefined
                            ? `(${match?.visitorTeamScore})`
                            : '(-)'}
                        </strong>
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

export default FinishedMatches