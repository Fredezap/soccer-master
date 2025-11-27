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
      navigate(ROUTES.HOME)
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
              // placeholder="Search categories..."
              placeholder="Kategorien durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-3 input-white-border"
            />

            <div className="flex-row-tournament-list">
              {filteredTournaments.map((tournament) => (
                <div
                  key={tournament.tournamentId}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  style={{ height: '250px' }}
                >
                  <div
                    className="tournament-card h-100 w-100"
                    onClick={() => handleSelectTournament(tournament)}
                  >
                    <div className="icon-container">
                      <img
                        className="admin-tournament-logo"
                        src={getTournamentLogo(tournament)}
                        alt="Tournament Logo"
                      />
                    </div>
                    <div className="text-container">
                      <h5>{tournament.name}</h5>
                      <p style={{ margin: '0' }}>
                        {formatDate(tournament.date).slashDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )
        : (
          <div>
            {/* <span style={{ fontWeight: 'bold', color: 'whitesmoke' }}>Tournament details will be available soon</span> */}
            <span style={{ fontWeight: 'bold', color: 'whitesmoke' }}>Turnierdetails werden in Kürze verfügbar sein</span>
          </div>
        )}
    </div>
  )
}

export default TournamentList