<template>
  <div class="flag-marquee-container">
    <div class="flags-wrapper">
      <!-- 重複兩次確保無縫滾動 -->
      <div class="flags-track">
        <div class="flag-item" v-for="flag in [...flags, ...flags]" :key="flag.id + flag.code">
          <img :src="flag.image" :alt="flag.country" @error="handleImageError">
          <span class="country-name">{{ flag.country }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://flagsapi.com/' + img.alt + '/flat/64.png'
}

const flags = [
  { id: 1, country: '日本', image: 'https://flagsapi.com/JP/flat/64.png', code: 'JP' },
  { id: 2, country: '韓國', image: 'https://flagsapi.com/KR/flat/64.png', code: 'KR' },
  { id: 3, country: '泰國', image: 'https://flagsapi.com/TH/flat/64.png', code: 'TH' },
  { id: 4, country: '新加坡', image: 'https://flagsapi.com/SG/flat/64.png', code: 'SG' },
  { id: 5, country: '澳洲', image: 'https://flagsapi.com/AU/flat/64.png', code: 'AU' },
  { id: 6, country: '美國', image: 'https://flagsapi.com/US/flat/64.png', code: 'US' },
  { id: 7, country: '英國', image: 'https://flagsapi.com/GB/flat/64.png', code: 'GB' },
  { id: 8, country: '法國', image: 'https://flagsapi.com/FR/flat/64.png', code: 'FR' },
  { id: 9, country: '義大利', image: 'https://flagsapi.com/IT/flat/64.png', code: 'IT' },
  { id: 10, country: '德國', image: 'https://flagsapi.com/DE/flat/64.png', code: 'DE' },
]
</script>

<style scoped>
.flag-marquee-container {
  width: 100%;
  background: #f8f9fa;
  padding: 20px 0;
  margin: 0;
  overflow: hidden;
}

.flags-wrapper {
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.flags-track {
  display: flex;
  gap: 40px;
  animation: scroll 30s linear infinite;
  padding: 0 20px;
}

.flag-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  transition: transform 0.3s ease;
}

.flag-item:hover {
  transform: translateY(-5px);
  animation-play-state: paused;
}

.flag-item img {
  width: 64px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 8px;
  border: 1px solid #ddd;
}

.country-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 當滑鼠懸停在容器上時暫停動畫 */
.flags-wrapper:hover .flags-track {
  animation-play-state: paused;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .flags-track {
    gap: 30px;
  }
  
  .flag-item img {
    width: 48px;
    height: 36px;
  }
  
  .country-name {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .flags-track {
    gap: 20px;
  }
}
</style> 