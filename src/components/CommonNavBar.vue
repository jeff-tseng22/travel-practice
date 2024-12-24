<template>
  <div class="nav-container">
    <!-- 反詐騙提醒 -->
    <div class="anti-fraud-alert">
      <strong>反詐騙提醒：</strong>
      請注意保護個人資訊，謹防詐騙。任何要求透過私人帳戶轉帳的行為都可能是詐騙。
    </div>
    
    <!-- 导航栏 -->
    <nav class="main-nav">
      <div class="nav-content">
        <router-link to="/group-tour">團體旅遊</router-link>
        <router-link to="/free-tour">自由行</router-link>
        <router-link to="/flight">機票</router-link>
        <router-link to="/hotel">訂房</router-link>
        <router-link to="/cruise">全球郵輪</router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.nav-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.anti-fraud-alert {
  width: 100%;
  background-color: #fff3cd;
  color: #856404;
  padding: 10px 0;
  text-align: center;
}

.main-nav {
  width: 100%;
  background-color: #f8f9fa;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.main-nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.main-nav a:hover {
  color: #007bff;
}
</style> 