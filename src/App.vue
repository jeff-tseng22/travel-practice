<template>
  <div class="app-container">
    <CommonNavBar />
    <main class="main-content">
      <router-view />
    </main>
    <CommonFooter />
  </div>
</template>

<script setup lang="ts">
  import CommonNavBar from './components/CommonNavBar.vue'
  import CommonFooter from './components/CommonFooter.vue'
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #app {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  .main-content {
    margin-top: 60px;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  /* 全局滿版樣式 */
  .full-width-section {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
  }

  .content-wrapper {
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
  }
</style>
