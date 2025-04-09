<!-- HomeView | 主畫面 -->

<template>
  <div class="home grid grid-cols-12">
    <!-- 左半邊區塊 -->
    <div class="col-span-5 p-4 flex flex-col items-center justify-center">
      <img 
        :src="currentTheme" 
        alt="主題圖片" 
        class="picture w-100 h-100 mb-4 border rounded-lg"
      />
      <button @click="showSelector = true" class="bg-blue-500 text-white px-4 py-2 rounded">編輯主題</button>
      <!-- 主題選擇元件 -->
      <ThemeSelector v-if="showSelector" @close="showSelector = false" @select="changeTheme" />
      <Timer />
    </div>
    <!-- 右半邊區塊 -->
    <div class="col-span-7 p-4 flex flex-col items-center">
      <TodoList />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Timer from '../components/Timer.vue';
import ThemeSelector from '../components/ThemeSelector.vue';
import TodoList from "../components/TodoList.vue";

const showSelector = ref(false);
const currentTheme = ref('/tomato/theme-0.jpg');

// 讀取本地存儲的主題
onMounted(() => {
  const storedTheme = localStorage.getItem('currentTheme');
  if (storedTheme) {
    currentTheme.value = storedTheme;
  }
});

// 切換主題
const changeTheme = (index: number) => {
  currentTheme.value = `/tomato/theme-${index}.jpg`;
  localStorage.setItem('currentTheme', currentTheme.value);
  showSelector.value = false;
};

</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
.picture{
  max-width: 500px;
  max-height: 500px;
}

button {
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #2563eb;
}
</style>
