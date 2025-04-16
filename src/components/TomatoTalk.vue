<!-- TomataTalk | 番茄對話框 -->

<template>
  <div class="relative w-fit h-fit">
    <!-- 對話框 -->
    <div
      class="bg-[#fff9d1] rounded-lg px-3 py-2 shadow-md text-sm border border-yellow-300"
    >
      <p class="font-myfont text-black text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">{{ tomatoStore.currentTomato.dialogue }}</p>

      <!-- 尾巴朝右指向角色 -->
      <div
        class="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0
               border-y-[10px] border-y-transparent 
               border-l-[10px] border-l-[#fff9d1]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTomatoStore } from '@/store/useTomatoStore'

const tomatoStore = useTomatoStore()
</script>
