import { Button } from 'react-bootstrap'
import { AiOutlineCalendar } from 'react-icons/ai'
import { IoFootball } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes'

const TournamentDetailsOptions = () => {
  const navigate = useNavigate()

  return (
    <div className="admin-all-mains bg-lights">
      <div className="admin-tournament-options">
        <Button variant="outline-success" onClick={() => navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS)}>
          <span className="button-details"><AiOutlineCalendar />Tournament details</span>
        </Button>
      </div>
      <div className="admin-tournament-options">
        <Button variant="outline-success" onClick={() => navigate(ROUTES.ADMIN.TEAMS.MAIN)}>
          <span className="button-details"><IoFootball />Teams</span>
        </Button>
      </div>
      <div className="admin-tournament-options">
        <Button variant="outline-success" onClick={() => navigate(ROUTES.ADMIN.FIXTURE.MAIN)}>
          <span className="button-details"><IoFootball />Fixture</span>
        </Button>
      </div>
      <div className="admin-tournament-options">
        <Button variant="outline-success" onClick={() => navigate(ROUTES.ADMIN.VIDEOS)}>
          <span className="button-details"><IoFootball />Videos</span>
        </Button>
      </div>
      <div className="admin-tournament-options">
        <Button variant="outline-success" onClick={() => navigate(ROUTES.ADMIN.CONTACT)}>
          <span className="button-details"><IoFootball />Contact</span>
        </Button>
      </div>
    </div>
  )
}

export default TournamentDetailsOptions