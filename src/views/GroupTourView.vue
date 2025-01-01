<template>
  <div class="group-tour">
    <div class="hero-section">
      <h1>團體旅遊行程</h1>
      <p>精選各地熱門行程，專業導遊帶團，舒適安全有保障</p>
    </div>

    <div class="content-wrapper">
      <!-- 篩選器 -->
      <div class="filter-section">
        <div class="filter-group">
          <label>目的地</label>
          <select v-model="selectedRegion">
            <option value="">全部地區</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>價格範圍</label>
          <select v-model="selectedPrice">
            <option value="">不限金額</option>
            <option value="0-30000">3萬以下</option>
            <option value="30000-50000">3-5萬</option>
            <option value="50000-100000">5-10萬</option>
            <option value="100000+">10萬以上</option>
          </select>
        </div>

        <div class="filter-group">
          <label>旅遊天數</label>
          <select v-model="selectedDuration">
            <option value="">不限天數</option>
            <option value="1-3">1-3天</option>
            <option value="4-6">4-6天</option>
            <option value="7-9">7-9天</option>
            <option value="10+">10天以上</option>
          </select>
        </div>
      </div>

      <!-- 行程列表 -->
      <div class="tours-grid">
        <div v-for="tour in filteredTours" :key="tour.id" class="tour-card">
          <div class="tour-image">
            <img :src="tour.image" :alt="tour.title">
            <div class="tour-badge" v-if="tour.badge">{{ tour.badge }}</div>
          </div>
          <div class="tour-content">
            <h2>{{ tour.title }}</h2>
            <p class="tour-description">{{ tour.description }}</p>
            <div class="tour-info">
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <span>{{ tour.duration }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-users"></i>
                <span>{{ tour.groupSize }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-plane-departure"></i>
                <span>{{ tour.departure }}</span>
              </div>
            </div>
            <div class="tour-footer">
              <div class="price-section">
                <span class="price-label">團體價</span>
                <span class="price-value">{{ tour.price }}</span>
              </div>
              <router-link :to="`/tour/${tour.id}`" class="view-details">
                查看詳情
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const regions = ['日本', '韓國', '東南亞', '歐洲', '美國', '澳洲']
const selectedRegion = ref('')
const selectedPrice = ref('')
const selectedDuration = ref('')

const tours = [
  {
    id: 1,
    title: '東京富士山溫泉5日',
    description: '暢遊東京晴空塔、富士山、箱根溫泉、淺草寺等熱門景點',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
    duration: '5天4夜',
    price: 'NT$ 52,900',
    badge: '熱銷推薦',
    region: '日本',
    groupSize: '20-25人',
    departure: '每週二出發',
    priceRange: '50000-100000'
  },
  {
    id: 2,
    title: '首爾釜山賞櫻8日',
    description: '韓國賞櫻名所巡禮，體驗傳統韓屋、韓服體驗',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800',
    duration: '8天7夜',
    price: 'NT$ 45,900',
    badge: '櫻花季',
    region: '韓國',
    groupSize: '20-25人',
    departure: '每週四出發',
    priceRange: '30000-50000'
  },
  {
    id: 3,
    title: '峇里島夢幻假期6日',
    description: '入住五星級度假村，暢遊金巴蘭海灘、烏布市集',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    duration: '6天5夜',
    price: 'NT$ 38,900',
    badge: '超值優惠',
    region: '東南亞',
    groupSize: '15-20人',
    departure: '每週五出發',
    priceRange: '30000-50000'
  },
  {
    id: 4,
    title: '北海道雪祭溫泉7日',
    description: '札幌雪祭、小樽運河、登別溫泉、函館夜景',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800',
    duration: '7天6夜',
    price: 'NT$ 62,900',
    badge: '冬季限定',
    region: '日本',
    groupSize: '20-25人',
    departure: '每週三出發',
    priceRange: '50000-100000'
  },
  {
    id: 5,
    title: '新加坡環球影城5日',
    description: '聖淘沙名勝世界、濱海灣花園、牛車水、魚尾獅公園',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800',
    duration: '5天4夜',
    price: 'NT$ 35,900',
    badge: '親子同樂',
    region: '東南亞',
    groupSize: '20-25人',
    departure: '每週六出發',
    priceRange: '30000-50000'
  },
  {
    id: 6,
    title: '歐洲精選四國12日',
    description: '法國巴黎、瑞士琉森、義大利羅馬、德國慕尼黑',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
    duration: '12天11夜',
    price: 'NT$ 168,900',
    badge: '豪華行程',
    region: '歐洲',
    groupSize: '15-20人',
    departure: '每月1次',
    priceRange: '100000+'
  },
  {
    id: 7,
    title: '美西國家公園9日',
    description: '優勝美地、大峽谷、羚羊谷、拱門國家公園',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    duration: '9天8夜',
    price: 'NT$ 108,900',
    badge: '自然探索',
    region: '美國',
    groupSize: '15-20人',
    departure: '每月2次',
    priceRange: '100000+'
  },
  {
    id: 8,
    title: '澳洲雪梨黃金海岸8日',
    description: '雪梨歌劇院、藍山國家公園、黃金海岸衝浪',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    duration: '8天7夜',
    price: 'NT$ 89,900',
    badge: '陽光之旅',
    region: '澳洲',
    groupSize: '15-20人',
    departure: '每週日出發',
    priceRange: '50000-100000'
  },
  {
    id: 9,
    title: '泰國清邁曼谷6日',
    description: '大皇宮、臥佛寺、夜市探索、叢林探險',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
    duration: '6天5夜',
    price: 'NT$ 32,900',
    badge: '文化體驗',
    region: '東南亞',
    groupSize: '20-25人',
    departure: '每週二出發',
    priceRange: '30000-50000'
  },
  {
    id: 10,
    title: '沖繩海洋文化4日',
    description: '美麗海水族館、首里城、瀨長島、國際通',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
    duration: '4天3夜',
    price: 'NT$ 28,900',
    badge: '快閃特惠',
    region: '日本',
    groupSize: '20-25人',
    departure: '每週五出發',
    priceRange: '0-30000'
  }
]

const filteredTours = computed(() => {
  return tours.filter(tour => {
    const matchRegion = !selectedRegion.value || tour.region === selectedRegion.value
    const matchPrice = !selectedPrice.value || tour.priceRange === selectedPrice.value
    const matchDuration = !selectedDuration.value || 
      (selectedDuration.value === '10+' ? 
        parseInt(tour.duration) >= 10 : 
        tour.duration.match(selectedDuration.value))
    
    return matchRegion && matchPrice && matchDuration
  })
})
</script>

<style scoped>
.group-tour {
  width: 100%;
  margin-top: 60px;
}

.hero-section {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920') center/cover;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 20px;
}

.hero-section h1 {
  font-size: 36px;
  margin-bottom: 16px;
}

.hero-section p {
  font-size: 18px;
  max-width: 600px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.filter-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 500;
  color: #333;
}

.filter-group select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-width: 200px;
}

.tours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.tour-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.tour-card:hover {
  transform: translateY(-5px);
}

.tour-image {
  position: relative;
  height: 200px;
}

.tour-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tour-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.tour-content {
  padding: 20px;
}

.tour-content h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #2c3e50;
}

.tour-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.tour-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.tour-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.price-section {
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

.view-details {
  background: #2c3e50;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.view-details:hover {
  background: #3498db;
}

@media (max-width: 768px) {
  .hero-section {
    height: 200px;
  }

  .hero-section h1 {
    font-size: 28px;
  }

  .hero-section p {
    font-size: 16px;
  }

  .filter-group select {
    min-width: 150px;
  }

  .tours-grid {
    grid-template-columns: 1fr;
  }
}
</style> 