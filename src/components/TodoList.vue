<!-- TodoList | 代辦清單 -->
<template>
  <div class="w-full max-h-[400px] max-w-xl mx-auto">
    <p class="mb-2 text-xl text-white font-myfont">{{ todoStore.todos.length }} / 12</p>

    <!-- 新增任務 -->
    <div class="flex items-center gap-2 mb-4 max-h-24">
      <input
        v-model="newTask"
        type="text"
        placeholder="輸入新任務"
        class="flex-1 p-2 border rounded font-myfont outline-none"
      />
      <button @click="handleAddTask" class="p-2 bg-yellow-500 text-white rounded font-myfont hover:opacity-80 transition-opacity">
        <img src="/src/assets/plus-solid.svg" alt="新增任務" class="w-6 h-6" />
      </button>    </div>

    <!-- 任務列表 -->
    <ul class="space-y-2">
      <li
        v-for="(task, _) in todoStore.todos"
        :key="task.id"
        @click="handleSelect(task.id)"
        class="p-2 flex justify-between items-center rounded cursor-pointer transition"
        :class="[
          'bg-gray-100 hover:bg-yellow-100',
          { 'ring-2 ring-yellow-400': todoStore.focusedId === task.id }
        ]"
      >
      <span class="font-myfont ps-1" :class="{ 'line-through': task.completed }">
        {{ task.text }}
      </span>

      <div class="flex gap-2 items-center">
        <!-- 完成/恢復 -->
        <button @click.stop="todoStore.toggleComplete(task.id)" class="w-6 h-6 hover:opacity-80 transition-opacity" :title="task.completed ? '恢復' : '完成'">
          <img
            :src="task.completed ? '/src/assets/rotate-solid.svg' : '/src/assets/check-solid.svg'"
            alt="切換完成"
          />
        </button>

        <!-- 刪除 -->
        <button @click.stop="todoStore.deleteTodo(task.id)" class="w-5 h-6 ms-1 hover:opacity-70 transition-opacity" title="刪除">
          <img src="/src/assets/trash-can-solid.svg" alt="刪除任務" />
        </button>
      </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useTodoStore } from '@/store/useTodoStore'
import { useTimerStore } from '@/store/useTimerStore'

// 計時器狀態
const timerStore = useTimerStore()


const newTask = ref('')
const todoStore = useTodoStore()

onMounted(() => {
  todoStore.loadFromStorage()
})


function handleAddTask() {
  if (!newTask.value.trim()) return
  const ok = todoStore.addTodo(newTask.value.trim())
  if (!ok) {
    Swal.fire({
      icon: 'warning',
      iconColor: '#e5ae41',
      title: '任務已達上限',
      text: `最多只能有 12 筆任務喔！`,
      background: '#fff9d1',
      timer: 2000,
      confirmButtonText: '了解',
      confirmButtonColor: '#e5ae41',
      focusConfirm: false
    })
    return
  }
  newTask.value = ''
}


function handleSelect(id: string) {
const task = todoStore.todos.find((t: any) => t.id === id)

  // 🟥 任務已完成，不可切換
  if (task?.completed) {
    Swal.fire({
      icon: 'info',
      iconColor: '#e5ae41',
      title: '任務已完成',
      text: '該任務已完成，請選擇其他任務！',
      background: '#fff9d1',
      timer: 2000,
      confirmButtonText: '了解',
      confirmButtonColor: '#e5ae41',
      focusConfirm: false
    })
    return
  }

  // 🟡 播放中時不能切換
  const ok = todoStore.setFocused(id, !timerStore.isPaused)
  if (!ok) {
    Swal.fire({
      icon: 'info',
      iconColor: '#e5ae41',
      title: '無法切換任務',
      text: '請先暫停計時器，再切換任務喔！',
      background: '#fff9d1',
      timer: 2000,
      confirmButtonText: '了解',
      confirmButtonColor: '#e5ae41',
      focusConfirm: false
    })
    return
  }
}


</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
