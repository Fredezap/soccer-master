import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'
import MatchExtraInfo from './MatchExtraInfo'

const FinishedMatches = () => {
  const { finishedMatches } = useOrderedMatches()

  return (
    <div style={{ marginTop: '60px' }} className="row bg-light p-4 rounded">
      <div className="col-12 title-section">
        <h2 className="heading">Finished Matches</h2>
      </div>
      {finishedMatches.length !== 0
        ? (
          finishedMatches.map((match, index) => (
            <div key={match.matchId || index} className="col-lg-6 mb-4">
              <div className="bg-light p-4 rounded">
                <div className="widget-body">
                  <div className="widget-vs">
                    <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                      <div className="team-1 text-center">
                        <img src="images/logo_1.png" alt="Image"></img>
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
                      <div className="team-2 text-center">
                        <img src="images/logo_2.png" alt="Image"></img>
                        <h3>
                          {match?.LocalTeam?.name
                            ? match?.LocalTeam?.name
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