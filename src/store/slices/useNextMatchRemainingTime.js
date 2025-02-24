import { create } from 'zustand'

export const useNextMatchRemainingTime = create((set) => ({
  remaining: false,

  setRemainingTime: (state) => {
    set({ remaining: state })
  }
}))