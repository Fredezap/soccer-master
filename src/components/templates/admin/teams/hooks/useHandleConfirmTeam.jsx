import { useCustomErrorStore } from '../../../../../store/slices/useCustomErrorStore'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'

const useHandleConfirmTeam = () => {
  const { team } = useTeamStore()
  const { setCustomError } = useCustomErrorStore()

  const confirmTeam = (showModalState, setShowModalState) => {
    if (team.name === '' || team.name.length < 2) {
      const error = 'Team name is mandatory'
      setCustomError(error)
    } else {
      setCustomError(null)
      setShowModalState(!showModalState)
    }
  }

  return { confirmTeam }
}

export default useHandleConfirmTeam