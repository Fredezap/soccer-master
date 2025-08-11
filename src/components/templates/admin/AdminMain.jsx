import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'
import TournamentList from '../admin/tournament-list/TournamentList'
import getTournaments from '../../common/getters/GetTournaments'
import SideMenu from './side-menu/SideMenu'
import { useEffect, useState } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import { Button } from 'react-bootstrap'
import ROUTES from '../../../store/constants/routes'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../store/slices/useUserStore'

const AdminMain = () => {
  const { adminMain } = useHeroDetails()
  const { fetchAllTournamentsByAdminUser } = getTournaments()
  const { setCurrentTournament } = useTournamentsDetails()
  const navigate = useNavigate()
  const { isSuperAdmin } = useUserStore()

  useEffect(() => {
    setCurrentTournament({})

    const fetchData = async() => {
      await fetchAllTournamentsByAdminUser()
    }

    fetchData()
  }, [])

  return (
    <div>
      <SideMenu />
      <Hero title={adminMain.title} />
      {isSuperAdmin() && (
        <div className="centered">
          <Button
            variant="outline-light"
            className="px-4 py-2 mt-5"
            onClick={() => navigate(ROUTES.ADMIN.USERS_MANAGMENT)}
          >
          Manage admin users
          </Button>
        </div>
      )}
      <TournamentList />
    </div>
  )
}

export default AdminMain