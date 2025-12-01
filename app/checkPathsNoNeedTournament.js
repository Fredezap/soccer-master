import ROUTES from '../src/store/constants/routes'

const checkPathsNoNeedTournament = (currentPath) => {
  if (
    currentPath === ROUTES.ADMIN.MAIN ||
    currentPath === ROUTES.ADMIN.TOURNAMENT_DETAILS ||
    currentPath === (ROUTES.ADMIN.USERS_MANAGMENT) ||
    // currentPath === (ROUTES.MAIN) ||
    // currentPath === (ROUTES.HOME) ||
    currentPath === (ROUTES.LOGIN) ||
    currentPath === (ROUTES.ADMIN.REGISTER) ||
    currentPath === (ROUTES.CONTACT)
  ) return true
  return false
}

export default checkPathsNoNeedTournament