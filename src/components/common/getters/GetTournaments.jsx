import { useMessageStore } from '../../../store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore.js'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../../templates/admin/handleSubmitFormAdmin.js'

const getTournaments = () => {
  const { setTournaments, currentTournament, setCurrentTournament } = useTournamentsDetails()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()

  const fetchTournaments = async() => {
    const url = '/tournaments/get-all'
    const httpMethod = 'post'

    try {
      const response = await handleSubmitFormAdmin({ url, addMessage, setSubmittingForm, httpMethod })

      if (response?.success) {
        const allTournaments = response.data?.allTournaments
        setTournaments(allTournaments)

        if (currentTournament && currentTournament.tournamentId) {
          const foundTournament = allTournaments.find(tournament => tournament.tournamentId === currentTournament.tournamentId)
          setCurrentTournament(foundTournament || currentTournament)
        }
      }
    } catch (error) {}
  }

  return { fetchTournaments }
}

export default getTournaments