import * as Yup from 'yup'
import TEAM_CONSTANTS from '../../../../../store/constants/teamConstants'

const createTeamNameFormData = () => {
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = TEAM_CONSTANTS
  const initialValues = {
    name: ''
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(MIN_NAME_LENGTH, `Team name must be at least ${MIN_NAME_LENGTH} characters long`)
      .max(MAX_NAME_LENGTH, `Team name must be at most ${MAX_NAME_LENGTH} characters long`)
  })

  const formFields = [
    { id: 'name', type: 'text', label: 'Team name', placeholder: 'Choose a team name...' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default createTeamNameFormData