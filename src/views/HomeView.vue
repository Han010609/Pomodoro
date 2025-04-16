<!-- HomeView | 主畫面 -->

<template>
  <div class="home grid grid-cols-12 h-full">
    <!-- 左半邊區塊 -->
    <div class="col-span-5 flex flex-col items-center justify-center">
      <div class="relative h-full">
        <img 
          :src="currentTheme" 
          alt="主題圖片" 
          class="picture w-full h-auto mb-4 rounded-lg"
        />
        <!-- 按鈕改成絕對定位 -->
        <button @click="showThemeSelector = true" class="absolute top-2 right-2 p-1"><img src="/src/assets/change-theme.svg" alt="更換主題" class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11"></button>
        <ThemeSelector v-if="showThemeSelector" @close="showThemeSelector = false" @select="changeTheme" />
        <Timer />
      </div>
      <!-- 主題選擇元件 -->

    </div>
    <!-- 右半邊區塊 -->
      <div class="col-span-7 flex flex-col h-full">
        <div class="flex-[7] max-h-[500px] overflow-hidden">
          <div class="h-full p-4 overflow-y-auto ">
            <TodoList />
          </div>
        </div>
        <div class="flex-[5] max-h-[300px] overflow-hidden flex items-center justify-end">
          <div>
            <TomatoTalk />
          </div>
          <div class="relative h-full">
          <img :src="tomatoStore.currentTomato.image" class="h-full w-auto" />
          <button @click="showTomatoSelector = true" class="absolute top-2 right-2 p-1">
            <img src="/src/assets/change-role.svg" alt="更換角色" class="w-8 h-8 lg:w-10 lg:h-10" />
          </button>
          <TomatoSelector v-if="showTomatoSelector" @close="showTomatoSelector = false" />
        </div>
        </div>
      </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Timer from '../components/Timer.vue';
import ThemeSelector from '../components/ThemeSelector.vue';
import TodoList from "../components/TodoList.vue";
import TomatoSelector from "../components/TomatoSelector.vue";
import TomatoTalk from '../components/TomatoTalk.vue'
import { useTomatoStore } from '@/store/useTomatoStore'



const showThemeSelector = ref(false);
const showTomatoSelector = ref(false);
const currentTheme = ref('/tomato/theme-0.jpg');
const tomatoStore = useTomatoStore()

// const currentTomato = ref('')

// 從 localStorage 載入
onMounted(() => {
  const storedTheme = localStorage.getItem('currentTheme');
  if (storedTheme) {
    currentTheme.value = storedTheme;
  }

  // 第一次使用：若還沒選角色，套用預設神角
  if (!tomatoStore.currentTomatoId) {
    tomatoStore.setTomato('tomato-god')
  }
})

// 切換主題
const changeTheme = (index: number) => {
  currentTheme.value = `/tomato/theme-${index}.jpg`;
  localStorage.setItem('currentTheme', currentTheme.value);
  showThemeSelector.value = false;
};
</script>

<style scoped>
.home {
  padding-top: 20px;
  height: 100%;
  text-align: center;
}
.picture{
  max-width: 500px;
  max-height: 500px;
}
button {
  transition: background-color 0.3s ease;
  opacity: 0.7;
}
button:hover {
 opacity: 1;
}
</style>
