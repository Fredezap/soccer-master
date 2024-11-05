import * as Yup from 'yup'
import TEAM_CONSTANTS from '../../../../../store/constants/teamConstants'

const createTeamPlayerFormData = () => {
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, PLAYER_NAME_CAN_NOT_BE_EMPTY } = TEAM_CONSTANTS
  const initialValues = {
    player: ''
  }

  const registerSchema = Yup.object().shape({
    player: Yup.string()
      .required(PLAYER_NAME_CAN_NOT_BE_EMPTY)
      .min(MIN_NAME_LENGTH, `Player name must be at least ${MIN_NAME_LENGTH} characters long`)
      .max(MAX_NAME_LENGTH, `Player name must be at most ${MAX_NAME_LENGTH} characters long`)
  })

  const formFields = [
    { id: 'player', type: 'text', label: 'Player', placeholder: 'Add a player to the team...' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default createTeamPlayerFormData