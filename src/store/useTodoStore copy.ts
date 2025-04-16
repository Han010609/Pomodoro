// src/store/useTodoStore.ts

import { defineStore } from 'pinia'

const STORAGE_KEY = 'todoList'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  played: boolean
  duration: number // 秒數
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as TodoItem[],
    focusedId: null as string | null
  }),
  actions: {
    loadFromStorage() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        this.todos = JSON.parse(saved)
      }
    },
    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(text: string) {
      if (this.todos.length >= 12) return
      const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
        played: false,
        duration: 0
      }
      this.todos.push(newTodo)
      this.saveToStorage()
    },
    toggleComplete(id: string) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
        this.saveToStorage()
      }
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter(t => t.id !== id)
      if (this.focusedId === id) {
        this.focusedId = null
      }
      this.saveToStorage()
    },
    // setPlayed(id: string, duration: number) {
    //   const todo = this.todos.find(t => t.id === id)
    //   if (todo) {
    //     todo.played = true
    //     todo.duration = duration
    //     this.saveToStorage()
    //   }
    // },
    setPlayed(id: string, remaining: number) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.played = true
        todo.duration = remaining
        this.saveToStorage()
      }
    },
    setFocused(id: string) {
      this.focusedId = id
    },
    clearFocused() {
      this.focusedId = null
    },
    getFocusedTodo() {
      return this.todos.find(t => t.id === this.focusedId) || null
    },
    nextUnfinished() {
      const currentIndex = this.todos.findIndex(t => t.id === this.focusedId)
      const next = this.todos.slice(currentIndex + 1).find(t => !t.completed)
      if (next) {
        this.focusedId = next.id
      } else {
        this.focusedId = null
      }
    },

    
  }
})
