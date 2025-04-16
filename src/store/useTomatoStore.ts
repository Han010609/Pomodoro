// useTomatoStore.ts

import { defineStore } from 'pinia'

const STORAGE_KEY = 'currentTomatoId'

export const useTomatoStore = defineStore('tomato', {
  state: () => ({
    tomatos: [
      {
        id: 'tomato-god',
        name: '???',
        dialogue: '歡迎來到番茄鐘的世界！',
        unlocked: true
      },
      {
        id: 'tomato-0',
        name: '震驚我茄生番茄',
        dialogue: '居然有番茄鐘這麼好用的工具！',
        unlocked: true
      },
      {
        id: 'tomato-1',
        name: '勤奮番茄',
        dialogue: '一起衝刺！別放棄！',
        unlocked: true
      },
      {
        id: 'tomato-2',
        name: '看透一切番茄',
        dialogue: '嗯...先撐住吧...',
        unlocked: true
      },
      {
        id: 'tomato-3',
        name: '容光煥發番茄',
        dialogue: '今天也很努力唷～',
        unlocked: true
      },
      {
        id: 'tomato-4',
        name: '我不是茄子番茄',
        dialogue: '呃...嗯...加...加油！',
        unlocked: true
      },
      {
        id: 'tomato-5',
        name: '萬事通番茄',
        dialogue: '您今天真好看呢！',
        unlocked: true
      },
      {
        id: 'tomato-6',
        name: '偷懶成性番茄',
        dialogue: '唉...再一下下...',
        unlocked: true
      },
      {
        id: 'tomato-7',
        name: '不可一世番茄',
        dialogue: '吼！這題寫完讓我玩電腦啦！',
        unlocked: true
      },
      {
        id: 'tomato-8',
        name: '不良歡茄',
        dialogue: '你給我卡認真一點ㄟ！',
        unlocked: true
      },
      {
        id: 'tomato-9',
        name: '番茄鐘之神',
        dialogue: '你已經是時間管理大師。',
        unlocked: true
      }
    ],
    currentTomatoId: localStorage.getItem(STORAGE_KEY) || 'tomato-god'
  }),


  getters: {
    currentTomato(state): TomatoWithImage {
      const tomato = state.tomatos.find(t => t.id === state.currentTomatoId)!
      return {
        ...tomato,
        image: getTomatoImage(tomato.id, tomato.unlocked)
      }
    }
  },

  actions: {
    setTomato(id: string) {
      this.currentTomatoId = id
      localStorage.setItem(STORAGE_KEY, id)
    },
    unlockTomato(id: string) {
      const t = this.tomatos.find(t => t.id === id)
      if (t) t.unlocked = true
    }
  }
})

export function getTomatoImage(id: string, unlocked: boolean): string {
  console.log('🚨 getTomatoImage() 被呼叫了，id:', id, 'unlocked:', unlocked)


  const index = id.split('-')[1]

  const filename =
    id === 'tomato-god'
      ? 'tomato-god.png'
      : `tomato-${index}${unlocked ? '' : '-locked'}.png`

    return new URL(`../assets/tomato/${filename}`, import.meta.url).href
    }

interface TomatoWithImage {
  id: string
  name: string
  dialogue: string
  unlocked: boolean
  image: string
}