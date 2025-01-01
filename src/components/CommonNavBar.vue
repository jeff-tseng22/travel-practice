<template>
  <nav class="nav-container">
    <div class="nav-content">
      <router-link to="/" class="nav-brand">
        <TravelLogo />
      </router-link>
      
      <div class="nav-links">
        <router-link to="/group-tour" class="nav-link">團體旅遊</router-link>
        <router-link to="/free-tour" class="nav-link">自由行</router-link>
        <router-link to="/cruise-tour" class="nav-link">郵輪旅遊</router-link>
      </div>

      <div class="nav-actions">
        <a href="#" class="action-link">
          <i class="fas fa-user"></i>
          登入
        </a>
        <router-link to="/register" class="action-link">
          <i class="fas fa-user-plus"></i>
          註冊
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import TravelLogo from './TravelLogo.vue'
</script>

<style scoped>
.nav-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  padding: 8px 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3498db;
  transition: width 0.3s;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link:hover {
  color: #3498db;
}

.nav-actions {
  display: flex;
  gap: 20px;
}

.action-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-link:hover {
  color: #3498db;
}

.action-link i {
  font-size: 16px;
}

@media (max-width: 768px) {
  .nav-links {
    gap: 15px;
  }
  
  .nav-actions {
    gap: 10px;
  }
  
  .action-link span {
    display: none;
  }
}
</style> 