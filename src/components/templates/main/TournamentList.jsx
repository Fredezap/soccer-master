import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import formatDate from '../../common/formatDate'
import { ListGroup } from 'react-bootstrap'
import { FaTrophy } from 'react-icons/fa'

const TournamentList = () => {
  const { tournaments, setCurrentTournament } = useTournamentsDetails()
  const navigate = useNavigate()

  const handleSelectTournament = (tournament) => {
    console.log('TORNEO: ', tournament)
    setCurrentTournament(tournament)
    navigate(ROUTES.HOME)
  }

  return (
    <div className="no-tournament-selected">
      <ListGroup>
        {tournaments.map((tournament) => (
          <ListGroup.Item
            action
            key={tournament.tournamentId}
            onClick={() => handleSelectTournament(tournament)}
          >
            <div className="icon-container">
              <FaTrophy size={24} />
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
}

export default TournamentList