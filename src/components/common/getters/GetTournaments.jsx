import { useMessageStore } from '../../../store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore.js'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../../templates/admin/handleSubmitFormAdmin.js'

const getTournaments = () => {
  const { setTournaments } = useTournamentsDetails()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()

  const fetchTournaments = async() => {
    const url = '/tournaments/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ url, addMessage, setSubmittingForm, httpMethod })
    if (response?.success) {
      setTournaments(response.data?.allTournaments)
    }
  }

  return { fetchTournaments }
}

export default getTournaments