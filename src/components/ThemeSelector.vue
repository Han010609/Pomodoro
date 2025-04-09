<!-- ThemeSelector | 主題選擇器 -->

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-4 rounded-lg">
      <h3 class="text-lg font-bold mb-2">選擇主題</h3>
      <div class="grid grid-cols-3 gap-2">
        <img
          v-for="index in 5"
          :key="index"
          :src="`/tomato/theme-${index - 1}.jpg`"
          @click="selectTheme(index - 1)"
          class="w-24 h-24 cursor-pointer border-2 border-gray-300 rounded-lg hover:border-blue-500"
          alt="主題圖片"
        />
      </div>
      <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-gray-300 rounded">關閉</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'select']);

const selectTheme = (index: number) => {
  emit('select', index);
};
</script>

<style scoped>
/* 基本樣式，之後可優化 */
</style>
