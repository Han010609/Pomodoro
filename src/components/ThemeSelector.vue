<!-- ThemeSelector | 主題選擇器 -->

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-[#fff9d1] p-5 rounded-lg relative">
      <h3 class="text-2xl mb-4 text-center font-myfont">選擇主題</h3>
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
        <img
          v-for="index in 5"
          :key="index"
          :src="`/tomato/theme-${index - 1}.jpg`"
          @click="selectTheme(index - 1)"
          class="w-32 h-32 relative cursor-pointer border border-yellow-500 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400"
          alt="主題圖片"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 動態引入圖示
import xmark from '@/assets/xmark-solid.svg'
import xmarkHover from '@/assets/xmark-solid-hover.svg'

const isHover = ref(false)

const emit = defineEmits(['close', 'select']);

const selectTheme = (index: number) => {
  emit('select', index);
};
</script>

<style scoped>
/* 基本樣式，之後可優化 */
</style>
