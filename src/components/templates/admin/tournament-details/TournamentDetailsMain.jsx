import useHeroDetails from '../../../common/hero/useHeroDetails.js'
import Hero from '../../../common/hero/Hero'
import { Button } from 'react-bootstrap'
import { AiOutlineCalendar } from 'react-icons/ai'
import { IoFootball } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'

const TournamentDetailsMain = () => {
  const { adminTournamentDetails } = useHeroDetails()
  const { tournaments, currentTournament, setTournaments, setCurrentTournament } = useTournamentsDetails()
  const navigate = useNavigate()

  return (
    <div>
      {!currentTournament
        ? (
          <div>
            <p>We could not find the tournament you are looking for</p>
          </div>
        )
        : (
          <div>
            <Hero title={adminTournamentDetails.title} />
            <div className="admin-all-mains bg-light">
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
            </div>
          </div>
        )}
    </div>
  )
}

export default TournamentDetailsMain