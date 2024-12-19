import ROUTES from '../src/store/constants/routes.js'
import checkAdminAccess from '../src/components/templates/admin/checkAdminAccess.js'

export const checkCredentials = async({ setSubmittingForm, addMessage, setCurrent, navigate }) => {
  const isValid = await checkAdminAccess({ setSubmittingForm, addMessage })
  if (!isValid) {
    setCurrent?.(ROUTES.LOGIN)
    navigate?.(ROUTES.LOGIN)
    globalThis.localStorage.removeItem('user')
  }
  return isValid
}