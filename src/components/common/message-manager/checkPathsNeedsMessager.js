import ROUTES from '../../../store/constants/routes'

const checkPathsNeedsMessager = (currentPath) => {
  if (
    currentPath.includes('/admin') ||
    currentPath === (ROUTES.LOGIN) ||
    currentPath === (ROUTES.CONTACT)
  ) return true
  return false
}

export default checkPathsNeedsMessager