import { create } from 'zustand'

export const useSubmittingFormStore = create((set) => ({
  submittingForm: false,

  setSubmittingForm: (state) => {
    console.log('submitting state', state)
    set({ submittingForm: state })
  }
}))