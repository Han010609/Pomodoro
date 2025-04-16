// src/store/useTodoStore.ts

import { defineStore } from 'pinia'

const STORAGE_KEY = 'todoList'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  played: boolean
  duration: number // 剩餘秒數
  isWork: boolean  // 當前這筆剩餘時間是工作 or 休息
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
    addTodo(text: string): boolean {
      if (this.todos.length >= 12) return false
    
      this.todos.push({
        id: Date.now().toString(),
        text,
        completed: false,
        played: false,
        duration: 0,
        isWork: true
      })
    
      this.saveToStorage()
      return true
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
    setPlayed(id: string, duration: number, isWork: boolean) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.played = true
        todo.duration = duration
        todo.isWork = isWork
        this.saveToStorage()
      }
    },
    setFocused(id: string, isRunning: boolean): boolean {
      const todo = this.todos.find(t => t.id === id)
      if (!todo || todo.completed) return false
      if (isRunning) return false
    
      this.focusedId = id
      return true
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
