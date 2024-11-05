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
      <div>
        <div className="admin-tournament-options">
          <p>TOURNAMENT DETAILS</p>
          <Button onClick={() => navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS)}>
            <span className="button-details"><AiOutlineCalendar />Set tournament details</span>
          </Button>
        </div>
      </div>
      <div>
        <div className="admin-tournament-options">
          <p>TEAMS</p>
          <Button onClick={() => navigate(ROUTES.ADMIN.TEAMS.MAIN)}>
            <span className="button-details"><IoFootball />Set teams</span>
          </Button>
        </div>
      </div>
      <div>
        <div className="admin-tournament-options">
          <p>MATCHES</p>
          <p>Agregar otro boton que me lleve a establecer los grupos y partidos, ver como hacer eso</p>
        </div>
      </div>
    </div>
  )
}

export default AdminMain