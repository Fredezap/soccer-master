import { create } from 'zustand'
import ROUTES from '../constants/routes'

const useCurrentRouteStore = create((set) => ({
  current: ROUTES.HOME,
  setCurrent: (route) => set({ current: route })
}))

export default useCurrentRouteStore