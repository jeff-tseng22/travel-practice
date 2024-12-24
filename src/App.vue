<template>
  <CommonNavBar />
  <main class="main-content">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import CommonNavBar from './components/CommonNavBar.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.main-content {
  margin-top: 100px; /* 調整這個值以匹配導航欄的實際高度 */
  min-height: calc(100vh - 100px);
}
</style>
