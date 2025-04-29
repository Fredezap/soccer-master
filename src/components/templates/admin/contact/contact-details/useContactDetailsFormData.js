import * as Yup from 'yup'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'

const useContactDetailsFormData = () => {
  const { currentTournament } = useTournamentsDetails()

  const initialValues = {
    contactAddress: currentTournament.Contact?.contactAddress || '',
    contactEmail: currentTournament.Contact?.contactEmail || '',
    contactPhone: currentTournament.Contact?.contactPhone || ''
  }

  const registerSchema = Yup.object().shape({
    contactAddress: Yup.string().optional(),
    contactEmail: Yup.string()
      .optional()
      .test('is-valid-email', 'Invalid email format', function(value) {
        if (!value) return true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
      }),
    contactPhone: Yup.string()
      .optional()
      .matches(/^\+?[0-9\s]+$/, 'Phone number can only contain numbers and an optional +')
  })

  const formFields = [
    { id: 'contactAddress', type: 'text', label: 'Address', placeholder: 'e.g. street 43' },
    { id: 'contactEmail', type: 'text', label: 'Email', placeholder: 'e.g. example@anymail.com' },
    { id: 'contactPhone', type: 'text', label: 'Phone', placeholder: 'e.g. +69 658 21 58 75' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default useContactDetailsFormData