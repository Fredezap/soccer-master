import { useEffect, useState } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import Blog from '../../common/Blog'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Videos from '../../common/Videos'
import logoGetter from '../../common/logo-getter/logoGetter'

const Teams = () => {
  const { players } = useHeroDetails()
  const { currentTournament } = useTournamentsDetails()
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const dbTeams = currentTournament?.Teams
    if (dbTeams && dbTeams.length !== 0) setTeams(dbTeams)
  }, [currentTournament])

  const getLogo = (teamId) => {
    const team = teams.find(team => team.teamId === teamId)
    const isLocalTeam = teamId % 2 === 0
    return logoGetter(team, isLocalTeam)
  }

  return (
    <div>
      <Hero title={players.title} />
      <div className="teams-main bg-dark">
        <div style={{ minWidth: '100%' }} className="row bg-light p-4 rounded">
          <div className="col-12 title-section">
            <h2 className="heading">Teams</h2>
          </div>
          {teams?.length !== 0
            ? (
              teams.map((team, index) => (
                <div key={team.teamId || index} className="col-lg-6 mb-4">
                  <div className="bg-light p-4 rounded">
                    <div className="widget-body">
                      <div className="widget-vs">
                        <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                          <div className="team-1 text-center w-100">
                            <img className="team-logo" src={getLogo(team.teamId)} alt="Image"></img>
                            <h3>
                              {team.name ? team.name : `team ${index})`}
                            </h3>
                            {team.Players?.length !== 0
                              ? (
                                <ul className="team-list">
                                  {team.Players.map((player, index) => (
                                    <li key={player.playerId || index}>
                                      <span>{player.name}</span>
                                    </li>
                                  ))}

                                </ul>
                              )
                              : (
                                <p>
                                  No players founded
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
            : (
              <div className="no-info-founded">
                <span>No teams founded</span>
              </div>
            )}
          <Videos />
          {/* <Blog /> */}
        </div>
      </div>
    </div>
  )
}

export default Teams