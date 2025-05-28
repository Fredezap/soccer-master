import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import formatDate from '../../common/formatDate'
import { ListGroup } from 'react-bootstrap'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import getTournaments from '../../common/getters/GetTournaments'
import deafultTournamentLogo from '../../../images/tournamentDefaultLogo_1.png'
import { useState } from 'react'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const TournamentList = () => {
  const { tournaments } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSelectTournament = async(paramTournament) => {
    const response = await fetchTournamentDetails({ paramTournament })
    if (response?.success) navigate(ROUTES.HOME)
    else {
      addMessage({ type: 'error', content: 'An error ocurred finding the tournament that you have selected' })
      navigate(ROUTES.MAIN)
    }
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
    <div className="no-info-founded bg-light">
      {tournaments.length > 0
        ? (
          <div className="no-tournament-selected tournaments-list">
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-3 input-white-border"
            />

            {filteredTournaments.length === 0
              ? (
                <p>No tournaments found</p>
              )
              : (
                <ListGroup>
                  {filteredTournaments.map((tournament) => (
                    <ListGroup.Item
                      className="tournament-item"
                      action
                      key={tournament.tournamentId}
                      onClick={() => handleSelectTournament(tournament)}
                    >
                      <div className="icon-container">
                        <img className="admin-tournament-logo" src={getTournamentLogo(tournament)} alt="Tournament Logo" />
                      </div>
                      <div className="text-container">
                        <h5>{tournament.name}</h5>
                        <p style={{ margin: '0' }}>{formatDate(tournament.date).slashDate}</p>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
          </div>
        )
        : (
          <div>
            <span style={{ fontWeight: 'bold', color: 'whitesmoke' }}>Tournament details will be available soon</span>
          </div>
        )}
    </div>
  )
}

export default TournamentList