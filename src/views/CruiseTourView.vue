<template>
  <div class="cruise-tour">
    <div class="hero-section">
      <h1>郵輪旅遊</h1>
      <p>豪華郵輪，精緻美食，精彩娛樂，一次擁有的海上假期</p>
    </div>

    <div class="content-wrapper">
      <!-- 篩選器 -->
      <div class="filter-section">
        <div class="filter-group">
          <label>航線區域</label>
          <select v-model="selectedRegion">
            <option value="">全部航線</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>航程天數</label>
          <select v-model="selectedDuration">
            <option value="">不限天數</option>
            <option value="4-5">4-5天</option>
            <option value="6-7">6-7天</option>
            <option value="8-9">8-9天</option>
            <option value="10+">10天以上</option>
          </select>
        </div>

        <div class="filter-group">
          <label>郵輪公司</label>
          <select v-model="selectedCruiseLine">
            <option value="">不限公司</option>
            <option v-for="line in cruiseLines" :key="line" :value="line">
              {{ line }}
            </option>
          </select>
        </div>
      </div>

      <!-- 郵輪行程列表 -->
      <div class="cruises-list">
        <div v-for="cruise in filteredCruises" :key="cruise.id" class="cruise-card">
          <div class="cruise-image">
            <img :src="cruise.image" :alt="cruise.title">
            <div class="cruise-badge" v-if="cruise.badge">{{ cruise.badge }}</div>
          </div>
          <div class="cruise-content">
            <h2>{{ cruise.title }}</h2>
            <div class="cruise-info">
              <div class="info-row">
                <i class="fas fa-ship"></i>
                <span>{{ cruise.ship }}</span>
              </div>
              <div class="info-row">
                <i class="fas fa-calendar-alt"></i>
                <span>{{ cruise.duration }}</span>
              </div>
              <div class="info-row">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ cruise.ports }}</span>
              </div>
            </div>
            <p class="cruise-description">{{ cruise.description }}</p>
            <div class="cruise-highlights">
              <h3>行程亮點</h3>
              <ul>
                <li v-for="highlight in cruise.highlights" :key="highlight">
                  {{ highlight }}
                </li>
              </ul>
            </div>
            <div class="cruise-footer">
              <div class="price-section">
                <span class="price-label">每人均價</span>
                <span class="price-value">{{ cruise.price }}</span>
              </div>
              <router-link :to="`/cruise/${cruise.id}`" class="view-details">
                查看行程
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

const regions = ['地中海', '加勒比海', '阿拉斯加', '亞洲', '北歐']
const cruiseLines = ['皇家加勒比', '歌詩達郵輪', '公主郵輪', 'MSC郵輪', '挪威郵輪']

const selectedRegion = ref('')
const selectedDuration = ref('')
const selectedCruiseLine = ref('')

const cruises = [
  {
    id: 1,
    title: '地中海精選8天7夜',
    description: '從羅馬出發，探索意大利、希臘、克羅地亞的美麗海岸線',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800',
    badge: '熱銷推薦',
    ship: 'MSC Grandiosa',
    duration: '8天7夜',
    ports: '羅馬 → 那不勒斯 → 雅典 → 杜布羅夫尼克',
    highlights: [
      '參觀羅馬古城與梵蒂岡',
      '那不勒斯披薩體驗',
      '雅典衛城探索之旅',
      '杜布羅夫尼克古城漫步'
    ],
    price: 'NT$ 89,900',
    region: '地中海',
    cruiseLine: 'MSC郵輪',
    priceRange: '50000-100000'
  },
  {
    id: 2,
    title: '加勒比海夢幻之旅7天',
    description: '邁阿密出發，探索巴哈馬、牙買加、墨西哥的熱帶風情',
    image: 'https://images.unsplash.com/photo-1566375638495-8c60326448dc?w=800',
    badge: '熱帶假期',
    ship: 'Symphony of the Seas',
    duration: '7天6夜',
    ports: '邁阿密 → 拿索 → 蒙特哥灣 → 科蘇梅爾',
    highlights: [
      '巴哈馬粉沙灘浮潛',
      '牙買加瀑布探險',
      '墨西哥玛雅遺跡',
      '海上娛樂設施'
    ],
    price: 'NT$ 79,900',
    region: '加勒比海',
    cruiseLine: '皇家加勒比',
    priceRange: '50000-100000'
  },
  {
    id: 3,
    title: '阿拉斯加冰川探索9天',
    description: '溫哥華出發，穿越內灣航道，欣賞壯麗冰川與野生動物',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    badge: '自然探索',
    ship: 'Norwegian Bliss',
    duration: '9天8夜',
    ports: '溫哥華 → 朱諾 → 史凱威 → 冰川灣',
    highlights: [
      '冰川灣國家公園',
      '阿拉斯加鮭魚季',
      '棕熊觀察之旅',
      '淘金小鎮史凱威'
    ],
    price: 'NT$ 108,900',
    region: '阿拉斯加',
    cruiseLine: '挪威郵輪',
    priceRange: '100000+'
  },
  {
    id: 4,
    title: '日本韓國精選5天',
    description: '基隆出發，暢遊日本九州與韓國南部',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800',
    badge: '週年慶特惠',
    ship: 'Costa Serena',
    duration: '5天4夜',
    ports: '基隆 → 長崎 → 濟州島 → 福岡',
    highlights: [
      '長崎原爆紀念館',
      '濟州島城山日出峰',
      '福岡太宰府天滿宮',
      '船上日式溫泉'
    ],
    price: 'NT$ 32,900',
    region: '亞洲',
    cruiseLine: '歌詩達郵輪',
    priceRange: '30000-50000'
  },
  {
    id: 5,
    title: '北歐峽灣之旅10天',
    description: '哥本哈根出發，探索挪威峽灣與北歐文化',
    image: 'https://images.unsplash.com/photo-1601651402907-9d9dcc796630?w=800',
    badge: '秋季限定',
    ship: 'MSC Meraviglia',
    duration: '10天9夜',
    ports: '哥本哈根 → 蓋朗厄爾 → 卑爾根 → 奧斯陸',
    highlights: [
      '挪威峽灣遊船',
      '維京船博物館',
      '布呂根漢薩碼頭',
      '峽灣觀景火車'
    ],
    price: 'NT$ 129,900',
    region: '北歐',
    cruiseLine: 'MSC郵輪',
    priceRange: '100000+'
  }
]

const filteredCruises = computed(() => {
  return cruises.filter(cruise => {
    const matchRegion = !selectedRegion.value || cruise.region === selectedRegion.value
    const matchDuration = !selectedDuration.value || cruise.duration.includes(selectedDuration.value)
    const matchCruiseLine = !selectedCruiseLine.value || cruise.cruiseLine === selectedCruiseLine.value
    
    return matchRegion && matchDuration && matchCruiseLine
  })
})
</script>

<style scoped>
.cruise-tour {
  width: 100%;
  margin-top: 60px;
}

.hero-section {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920') center/cover;
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

.cruise-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.cruise-image {
  flex: 0 0 45%;
  position: relative;
}

.cruise-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cruise-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.cruise-content {
  flex: 0 0 55%;
  padding: 30px;
}

.cruise-content h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.cruise-info {
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #666;
}

.cruise-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.cruise-highlights {
  margin-bottom: 30px;
}

.cruise-highlights h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.cruise-highlights ul {
  list-style: none;
  padding: 0;
}

.cruise-highlights li {
  padding-left: 20px;
  position: relative;
  margin-bottom: 8px;
  color: #666;
}

.cruise-highlights li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #3498db;
}

.cruise-footer {
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
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.view-details:hover {
  background: #3498db;
}

@media (max-width: 768px) {
  .cruise-card {
    flex-direction: column;
  }
  
  .cruise-image {
    height: 250px;
  }
  
  .cruise-content {
    padding: 20px;
  }
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
</style> 