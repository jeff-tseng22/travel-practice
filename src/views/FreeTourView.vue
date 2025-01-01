<template>
  <div class="free-tour">
    <div class="full-width-section hero-section">
      <div class="content-wrapper">
        <h1>自由行套裝</h1>
        <p>機票+住宿+接送，打造專屬於您的完美假期</p>
      </div>
    </div>

    <div class="full-width-section filter-section">
      <div class="content-wrapper">
        <div class="filter-groups">
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
            <label>每人預算</label>
            <select v-model="selectedPrice">
              <option value="">不限金額</option>
              <option value="0-20000">2萬以下</option>
              <option value="20000-30000">2-3萬</option>
              <option value="30000-50000">3-5萬</option>
              <option value="50000+">5萬以上</option>
            </select>
          </div>

          <div class="filter-group">
            <label>住宿等級</label>
            <select v-model="selectedHotelClass">
              <option value="">不限等級</option>
              <option value="3">3星級</option>
              <option value="4">4星級</option>
              <option value="5">5星級</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="full-width-section content-section">
      <div class="content-wrapper">
        <div class="packages-grid">
          <div v-for="pkg in filteredPackages" :key="pkg.id" class="package-card">
            <div class="package-image">
              <img :src="pkg.image" :alt="pkg.title">
              <div class="package-badge" v-if="pkg.badge">{{ pkg.badge }}</div>
            </div>
            <div class="package-content">
              <h2>{{ pkg.title }}</h2>
              <p class="package-description">{{ pkg.description }}</p>
              <div class="package-features">
                <div class="feature-item">
                  <i class="fas fa-bed"></i>
                  <span>{{ pkg.hotel }}</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-plane"></i>
                  <span>{{ pkg.airline }}</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-car"></i>
                  <span>{{ pkg.transfer }}</span>
                </div>
              </div>
              <div class="package-footer">
                <div class="price-section">
                  <span class="price-label">每人均價</span>
                  <span class="price-value">{{ pkg.price }}</span>
                </div>
                <router-link :to="`/free-tour/${pkg.id}`" class="view-details">
                  查看方案
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const regions = ['日本', '韓國', '泰國', '新加坡', '馬來西亞']
const selectedRegion = ref('')
const selectedPrice = ref('')
const selectedHotelClass = ref('')

const packages = [
  {
    id: 1,
    title: '東京自由行4天',
    description: '含機票、市區飯店、機場接送、WIFI機，贈東京地鐵券',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800',
    badge: '熱銷第一',
    hotel: '新宿王子飯店',
    airline: '長榮航空',
    transfer: '機場快線',
    price: 'NT$ 25,900',
    region: '日本',
    hotelClass: 'business',
    priceRange: '20000-30000'
  },
  {
    id: 2,
    title: '首爾明洞5天',
    description: '含機票、市區商旅、機場接送、4G網卡，贈景福宮門票',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800',
    badge: '最超值',
    hotel: 'Lotte City Hotel',
    airline: '韓亞航空',
    transfer: '機場巴士',
    price: 'NT$ 22,900',
    region: '韓國',
    hotelClass: 'business',
    priceRange: '20000-30000'
  },
  {
    id: 3,
    title: '新加坡濱海灣4天',
    description: '含機票、濱海灣飯店、機場接送、無限上網',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    badge: '奢華享受',
    hotel: 'Marina Bay Sands',
    airline: '新加坡航空',
    transfer: '私人轎車',
    price: 'NT$ 52,900',
    region: '東南亞',
    hotelClass: 'luxury',
    priceRange: '50000+'
  },
  {
    id: 4,
    title: '大阪環球影城5天',
    description: '含機票、環球城市飯店、快速通關券、WIFI機',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800',
    badge: '親子首選',
    hotel: 'The Park Front Hotel',
    airline: '日本航空',
    transfer: 'JR PASS',
    price: 'NT$ 32,900',
    region: '日本',
    hotelClass: 'business',
    priceRange: '30000-50000'
  },
  {
    id: 5,
    title: '曼谷考山路4天',
    description: '含機票、精選旅館、機場接送、BTS卡',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
    badge: '超平價',
    hotel: 'Ibis Bangkok',
    airline: '泰國航空',
    transfer: '機場快線',
    price: 'NT$ 15,900',
    region: '東南亞',
    hotelClass: 'economic',
    priceRange: '0-20000'
  },
  {
    id: 6,
    title: '巴黎左岸7天',
    description: '含機票、精品酒店、機場接送、地鐵券',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    badge: '浪漫假期',
    hotel: 'Hotel du Louvre',
    airline: '法國航空',
    transfer: '私人轎車',
    price: 'NT$ 82,900',
    region: '歐洲',
    hotelClass: 'luxury',
    priceRange: '50000+'
  },
  {
    id: 7,
    title: '沖繩海濱度假4天',
    description: '含機票、海景飯店、租車服務、水上活動券',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800',
    badge: '人氣套票',
    hotel: 'The Ritz-Carlton Okinawa',
    airline: '華航直飛',
    transfer: '租車自駕',
    price: 'NT$ 42,900',
    region: '日本',
    hotelClass: 'luxury',
    priceRange: '30000-50000'
  },
  {
    id: 8,
    title: '北海道札幌5天',
    description: '含機票、市區飯店、JR PASS、溫泉體驗',
    image: 'https://images.unsplash.com/photo-1548189797-75aeb4356d6f?w=800',
    badge: '溫泉之旅',
    hotel: 'JR Tower Hotel Nikko Sapporo',
    airline: '國泰航空',
    transfer: 'JR PASS',
    price: 'NT$ 36,900',
    region: '日本',
    hotelClass: 'business',
    priceRange: '30000-50000'
  },
  {
    id: 9,
    title: '釜山海雲台4天',
    description: '含機票、海景房、機場接送、地鐵卡',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=800',
    badge: '海景房',
    hotel: 'Paradise Hotel Busan',
    airline: '大韓航空',
    transfer: '機場接送',
    price: 'NT$ 23,900',
    region: '韓國',
    hotelClass: 'business',
    priceRange: '20000-30000'
  },
  {
    id: 10,
    title: '濟州島度假5天',
    description: '含機票、度假村、環島包車、門票套券',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800',
    badge: '度假首選',
    hotel: 'Jeju Shinhwa World',
    airline: '真航空',
    transfer: '專車接送',
    price: 'NT$ 29,900',
    region: '韓國',
    hotelClass: 'luxury',
    priceRange: '20000-30000'
  },
  {
    id: 11,
    title: '芭達雅海灘5天',
    description: '含機票、海景酒店、水上活動、接送服務',
    image: 'https://images.unsplash.com/photo-1536604673810-81370412626d?w=800',
    badge: '海島假期',
    hotel: 'Hilton Pattaya',
    airline: '泰國航空',
    transfer: '專車接送',
    price: 'NT$ 19,900',
    region: '東南亞',
    hotelClass: 'business',
    priceRange: '0-20000'
  },
  {
    id: 30,
    title: '夏威夷檀香山6天',
    description: '含機票、海濱度假村、機場接送、浮潛體驗',
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800',
    badge: '熱帶天堂',
    hotel: 'Hilton Hawaiian Village',
    airline: '聯合航空',
    transfer: '機場接送',
    price: 'NT$ 89,900',
    region: '美國',
    hotelClass: 'luxury',
    priceRange: '50000+'
  },
  {
    id: 12,
    title: '京都和服體驗5天',
    description: '含機票、和式旅館、和服體驗、抹茶文化體驗',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    badge: '文化體驗',
    hotel: '京都祗園旅館',
    airline: '全日空航空',
    transfer: 'JR PASS',
    price: 'NT$ 45,900',
    region: '日本',
    hotelClass: 'luxury',
    priceRange: '30000-50000'
  },
  {
    id: 13,
    title: '峇里島水上別墅5天',
    description: '含機票、水上別墅、SPA療程、浮潛體驗',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    badge: '蜜月推薦',
    hotel: 'The St. Regis Bali',
    airline: '新加坡航空',
    transfer: '私人轎車',
    price: 'NT$ 58,900',
    region: '東南亞',
    hotelClass: 'luxury',
    priceRange: '50000+'
  },
  {
    id: 14,
    title: '倫敦市區探索6天',
    description: '含機票、市區酒店、倫敦眼門票、地鐵卡',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    badge: '英倫風情',
    hotel: 'The Savoy London',
    airline: '英國航空',
    transfer: '機場快線',
    price: 'NT$ 72,900',
    region: '歐洲',
    hotelClass: 'luxury',
    priceRange: '50000+'
  },
  {
    id: 15,
    title: '馬爾地夫雙島6天',
    description: '含機票、水上屋、快艇接駁、全包式餐飲',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    badge: '頂級奢華',
    hotel: 'Waldorf Astoria Maldives',
    airline: '新加坡航空',
    transfer: '快艇接駁',
    price: 'NT$ 168,900',
    region: '東南亞',
    hotelClass: 'luxury',
    priceRange: '100000+'
  }
]

const filteredPackages = computed(() => {
  return packages.filter(pkg => {
    const matchRegion = !selectedRegion.value || pkg.region === selectedRegion.value
    const matchPrice = !selectedPrice.value || pkg.priceRange === selectedPrice.value
    const matchHotelClass = !selectedHotelClass.value || pkg.hotelClass === selectedHotelClass.value
    
    return matchRegion && matchPrice && matchHotelClass
  })
})
</script>

<style scoped>
.free-tour {
  padding-top: 60px;
}

.hero-section {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920') center/cover;
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

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.package-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.package-card:hover {
  transform: translateY(-5px);
}

.package-image {
  position: relative;
  height: 200px;
}

.package-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.package-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.package-content {
  padding: 20px;
}

.package-content h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #2c3e50;
}

.package-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.package-features {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.package-footer {
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

  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style> 