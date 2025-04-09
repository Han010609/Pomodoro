<!-- TodoList | 代辦清單 -->
<template>
  <div class="w-full max-w-xl mx-auto">
    <!-- 新增任務 -->
    <div class="flex items-center gap-2 mb-4">
      <input v-model="newTask" type="text" placeholder="輸入新任務" class="flex-1 p-2 border rounded" />
      <button @click="addTask" class="p-2 bg-blue-500 text-white rounded">新增</button>
    </div>

    <!-- 任務列表 -->
    <ul class="space-y-2">
      <li v-for="(task, index) in tasks" :key="index" class="p-2 flex justify-between items-center bg-gray-100 rounded">
        <span :class="{ 'line-through': task.completed }">{{ task.text }}</span>
        <div class="flex gap-2">
          <button @click="toggleComplete(index)" class="text-green-500">{{ task.completed ? '恢復' : '完成' }}</button>
          <button @click="removeTask(index)" class="text-red-500">刪除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newTask = ref('');
const tasks = ref<{ text: string, completed: boolean }[]>([]);

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({ text: newTask.value, completed: false });
    newTask.value = '';
  }
};

const toggleComplete = (index: number) => {
  tasks.value[index].completed = !tasks.value[index].completed;
};

const removeTask = (index: number) => {
  tasks.value.splice(index, 1);
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
