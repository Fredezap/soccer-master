import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import formatDate from '../../common/formatDate'
import { ListGroup } from 'react-bootstrap'
import { Trophy } from 'lucide-react'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore'
import getTournaments from '../../common/getters/GetTournaments'

const TournamentList = () => {
  const { tournaments, setCurrentTournament } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()
  const navigate = useNavigate()

  const handleSelectTournament = async(paramTournament) => {
    const response = await fetchTournamentDetails({ paramTournament })
    if (response?.success) navigate(ROUTES.HOME)
    else {
      addMessage({ type: 'error', content: 'An error ocurred finding the tournament that you have selected' })
      navigate(ROUTES.MAIN)
    }
  }

  return (
    <div>
      {tournaments.length > 0
        ? (
          <div className="no-tournament-selected">
            <ListGroup>
              {tournaments.map((tournament) => (
                <ListGroup.Item
                  action
                  key={tournament.tournamentId}
                  onClick={() => handleSelectTournament(tournament)}
                >
                  <div className="icon-container">
                    <Trophy />
                  </div>
                  <div className="text-container">
                    <h5>{tournament.name}</h5>
                    <p style={{ margin: '0' }}>{formatDate(tournament.date).slashDate}</p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )
        : (
          <div className="no-info-founded bg-dark">
            <span style={{ fontWeight: 'bold', color: 'whitesmoke' }}>Tournament details will be available soon</span>
          </div>
        )}
    </div>
  )
}

export default TournamentList