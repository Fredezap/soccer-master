import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import TournamentList from '../admin/tournament-list/TournamentList'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import getTournaments from '../../common/getters/GetTournaments'
import SideMenu from './side-menu/SideMenu'
import { useEffect } from 'react'

const AdminMain = () => {
  const { adminMain } = useHeroDetails()
  const { tournaments, setCurrentTournament } = useTournamentsDetails()
  const navigate = useNavigate()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails, fetchAllTournaments } = getTournaments()

  useEffect(() => {
    fetchAllTournaments()
  }, [])

  // todo: VER PORQUE NO SE ESTAN UTILIZANDO ESTOS METODOS
  const handleTournamentSelected = async(paramTournament) => {
    const response = await fetchTournamentDetails({ paramTournament })
    if (response?.success) navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS_MAIN)
    else addMessage({ type: 'error', content: 'An error ocurred finding the tournament that you have selected' })
  }

  const handleCreateTournament = () => {
    setCurrentTournament({})
    navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS)
  }

  return (
    <div>
      <SideMenu />
      <Hero title={adminMain.title} />
      <TournamentList />
    </div>
  )
}

export default AdminMain