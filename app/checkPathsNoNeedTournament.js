import ROUTES from '../src/store/constants/routes'

const checkPathsNoNeedTournament = (currentPath) => {
  if (
    currentPath === ROUTES.ADMIN.MAIN ||
    currentPath === ROUTES.ADMIN.TOURNAMENT_DETAILS ||
    currentPath === (ROUTES.MAIN) ||
    currentPath === (ROUTES.LOGIN) ||
    currentPath === (ROUTES.REGISTER) ||
    currentPath === (ROUTES.CONTACT)
  ) return true
  return false
}

export default checkPathsNoNeedTournament