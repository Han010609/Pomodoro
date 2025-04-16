// src/store/useTimerStore.ts
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    isPaused: true
  }),
  actions: {
    setPaused(value: boolean) {
      this.isPaused = value
    }
  }
})
