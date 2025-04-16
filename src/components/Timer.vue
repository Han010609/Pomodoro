<!-- Timer | 計時器 -->

<template>
  <div class="flex flex-col items-center justify-center p-2">
    <h2 class="text-2xl font-myfont mb-2">{{ isWork ? "工作中" : "休息中" }}</h2>
    <h3 class="text-xl font-myfont mb-2">
      {{ focusedTodo ? focusedTodo.text : '目前尚未選擇任務' }}
    </h3>


    <!-- 進度條 -->
    <ProgressBar :remainingTime="timer" :totalTime="isWork ? workTime : breakTime" />

    <!-- 顯示剩餘時間 -->
    <p class="text-xl font-myfont">剩餘時間：{{ displayTime }}</p>
    <div class="flex space-x-2">        
      <!-- 開始或暫停按鈕 -->
      <div class="w-full max-w-[80px]">
        <img 
          v-if="timerStore.isPaused" 
          @click="toggleTimer" 
          src="@/assets/tomato/start.png" 
          alt="開始" 
          class="w-full h-auto cursor-pointer" />
        <img 
          v-else 
          @click="toggleTimer" 
          src="@/assets/tomato/pause.png" 
          alt="暫停" 
          class="w-full h-auto cursor-pointer" />
      </div>
      <!-- 重置按鈕 -->
      <div class="w-full max-w-[80px]">
        <img 
          @click="confirmReset" 
          src="@/assets/tomato/reset.png" 
          alt="重置" 
          class="w-full h-auto cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed  } from 'vue';
import ProgressBar from './ProgressBar.vue';
import Swal from 'sweetalert2';
import { useTodoStore } from '@/store/useTodoStore'
import { useTimerStore } from '@/store/useTimerStore'

  // 計時器狀態
  const timerStore = useTimerStore()



  // 時間狀態(儲存時間在localStorage)
  const todoStore = useTodoStore()

  function onTimerEnd() {
    const focused = todoStore.getFocusedTodo()
    if (focused) {
      todoStore.setPlayed(focused.id, workDuration.value) // workDuration 是播放秒數
      todoStore.toggleComplete(focused.id)
      todoStore.nextUnfinished()
    }

    if (todoStore.focusedId) {
      // 延遲1秒播放下一筆（避免過快）
      setTimeout(() => {
        startTimer() // 再次啟動 Timer
      }, 1000)
    }
  }

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


  // 當前任務 (監聽 focusedTodo)
  const focusedTodo = computed(() => todoStore.getFocusedTodo())

  watch(focusedTodo, (newTodo, oldTodo) => {
  if (interval && oldTodo && newTodo && oldTodo.id !== newTodo.id) {
    Swal.fire({
        icon: 'success',
        iconColor: '#e5ae41',
        title: '任務已完成',
        background: '#fff9d1',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
        customClass: {
          popup: 'swal-toast-offset'
        }   
      })
  }

  if (oldTodo) {
    todoStore.setPlayed(oldTodo.id, timer.value, isWork.value)
  }


    pauseTimer() // 停下來

  // 重設為新任務的剩餘時間
  if (newTodo) {
  isWork.value = newTodo.isWork ?? true
  timer.value = newTodo.duration > 0 ? newTodo.duration : (isWork.value ? workTime : breakTime)
  timerStore.setPaused(true)
}
})

  // 計算剩餘時間
  const displayTime = computed(() => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  // "開始"和"暫停"設定
  const startTimer = () => {
    if (interval) return; // 防止重複啟動
    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
        if (focusedTodo.value) {
          todoStore.setPlayed(focusedTodo.value.id, timer.value)
        }
      } else {
        switchMode()
      }
    }, 1000)
  };

  const pauseTimer = () => {
  if (interval) {
    clearInterval(interval)
    interval = undefined
    if (focusedTodo.value) {
      todoStore.setPlayed(focusedTodo.value.id, timer.value, isWork.value)
    }
  }
}

  // 按鈕切換
  const toggleTimer = () => {
  if (timerStore.isPaused) {
    // ✅ 播放前先判斷是否有選擇任務
    if (!focusedTodo.value) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#e5ae41',
        background: '#fff9d1',
        title: '尚未選擇任務',
        text: '是否仍要繼續番茄鐘？',
        showCancelButton: true,
        confirmButtonText: '繼續',
        confirmButtonColor: '#e5ae41',
        focusConfirm: false,
        cancelButtonText: '取消',
        cancelButtonColor: '#807871',
      }).then((result) => {
        if (result.isConfirmed) {
          startTimer()
          timerStore.setPaused(false)
        }
      })
      return // ⛔ 阻止直接播放
    }

    startTimer()
  } else {
    pauseTimer()
  }

  timerStore.setPaused(!timerStore.isPaused)
}


  // "重製"設定
  const resetTimer = () => {
  pauseTimer()

  isWork.value = true // ✅ 強制重設為「工作中」
  timer.value = workTime
  timerStore.setPaused(true)

  if (focusedTodo.value) {
    todoStore.setPlayed(focusedTodo.value.id, timer.value, isWork.value)
  }
}


//   const resetTimer = () => {
//   pauseTimer()
//   timer.value = isWork.value ? workTime : breakTime
//   isPaused.value = true

//   if (focusedTodo.value) {
//     todoStore.setPlayed(focusedTodo.value.id, timer.value)
//   }
// }

  const confirmReset = () => {
  Swal.fire({
    icon: 'warning',
    iconColor: '#e5ae41',
    title: '重新計時',
    text: '確認後將重設番茄鐘！',
    background: '#fff9d1',
    showCancelButton: true,
    confirmButtonText: '重製',
    confirmButtonColor: '#e5ae41',
    focusConfirm: false,
    cancelButtonText: '取消',
    cancelButtonColor: '#807871',
  }).then((result) => {
    if (result.isConfirmed) {
      resetTimer();
      Swal.fire({
        icon: 'success',
        iconColor: '#e5ae41',
        title: '已重新計時',
        background: '#fff9d1',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
        customClass: {
          popup: 'swal-toast-offset'
        }   
      })
    }
  });
};

const switchMode = () => {
  if (!isWork.value) {
    // 剛完成休息 → 準備下一筆任務
    const focused = todoStore.getFocusedTodo()
    if (focused) {
      todoStore.setPlayed(focused.id, workTime)
      todoStore.toggleComplete(focused.id)
      todoStore.nextUnfinished()
    }

    if (todoStore.focusedId) {
      // 下一筆任務存在 → 自動切換為工作並繼續
      isWork.value = true
      timer.value = workTime
      console.log("自動播放下一筆任務")
      return startTimer()
    } else {
      console.log("無下一筆任務")
      return pauseTimer()
    }
  }

  // 正常工作 → 轉休息
  isWork.value = !isWork.value
  timer.value = isWork.value ? workTime : breakTime
  startTimer()
}


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
