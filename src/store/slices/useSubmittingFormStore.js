import { create } from 'zustand'

export const useSubmittingFormStore = create((set) => ({
  submittingForm: false,

  setSubmittingForm: (state) => {
    set({ submittingForm: state })
  }
}))