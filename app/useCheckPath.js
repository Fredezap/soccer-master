import { useEffect } from 'react'
import ROUTES from '../src/store/constants/routes.js'
import { useSubmittingFormStore } from '../src/store/slices/useSubmittingFormStore.js'
import { useMessageStore } from '../src/store/slices/useMessageStore.js'
import { checkCredentials } from '../app/checkCredentials.js'
import { useUserStore } from '../src/store/slices/useUserStore.js'

export const useCheckPath = ({ currentPath, setCurrent, navigate }) => {
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const { user } = useUserStore()

  useEffect(() => {
    const routeValues = []

    const flattenRoutes = (routesObj) => {
      Object.values(routesObj).forEach(value => {
        if (typeof value === 'object' && value !== null) {
          flattenRoutes(value)
        } else {
          routeValues.push(value)
        }
      })
    }

    flattenRoutes(ROUTES)
    if (!routeValues.includes(currentPath)) {
      setCurrent(ROUTES.MAIN)
      navigate(ROUTES.MAIN)
      return
    }

    if (currentPath.includes('/admin')) {
      checkCredentials({ setSubmittingForm, addMessage, setCurrent, navigate, user })
    }

    setCurrent(currentPath)
  }, [currentPath, setCurrent, navigate])
}