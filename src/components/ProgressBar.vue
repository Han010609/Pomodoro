<!-- ProgressBar | 進度條 -->

<template>
  <div class="w-full bg-gray-300 rounded-full h-4">
    <div 
      class="h-4 rounded-full transition-all"
      :class="bgColor"
      :style="{ width: progressWidth + '%' }">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  remainingTime: number;
  totalTime: number;
}>();

const progressWidth = computed(() => (props.remainingTime / props.totalTime) * 100);

const bgColor = computed(() => {
  if (progressWidth.value > 50) return 'bg-blue-400';
  if (progressWidth.value > 20) return 'bg-yellow-500';
  return 'bg-red-500';
});
</script>

<style scoped>
.transition-all {
  transition: width 0.5s ease;
}
</style>
