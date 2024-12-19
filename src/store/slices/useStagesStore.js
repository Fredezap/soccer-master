import { create } from 'zustand'

export const useStagesStore = create((set, get) => ({
  stages: [],

  setStages: (stages) => {
    set({ stages })
  }
}))