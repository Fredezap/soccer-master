import { create } from 'zustand'

export const useCustomErrorStore = create((set) => ({
  customError: null,

  setCustomError: (customError) => {
    set({ customError })
  }
}))