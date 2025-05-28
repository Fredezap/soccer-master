import { useLocation, useNavigate } from 'react-router-dom'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'
import { useMessageStore } from '../../../../store/slices/useMessageStore'
import getTournaments from '../../../common/getters/GetTournaments'
import ROUTES from '../../../../store/constants/routes'
import formatDate from '../../../common/formatDate'
import { ListGroup } from 'react-bootstrap'
import deafultTournamentLogo from '../../../../images/tournamentDefaultLogo_1.png'
import { useState } from 'react'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const TournamentList = () => {
  const { tournaments, setCurrentTournament, setIsCreating } = useTournamentsDetails()
  const navigate = useNavigate()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()
  const location = useLocation()
  const currentPath = location.pathname

  const [searchTerm, setSearchTerm] = useState('')

  const handleTournamentSelected = async(paramTournament) => {
    const response = await fetchTournamentDetails({ paramTournament })
    if (response?.success) {
      if (currentPath === ROUTES.ADMIN.TOURNAMENT_DETAILS_MAIN) {
        const currentScroll = window.scrollY
        if (currentScroll === 0) return
        window.scrollTo({ top: currentScroll, behavior: 'instant' })
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 10)
        return
      }
      navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS_MAIN)
    } else {
      addMessage({ type: 'error', content: 'An error ocurred finding the tournament that you have selected' })
    }
  }

  const handleCreateTournament = () => {
    setCurrentTournament({})
    setIsCreating(true)
    navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS)
  }

  const getTournamentLogo = (tournament) => {
    const tournamentLogo = tournament?.tournamentLogo
      ? `${BASE_URL}${tournament.tournamentLogo}`
      : deafultTournamentLogo
    return tournamentLogo
  }

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-all-mains bg-lights">
      <h2>Tournaments</h2>
      <input
        type="text"
        placeholder="Search tournaments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3 input-white-border"
      />

      {filteredTournaments.length === 0
        ? (
          <div>
            <p>No tournaments found</p>
          </div>
        )
        : (
          <div className="tournaments-list">
            <ListGroup>
              {filteredTournaments.map((tournament) => (
                <ListGroup.Item
                  className="tournament-item"
                  action
                  key={tournament.tournamentId}
                  onClick={() => handleTournamentSelected(tournament)}
                >
                  <div className="icon-container">
                    <img className="admin-tournament-logo" src={getTournamentLogo(tournament)} alt="Tournament Logo" />
                  </div>
                  <div className="text-container">
                    <h5>{tournament.name}</h5>
                    <p>{formatDate(tournament.date).slashDate}</p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      <div onClick={handleCreateTournament} className="create-tournament-link">
        <p>Create tournament</p>
      </div>
    </div>
  )
}

export default TournamentList