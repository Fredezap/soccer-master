import React, { useEffect, useState } from 'react'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'
import { Button } from 'react-bootstrap'
import { AiOutlineCalendar } from 'react-icons/ai'
import { IoFootball } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../store/constants/routes'
import postService from '../../../services/postService'
import handleSubmitFormAdmin from './handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const AdminMain = () => {
  const { adminMain } = useHeroDetails()
  const [selectedTournament, setSelectedTournament] = useState([])
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { tournaments, currentTournament, setTournaments, setCurrentTournament } = useTournamentsDetails()
  const navigate = useNavigate()

  const getTournaments = async() => {
    console.log('LLAMADA EN GET TOURNAMENTS')
    const url = 'admin/tournament-details/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ url, addMessage, setSubmittingForm, httpMethod })
    console.log('response en admin main: ', response)
    if (response?.success) {
      setTournaments(response.data?.allTournaments)
    }
  }

  const handleTournamentSelected = (tournament) => {
    setSelectedTournament(tournament)
    navigate(ROUTES.ADMIN.TOURNAMENT_DETAILS_MAIN)
  }

  useEffect(() => {
    getTournaments()
  }, [])
  console.log('TOURNAMENT:', tournaments)
  // todo: ACORDARME DE HACER LA PR EN GITHUB PARA TRAER LOS CAMBIOS DEL LOGIN/REGISTER
  // todo: VER LAS CONSULTAS A BASE DE DATOS Y SI FUNCIONAN PARA TODOS LOS TORNEOS
  // todo: VER SI LAS DEJO ASI O SI HAGO UN CONTEXTO CON SUBSTAND EN UN SOLO OBJETO
  return (
    <div>
      <Hero title={adminMain.title} content={adminMain.content} />
      <div className="admin-all-mains">
        {tournaments.length === 0
          ? (
            <div>
              <div>
                <p>There are not tournaments created yet</p>
              </div>
              <div>
                <a href={ROUTES.ADMIN.TOURNAMENT_DETAILS}>Create tournament</a>
              </div>
            </div>
          )
          : (
            <div>
              {tournaments.map(tournament => (
                <Button key={tournament.tournamentId} onClick={() => handleTournamentSelected(tournament)}>
                  {tournament.name}
                </Button>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default AdminMain