<!-- Timer | 計時器 -->

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h2 class="text-2xl font-bold mb-2">{{ isWork ? "工作中" : "休息中" }}</h2>
    <!-- 進度條 -->
    <div class="w-full bg-gray-300 rounded-full h-4 mb-2">
      <div :style="{ width: progressWidth }" 
          class="h-full rounded-full transition-all duration-1000"
          :class="[isWork ? 'bg-red-500' : 'bg-blue-500']">
      </div>
    </div>

    <p class="text-lg">剩餘時間：{{ displayTime }}</p>
    <div class="mt-2 space-x-2">
      <button v-if="isPaused" @click="toggleTimer" class="px-4 py-2 bg-green-500 text-white rounded">開始</button>
      <button v-else @click="toggleTimer" class="px-4 py-2 bg-red-500 text-white rounded">暫停</button>
      <button @click="confirmReset" class="px-4 py-2 bg-gray-500 text-white rounded">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed  } from 'vue';
import Swal from 'sweetalert2';

  // 開發環境 會以秒代替分鐘
  const isTestMode = import.meta.env.VITE_TEST_MODE === "true";
  const workTime = isTestMode ? 25 : 25 * 60; // 工作時間：25秒或25分鐘
  const breakTime = isTestMode ? 5 : 5 * 60;  // 休息時間：5秒或5分鐘

  // 測試用 記得刪
  console.log(`工作時間：${workTime} 秒`);
  console.log(`休息時間：${breakTime} 秒`);

  const isWork = ref(true); // true: 工作, false: 休息
  const timer = ref(workTime); // 初始為工作時間
  let interval: number | undefined;
  let isPaused = ref(true);

  // 計算剩餘時間
  const displayTime = computed(() => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  // 計算進度條寬度
  const progressWidth = computed(() => {
    console.log('Progress Width:', progressWidth.value);

    const totalTime = isWork.value ? workTime : breakTime;
    const width = (timer.value / totalTime) * 100;
    return width > 0 ? `${width}%` : '0%'; // 確保最小為 '0%'
  });


  // "開始"和"暫停"設定
  const startTimer = () => {
    if (interval) return; // 防止重複啟動
    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        switchMode();
      }
    }, 1000); // 每秒減少一次
  };

  const pauseTimer = () => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  };

  // 按鈕切換
  const toggleTimer = () => {
  if (isPaused.value) {
    startTimer();
  } else {
    pauseTimer();
  }
  isPaused.value = !isPaused.value; // 將 isPaused 切換
};



  // "重製"設定
  const resetTimer = () => {
    pauseTimer();
    timer.value = isWork.value ? workTime : breakTime;
    isPaused.value = true;
  };

  const confirmReset = () => {
  Swal.fire({
    title: '確定要重製計時器嗎？',
    text: '這將會重設目前計時！',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '是的，重製！',
    cancelButtonText: '取消',
  }).then((result) => {
    if (result.isConfirmed) {
      resetTimer();
      Swal.fire('已重製！', '計時器已重設。', 'success');
    }
  });
};

  const switchMode = () => {
    isWork.value = !isWork.value;
    timer.value = isWork.value ? workTime : breakTime;
    console.log(isWork.value ? "開始工作時間" : "開始休息時間");
    startTimer();
  };

</script>

<style scoped>
  h2 {
    font-size: 24px;
  }
  p {
    font-size: 18px;
  }
  button {
    margin: 5px;
    padding: 5px 10px;
  }
</style>
