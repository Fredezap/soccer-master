import { create } from 'zustand'

let timeoutId

export const useMessageStore = create((set) => ({

  messages: [],
  showMessager: false,

  addMessage: (message) => {
    console.log('MESSAGES: ', message)
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
    }, 27000)
  },

  setShowMessager: (state) => {
    set(() => ({ showMessager: state }))
  }
}))