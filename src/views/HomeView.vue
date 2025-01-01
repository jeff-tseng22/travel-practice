<template>
  <div class="home">
    <ImageCarousel class="full-width-section" />
    <FlagMarquee class="full-width-section" />
    <div class="full-width-section content-section">
      <div class="content-wrapper">
        <section class="destinations">
          <div v-for="dest in destinations" :key="dest.id" class="destination-card">
            <img :src="dest.image" :alt="dest.title">
            <div class="card-content">
              <h2>{{ dest.title }}</h2>
              <p>{{ dest.description }}</p>
              <div class="tour-items">
                <div class="tour-item">
                  <span class="price">{{ dest.price }} 起</span>
                  <span class="duration">{{ dest.duration }}</span>
                </div>
                <router-link to="/group-tour" class="view-more">查看更多 ></router-link>
              </div>
            </div>
          </div>
        </section>

        <section class="countdown-section">
          <div class="countdown-container">
            <div class="countdown-card">
              <h2>2025 跨年倒數</h2>
              <div class="countdown-timer">
                <div class="time-block">
                  <span class="number">{{ countdowns.newYear.days }}</span>
                  <span class="label">天</span>
                </div>
                <div class="time-block">
                  <span class="number">{{ countdowns.newYear.hours }}</span>
                  <span class="label">時</span>
                </div>
                <div class="time-block">
                  <span class="number">{{ countdowns.newYear.minutes }}</span>
                  <span class="label">分</span>
                </div>
                <div class="time-block">
                  <span class="number">{{ countdowns.newYear.seconds }}</span>
                  <span class="label">秒</span>
                </div>
              </div>
              <router-link to="/new-year" class="countdown-link">查看跨年行程</router-link>
            </div>

            <div class="countdown-card">
              <h2>春節優惠倒數</h2>
              <div class="countdown-timer">
                <div class="time-block">
                  <span class="number">{{ countdowns.promotion.days }}</span>
                  <span class="label">天</span>
                </div>
                <div class="time-block">
                  <span class="number">{{ countdowns.promotion.hours }}</span>
                  <span class="label">時</span>
                </div>
                <div class="time-block">
                  <span class="number">{{ countdowns.promotion.minutes }}</span>
                  <span class="label">分</span>
                </div>
                <div class="time-block">
                  <span class="number">{{ countdowns.promotion.seconds }}</span>
                  <span class="label">秒</span>
                </div>
              </div>
              <router-link to="/lunar-new-year" class="countdown-link">搶購春節優惠</router-link>
            </div>
          </div>
        </section>

        <section class="luxury-tours">
          <h2 class="section-title">豪華行程推薦</h2>
          <div class="luxury-container">
            <div v-for="tour in luxuryTours" :key="tour.id" class="luxury-card">
              <div class="luxury-image">
                <img :src="tour.image" :alt="tour.title">
                <div class="luxury-badge">{{ tour.badge }}</div>
              </div>
              <div class="luxury-content">
                <h3>{{ tour.title }}</h3>
                <p class="luxury-description">{{ tour.description }}</p>
                <div class="luxury-features">
                  <span v-for="feature in tour.features" :key="feature" class="feature-tag">
                    {{ feature }}
                  </span>
                </div>
                <div class="luxury-footer">
                  <div class="luxury-price">
                    <span class="price-label">優惠價</span>
                    <span class="price-value">{{ tour.price }}</span>
                  </div>
                  <router-link :to="tour.link" class="luxury-button">立即預訂</router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import FlagMarquee from '@/components/FlagMarquee.vue'

const destinations = [
  {
    id: 1,
    title: '日本行程',
    description: '探索日本文化與美食的完美旅程',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    price: 'NT$ 45,000',
    duration: '5天4夜'
  },
  {
    id: 2,
    title: '韓國行程',
    description: '體驗韓流文化與美食的精彩之旅',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800',
    price: 'NT$ 38,000',
    duration: '5天4夜'
  },
  {
    id: 3,
    title: '東南亞行程',
    description: '探索熱帶風情與異國文化',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    price: 'NT$ 32,000',
    duration: '5天4夜'
  }
]

const countdowns = ref({
  newYear: {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  },
  promotion: {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  }
})

const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now
  
  if (distance < 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
    seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')
  }
}

let timer: number

const updateCountdowns = () => {
  const newYearDate = new Date('2025-01-01T00:00:00')
  const lunarNewYearDate = new Date('2025-01-29T00:00:00')

  countdowns.value.newYear = calculateTimeLeft(newYearDate)
  countdowns.value.promotion = calculateTimeLeft(lunarNewYearDate)
}

onMounted(() => {
  updateCountdowns()
  timer = window.setInterval(updateCountdowns, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const luxuryTours = [
  {
    id: 1,
    title: '日本奢華溫泉之旅',
    description: '入住日本頂級溫泉旅館，體驗米其林星級美食，專車接送服務',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800',
    badge: '頂級奢華',
    features: ['米其林餐廳', '私人溫泉', '5星酒店', '專車接送'],
    price: 'NT$ 168,000',
    link: '/luxury/japan'
  },
  {
    id: 2,
    title: '馬爾地夫水上villa',
    description: '入住頂級水上別墅，專屬管家服務，無邊際泳池，私人海灘',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
    badge: '蜜月首選',
    features: ['水上別墅', '私人管家', '無邊際泳池', '私人海灘'],
    price: 'NT$ 228,000',
    link: '/luxury/maldives'
  },
  {
    id: 3,
    title: '歐洲古堡巡禮',
    description: '入住真實古堡酒店，米其林饗宴，私人導覽，豪華轎車接送',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800',
    badge: '限量特製',
    features: ['古堡住宿', '米其林美食', '私人導覽', '豪華轎車'],
    price: 'NT$ 198,000',
    link: '/luxury/europe'
  }
]
</script>

<style scoped>
.home {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-section {
  background-color: #f8f9fa;
  padding: 40px 0;
  width: 100%;
}

.destinations {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.destination-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.destination-card:hover {
  transform: translateY(-5px);
}

.destination-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.card-content p {
  color: #666;
  margin-bottom: 20px;
}

.tour-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tour-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
}

.duration {
  font-size: 14px;
  color: #666;
}

.view-more {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.view-more:hover {
  color: #2980b9;
}

@media (max-width: 1024px) {
  .destinations {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .destinations {
    grid-template-columns: 1fr;
  }
  
  .destination-card img {
    height: 180px;
  }
}

.countdown-section {
  margin-top: 60px;
  padding: 0 20px;
}

.countdown-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.countdown-card {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.countdown-card h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: white;
}

.countdown-timer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.number {
  font-size: 36px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 8px;
  min-width: 80px;
}

.label {
  margin-top: 8px;
  font-size: 14px;
}

.countdown-link {
  display: inline-block;
  background: white;
  color: #2c3e50;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.countdown-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
  .countdown-container {
    grid-template-columns: 1fr;
  }
  
  .time-block {
    min-width: 60px;
  }
  
  .number {
    font-size: 28px;
    min-width: 60px;
  }
}

@media (max-width: 640px) {
  .countdown-timer {
    gap: 10px;
  }
  
  .time-block {
    min-width: 50px;
  }
  
  .number {
    font-size: 24px;
    min-width: 50px;
    padding: 8px;
  }
  
  .countdown-card h2 {
    font-size: 24px;
  }
}

.luxury-tours {
  margin-top: 60px;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 40px;
}

.luxury-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.luxury-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.luxury-card:hover {
  transform: translateY(-5px);
}

.luxury-image {
  position: relative;
  height: 250px;
}

.luxury-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.luxury-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.luxury-content {
  padding: 25px;
}

.luxury-content h3 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.luxury-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.luxury-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.feature-tag {
  background: #f8f9fa;
  color: #2c3e50;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
}

.luxury-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.luxury-price {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 14px;
  color: #666;
}

.price-value {
  font-size: 24px;
  font-weight: bold;
  color: #e74c3c;
}

.luxury-button {
  background: #2c3e50;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.luxury-button:hover {
  background: #3498db;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .luxury-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .luxury-container {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .luxury-image {
    height: 200px;
  }
}

:deep(.carousel-container),
:deep(.flag-marquee-container) {
  width: 100%;
}
</style>
