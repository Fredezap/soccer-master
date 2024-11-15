import React from 'react'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'
import { Button } from 'react-bootstrap'
import { AiOutlineCalendar } from 'react-icons/ai'
import { IoFootball } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'

const AdminMain = () => {
  const { adminMain } = useHeroDetails()
  const navigate = useNavigate()

  return (
    <div>
      <Hero title={adminMain.title} content={adminMain.content} />
      <div className="admin-all-mains">
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
      </div>
    </div>
  )
}

export default AdminMain