import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'
import MatchExtraInfo from './MatchExtraInfo'

const UpcomingMatches = () => {
  const { upcomingMatches } = useOrderedMatches()

  return (
    <div style={{ marginTop: '60px' }} className="row bg-light p-4 rounded">
      <div className="col-12 title-section">
        <h2 className="heading">Upcoming Matches</h2>
      </div>
      {upcomingMatches.length !== 0
        ? (
          upcomingMatches.map((match, index) => (
            <div key={match.matchId || index} className="col-lg-6 mb-4">
              <div className="bg-light p-4 rounded">
                <div className="widget-body">
                  <div className="widget-vs">
                    <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                      <div className="team-1 text-center">
                        <img src="images/logo_1.png" alt="Image"></img>
                        <h3>{match?.LocalTeam?.name || 'Team 1'}</h3>
                      </div>
                      <div>
                        <span className="vs"><span>VS</span></span>
                      </div>
                      <div className="team-2 text-center">
                        <img src="images/logo_2.png" alt="Image"></img>
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
      {/* <div className="col-lg-6 mb-4">
            <div className="bg-light p-4 rounded">
              <div className="widget-body">
                <div className="widget-vs">
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <img src="images/logo_1.png" alt="Image"></img>
                      <h3>Football League</h3>
                    </div>
                    <div>
                      <span className="vs"><span>VS</span></span>
                    </div>
                    <div className="team-2 text-center">
                      <img src="images/logo_2.png" alt="Image"></img>
                      <h3>Soccer</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center widget-vs-contents mb-4">
                <h4>World Cup League</h4>
                <p className="mb-5">
                  <span className="d-block">December 20th, 2020</span>
                  <span className="d-block">9:30 AM GMT+0</span>
                  <strong className="text-primary">New Euro Arena</strong>
                </p>

              </div>

            </div>
          </div> */}
    </div>
  )
}

export default UpcomingMatches