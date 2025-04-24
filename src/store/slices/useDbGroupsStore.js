import { create } from 'zustand'

export const useDbGroupsStore = create((set, get) => ({
  dbGroups: [],

  setDbGroups: (dbGroups) => {
    set({ dbGroups })
  }
}))