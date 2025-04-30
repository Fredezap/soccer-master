import { useMessageStore } from '../../../store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore.js'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../../templates/admin/handleSubmitFormAdmin.js'

const getTournaments = () => {
  const { currentTournament, setTournaments, setCurrentTournament } = useTournamentsDetails()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()

  const fetchAllTournaments = async() => {
    const url = '/tournaments/get-all'
    const httpMethod = 'post'

    try {
      const response = await handleSubmitFormAdmin({ url, addMessage, setSubmittingForm, httpMethod })
      if (response?.success) {
        const allTournaments = response.data?.allTournaments
        setTournaments(allTournaments)
      }
    } catch (error) {}
  }

  const fetchTournamentDetails = async({ paramTournament } = {}) => {
    try {
      const url = '/tournaments/get-details'
      const httpMethod = 'post'
      const chequedTournamentId = paramTournament?.tournamentId || currentTournament?.tournamentId

      if (!chequedTournamentId) {
        addMessage({ type: 'error', message: 'Tournament details not found' })
        return { success: false }
      }

      const values = { tournamentId: chequedTournamentId }
      const response = await handleSubmitFormAdmin({ values, url, addMessage, setSubmittingForm, httpMethod })

      if (response?.success) {
        const tournamentDetails = response.data?.tournamentDetails
        if (tournamentDetails) setCurrentTournament(tournamentDetails)
        return { success: true }
      }

      return { success: false }
    } catch (error) {
      return { success: false }
    }
  }

  return { fetchAllTournaments, fetchTournamentDetails }
}

export default getTournaments