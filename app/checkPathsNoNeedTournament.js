import ROUTES from '../src/store/constants/routes'

const checkPathsNoNeedTournament = (currentPath) => {
  if (
    currentPath.includes('/admin') ||
    currentPath === (ROUTES.MAIN) ||
    currentPath === (ROUTES.LOGIN) ||
    currentPath === (ROUTES.REGISTER)
  ) return true
  return false
}

export default checkPathsNoNeedTournament