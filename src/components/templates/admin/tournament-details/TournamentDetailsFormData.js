import * as Yup from 'yup'
import TOURNAMENT_DETAILS from '../../../../store/constants/tournamentDetails'

const TournamentDetailsFormData = () => {
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_DATE_VALUE } = TOURNAMENT_DETAILS
  const initialValues = {
    name: '',
    date: ''
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .optional()
      .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters long`)
      .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters long`),
    date: Yup.date()
      .required('Date is mandatory')
      .min(MIN_DATE_VALUE, 'Date must be future')
  })

  const formFields = [
    { id: 'name', type: 'text', label: 'Tournament name', placeholder: 'Tournament name here...' },
    { id: 'date', type: 'date', label: 'Starting date', placeholder: 'Tournament date here...' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default TournamentDetailsFormData