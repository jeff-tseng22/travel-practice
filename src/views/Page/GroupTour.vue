<template>
  <div class="group-tour">
    <div class="full-width-section hero-section">
      <div class="content-wrapper">
        <h1>團體旅遊行程</h1>
        <p>精選各地熱門行程，專業導遊帶團，舒適安全有保障</p>
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
      </div>
    </div>

    <div class="full-width-section content-section">
      <div class="content-wrapper">
        <div class="tours-grid">
          <!-- 行程卡片內容保持不變 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.group-tour {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-section {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920') center/cover;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  width: 100%;
}

.hero-section h1 {
  font-size: 36px;
  margin-bottom: 16px;
}

.hero-section p {
  font-size: 18px;
  max-width: 600px;
}

.filter-section {
  background-color: #f8f9fa;
  padding: 30px 0;
  width: 100%;
}

.content-section {
  background-color: white;
  padding: 40px 0;
  width: 100%;
}

.filter-groups {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
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
  width: 100%;
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
    padding: 0 20px;
  }

  .filter-group select {
    min-width: 150px;
  }

  .tours-grid {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
}
</style> 