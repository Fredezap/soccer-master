import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'
import TournamentList from '../admin/tournament-list/TournamentList'
import getTournaments from '../../common/getters/GetTournaments'
import SideMenu from './side-menu/SideMenu'
import { useEffect } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const AdminMain = () => {
  const { adminMain } = useHeroDetails()
  const { fetchAllTournamentsByAdminUser } = getTournaments()
  const { setCurrentTournament } = useTournamentsDetails()

  useEffect(() => {
    setCurrentTournament({})
    fetchAllTournamentsByAdminUser()
  }, [])

  return (
    <div>
      <SideMenu />
      <Hero title={adminMain.title} />
      <TournamentList />
    </div>
  )
}

export default AdminMain