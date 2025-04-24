import { create } from 'zustand'

let timeoutId

export const useMessageStore = create((set) => ({

  messages: [],
  showMessager: false,

  addMessage: (message) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    set(() => ({
      messages: [message]
    }))

    timeoutId = setTimeout(() => {
      set(() => ({
        messages: []
      }))
    }, 5000)
  },

  setShowMessager: (state) => {
    set(() => ({ showMessager: state }))
  }
}))