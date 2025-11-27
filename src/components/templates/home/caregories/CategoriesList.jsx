import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'
import formatDate from '../../../common/formatDate'
import { ListGroup } from 'react-bootstrap'
import { useMessageStore } from '../../../../store/slices/useMessageStore'
import getTournaments from '../../../common/getters/GetTournaments'
import deafultTournamentLogo from '../../../../images/tournamentDefaultLogo_1.png'
import { useState } from 'react'
import categorieLogo from '../../../../images/categorieLogo.png'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const CategoriesList = () => {
  const { tournaments } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()
  const navigate = useNavigate()

  const handleSelectTournament = async(paramTournament) => {
    const response = await fetchTournamentDetails({ paramTournament })
    if (response?.success) navigate(ROUTES.MATCHES)
    else {
      addMessage({ type: 'error', content: 'An error ocurred finding the tournament that you have selected' })
      navigate(ROUTES.HOME)
    }
  }

  return (
    <div className="categories-list">
      {tournaments.length > 0
        ? (
          tournaments.map((tournament) => (
            <div
              onClick={() => handleSelectTournament(tournament)}
              key={tournament.tournamentId}
              className="categories-cards centered"
            >
              <div className="icon-container">
                <img
                  className="admin-tournament-logo"
                  src={categorieLogo}
                  alt="Tournament Logo"
                />
              </div>
              <div className="categorie-detail centered">
                <h2>{tournament.name}</h2>
                <p>
                  {formatDate(tournament.date).dotDate}
                </p>
              </div>
            </div>
          ))
        )
        : (
          <div className="catedories-no-found">
            {/* <span style={{ fontWeight: 'bold', color: 'whitesmoke' }}>Tournament details will be available soon</span> */}
            <span>Turnierdetails werden in Kürze verfügbar sein</span>
          </div>
        )}
    </div>
  )
}

export default CategoriesList