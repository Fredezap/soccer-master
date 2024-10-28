import React from 'react'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'
import { Button } from 'react-bootstrap'
import { AiOutlineCalendar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'

const AdminMain = () => {
  const { adminMain } = useHeroDetails()
  const navigate = useNavigate()

  return (
    <div>
      <Hero title={adminMain.title} content={adminMain.content} />
      <div>
        <div className="admin-tournament-date">
          <p>TOURNAMENT DETAILS</p>
          <Button onClick={() => navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS)}>
            <span className="button-details"><AiOutlineCalendar /> Set date and name for the tournament</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminMain