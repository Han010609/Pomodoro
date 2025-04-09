<template>
  <div id="app" class="bg-background min-h-screen flex flex-col">
    <header class="bg-primary text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <h1 class="text-2xl font-bold">Pomodoro Clock</h1>
        <div>
          <router-link to="/" class="mr-4">Home</router-link>
          <router-link to="/analytics" class="mr-4">Analytics</router-link>
          <router-link to="/ringtones" class="mr-4">Ringtones</router-link>
          <router-link to="/login">Login</router-link>
        </div>
      </nav>
    </header>
    <main class="flex-1 p-4">
      <router-view />
    </main>
    <footer class="bg-primary text-white p-4 text-center">
      © 2025 Pomodoro Clock
    </footer>
  </div>
</template>

<script setup lang="ts">
console.log("VITE_TEST_MODE:", import.meta.env.VITE_TEST_MODE);

const isTestMode = import.meta.env.VITE_TEST_MODE === "true";
console.log("測試模式：", isTestMode);
</script>

<style>
@import '@/styles/tailwind.css';

#app {
  font-family: "Noto Sans TC", sans-serif;
}
</style>
