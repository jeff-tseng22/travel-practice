<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div class="carousel-slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-slide">
          <img :src="slide.image" :alt="slide.title">
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
            <router-link :to="slide.link" class="slide-button">
              立即查看
              <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div class="carousel-indicators">
      <button 
        v-for="(slide, index) in slides" 
        :key="index"
        :class="['indicator', { active: currentIndex === index }]"
        @click="setSlide(index)"
      ></button>
    </div>
    
    <button class="carousel-control prev" @click="prevSlide">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button class="carousel-control next" @click="nextSlide">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    title: '日本櫻花季限定',
    description: '體驗浪漫櫻花季，漫遊日本各大賞櫻勝地',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920',
    link: '/group-tour'
  },
  {
    title: '峇里島奢華假期',
    description: '入住五星級度假村，享受私人泳池與SPA',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920',
    link: '/free-tour'
  },
  {
    title: '地中海郵輪之旅',
    description: '探索歐洲古文明，體驗奢華海上假期',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920',
    link: '/cruise-tour'
  },
  {
    title: '北歐極光探索',
    description: '追尋夢幻極光，體驗冰雪奇緣',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920',
    link: '/group-tour'
  }
]

const currentIndex = ref(0)
const autoPlayInterval = ref<number | null>(null)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const setSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoPlay = () => {
  autoPlayInterval.value = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slides {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  max-width: 500px;
}

.slide-content h2 {
  font-size: 48px;
  margin-bottom: 20px;
}

.slide-content p {
  font-size: 24px;
  margin-bottom: 30px;
}

.slide-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 18px;
  transition: background 0.3s;
}

.slide-button:hover {
  background: #2980b9;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background 0.3s;
}

.carousel-control:hover {
  background: rgba(0,0,0,0.8);
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.indicator.active {
  background: white;
}

@media (max-width: 768px) {
  .carousel-container {
    height: 400px;
  }

  .slide-content {
    left: 5%;
    right: 5%;
    text-align: center;
  }

  .slide-content h2 {
    font-size: 32px;
  }

  .slide-content p {
    font-size: 18px;
  }
}
</style> 