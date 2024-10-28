import { create } from 'zustand'

let timeoutId

export const useMessageStore = create((set) => ({

  messages: [],

  addMessage: (message) => {
    console.log(': message', message)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    set(() => ({
      messages: [message]
    }))

    // timeoutId = setTimeout(() => {
    //   set(() => ({
    //     messages: []
    //   }))
    // }, 15000)
  }

}))