import { useEffect } from 'react'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'
import handleSubmitFormAdmin from './handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import { FaTrophy } from 'react-icons/fa'
import formatDate from '../../common/formatDate'

const AdminMain = () => {
  const { adminMain } = useHeroDetails()
  const { tournaments, setCurrentTournament } = useTournamentsDetails()
  const navigate = useNavigate()

  const handleTournamentSelected = (tournament) => {
    setCurrentTournament(tournament)
    navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS_MAIN)
  }

  const handleCreateTournament = () => {
    setCurrentTournament({})
    navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS)
  }

  return (
    <div>
      <Hero title={adminMain.title} />
      <div className="admin-all-mains">
        <h2>Tournaments</h2>
        {tournaments.length === 0
          ? (
            <div>
              <p>There are not tournaments created yet</p>
            </div>
          )
          : (
            <div className="tournaments-list">
              <ListGroup>
                {tournaments.map((tournament) => (
                  <ListGroup.Item
                    action
                    key={tournament.tournamentId}
                    onClick={() => handleTournamentSelected(tournament)}
                  >
                    <div className="icon-container">
                      <FaTrophy size={24} />
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
      </div>
      <div onClick={handleCreateTournament} className="create-tournament-link">
        <p>Create tournament</p>
      </div>
    </div>
  )
}

export default AdminMain