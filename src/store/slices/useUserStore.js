import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => {
        set({ user })
      },

      clearUser: () => {
        set({ user: null })
      },

      isAdmin: () => {
        const user = get().user
        return user?.role === 'admin'
      },

      isSuperAdmin: () => {
        const user = get().user
        return user?.role === 'superadmin'
      }
    }),
    {
      name: 'user',
      partialize: (state) => ({ user: state.user })
    }
  )
)