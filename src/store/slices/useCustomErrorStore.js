import { create } from 'zustand'

export const useCustomErrorStore = create((set) => ({
  customError: null,

  setCustomError: (customError) => {
    set({ customError }) // Actualiza el estado con un objeto que contiene customError
  }
}))