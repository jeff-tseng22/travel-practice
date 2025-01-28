<template>
  <div class="logo-container">
    <div class="logo-icon">
      <i class="fa-solid fa-plane"></i>
    </div>
    <div class="logo-text">
      <span class="brand-name">快樂旅遊</span>
      <span class="brand-slogan">探索世界的美好</span>
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 32px;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.logo-icon i {
  font-weight: 900;
  transform: rotate(-45deg);
}

.logo-container:hover .logo-icon {
  transform: translateY(-2px);
  background: rgba(52, 152, 219, 0.2);
}

.logo-container:hover .logo-icon i {
  transform: rotate(-45deg) scale(1.1);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.brand-slogan {
  font-size: 12px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .brand-slogan {
    display: none;
  }
  
  .logo-icon {
    font-size: 24px;
    width: 36px;
    height: 36px;
  }
  
  .brand-name {
    font-size: 18px;
  }
}
</style> 