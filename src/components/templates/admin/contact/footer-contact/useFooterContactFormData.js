import * as Yup from 'yup'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'

const useFooterContactFormData = () => {
  const { currentTournament } = useTournamentsDetails()

  const initialValues = {
    footerContactWebPage: currentTournament.Contact?.footerContactWebPage || '',
    footerContactInstagram: currentTournament.Contact?.footerContactInstagram || ''
  }

  const registerSchema = Yup.object().shape({
    footerContactWebPage: Yup.string().optional(),
    footerContactInstagram: Yup.string().optional()
  })

  const formFields = [
    { id: 'footerContactWebPage', type: 'text', label: 'Web page', placeholder: 'e.g. https://www.mywebpage.com/' },
    { id: 'footerContactInstagram', type: 'text', label: 'Instagram', placeholder: 'e.g https://www.instagram.com/myinstagram/' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default useFooterContactFormData