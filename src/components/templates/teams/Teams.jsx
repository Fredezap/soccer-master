import { useEffect, useRef, useState } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Videos from '../../common/Videos'
import logoGetter from '../../common/logo-getter/logoGetter'
import ROUTES from '../../../store/constants/routes'
import { useNavigate } from 'react-router-dom'

const Teams = () => {
  const { players } = useHeroDetails()
  const { currentTournament } = useTournamentsDetails()
  const [teams, setTeams] = useState([])
  const navigate = useNavigate()

  const heroRef = useRef(null)

  // Scroll after tournament loads
  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
  }, [currentTournament])

  // Load teams
  useEffect(() => {
    const dbTeams = currentTournament?.Teams
    if (dbTeams && dbTeams.length !== 0) setTeams(dbTeams)
  }, [currentTournament])

  // Get team logo
  const getLogo = (teamId) => {
    const team = teams.find(t => t.teamId === teamId)
    const isLocalTeam = teamId % 2 === 0
    return logoGetter(team, isLocalTeam)
  }

  const videoSectionExist = currentTournament?.Videos?.length > 0

  // ✅ Voting logic
  const votingIsAvaliable = currentTournament?.MVPSurvey?.votingIsAvaliable || false
  const showMVP =
    (currentTournament?.MVPSurvey?.showMVP &&
      currentTournament?.MVPSurvey?.playerId) ||
    false

  // ✅ Extract MVP player + team
  let MVPplayer = null

  if (showMVP) {
    currentTournament.Teams.forEach(team => {
      const found = team.Players.find(
        p => p.playerId === currentTournament.MVPSurvey.playerId
      )

      if (found) {
        MVPplayer = {
          name: found.name,
          teamName: team.name,
          playerId: found.playerId,
          teamId: team.teamId
        }
      }
    })
  }

  return (
    <div>
      <Hero title={players.title} ref={heroRef} />

      <div className="teams-main bg-dark">

        {/* ✅ VOTACIÓN ABIERTA */}
        {votingIsAvaliable && !showMVP && (
          <div className="survey-box centered">
            <h2>STIMME FÜR DEN MVP AB</h2>

            <button
              className="btn btn-primary custom-button survey-button"
              onClick={() => navigate(ROUTES.SURVEY)}
            >
              abstimmen
            </button>
          </div>
        )}

        {/* ✅ MOSTRAR MVP */}
        {/* ✅ MOSTRAR MVP */}
        {!votingIsAvaliable && showMVP && MVPplayer && (
          <div className="survey-box centered mvp-box">
            <h2 className="mvp-title">DIE MVP DES TURNIERS IST</h2>

            <div className="mvp-content">
              <img
                src={getLogo(MVPplayer.teamId)}
                alt="Team Logo"
                className="mvp-team-logo"
              />

              <div className="mvp-info centered">
                <p className="mvp-name">{MVPplayer.name}</p>
                <p className="mvp-team">{MVPplayer.teamName}</p>
              </div>
            </div>
          </div>
        )}

        {/* ✅ LISTA DE EQUIPOS */}
        <div style={{ minWidth: '100%' }} className="row bg-light p-4 rounded">
          <div className="col-12 title-section">
            <h2 className="heading">Teams</h2>
          </div>

          {teams.length !== 0
            ? (
              teams.map(team => (
                <div key={team.teamId} className="col-lg-6 mb-4">
                  <div className="bg-light rounded team-info">
                    <div className="widget-body">
                      <div className="widget-vs">
                        <div className="d-flex align-items-center justify-content-around w-100">

                          <div className="team-box text-center w-100 team-box-custom">
                            <img
                              className="team-logo"
                              src={getLogo(team.teamId)}
                              alt="Team Logo"
                            />

                            <h3 className="team-title-custom">{team.name}</h3>

                            {team.Players?.length
                              ? (
                                <ul className="team-list player-list-custom">
                                  {team.Players.map(player => (
                                    <li key={player.playerId} className="player-item-custom">
                                      <span>{player.name}</span>

                                      {/* MVP icon */}
                                      {showMVP && MVPplayer?.playerId === player.playerId && (
                                        <span className="mvp-icon">⭐</span>
                                      )}
                                    </li>

                                  ))}
                                </ul>
                              )
                              : (
                                <p>Keine Spieler gefunden</p>
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
                <span>Keine Teams gefunden</span>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Teams