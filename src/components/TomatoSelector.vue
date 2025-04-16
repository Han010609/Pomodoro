<!-- TomataSelector | 番茄選擇器 -->

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-[#fff9d1] rounded-lg p-5 overflow-y-auto max-h-[90vh] w-[320px] sm:w-[400px] relative">
      <h3 class="text-2xl mb-4 text-center font-myfont">選擇你的番茄角色</h3>
      <button
        @click="$emit('close')"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
        class="absolute top-5 right-6 w-6 h-6"
      >
      <img
        :src="isHover ? xmarkHover : xmark"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        alt="關閉"
      />
      </button>
      <div class="grid grid-cols-3 gap-3">
        <div
          v-for="char in filteredTomatos"
          :key="char.id"
          class="relative cursor-pointer border border-yellow-500 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400"
          @click="handleSelect(char)"
        >
          <!-- 圖片 -->
          <img
            :src="getTomatoImage(char.id, char.unlocked)"
            alt="角色"
            class="w-28 h-28 object-contain mx-auto"
            :class="{ 'opacity-40': !char.unlocked }"
          />

          <!-- 鎖頭 -->
          <div
            v-if="!char.unlocked"
            class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 text-3xl"
          >
            🔒
          </div>

          <!-- 名稱 -->
          <p class="mt-1 text-center text-sm text-gray-800">{{ char.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue'
import { useTomatoStore } from '@/store/useTomatoStore'
// 動態引入圖示
import { getTomatoImage } from '@/store/useTomatoStore'
import xmark from '@/assets/xmark-solid.svg'
import xmarkHover from '@/assets/xmark-solid-hover.svg'

const isHover = ref(false)



const emit = defineEmits(['close'])
const tomatoStore = useTomatoStore()

// 除去隱藏角色
const filteredTomatos = computed(() =>
  tomatoStore.tomatos.filter(t => t.id !== 'tomato-god')
)

function handleSelect(char: (typeof tomatoStore.tomatos)[number]) {
  if (!char.unlocked) {
    alert('尚未解鎖此角色！')
    return
  }

  tomatoStore.setTomato(char.id)
  emit('close')
}
</script>
