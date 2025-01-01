<template>
  <footer class="footer full-width-section">
    <div class="content-wrapper">
      <div class="footer-content">
        <div class="footer-section">
          <h3>關於我們</h3>
          <ul>
            <li><a href="#">公司介紹</a></li>
            <li><a href="#">服務條款</a></li>
            <li><a href="#">隱私政策</a></li>
            <li><a href="#">聯絡我們</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>旅遊資訊</h3>
          <ul>
            <li><a href="#">最新優惠</a></li>
            <li><a href="#">旅遊保險</a></li>
            <li><a href="#">常見問題</a></li>
            <li><a href="#">訂購須知</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>客戶服務</h3>
          <ul>
            <li>服務時間：週一至週五 9:00-18:00</li>
            <li>電話：(02) 1234-5678</li>
            <li>傳真：(02) 1234-5679</li>
            <li>Email：service@travel.com</li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>追蹤我們</h3>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">Line</a>
            <a href="#" class="social-link">Youtube</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 快樂旅遊 版權所有</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 40px 0 0 0;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.footer-section h3 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #fff;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.social-link {
  color: #ccc;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s;
}

.social-link:hover {
  color: #fff;
  border-color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.footer-bottom {
  width: 100%;
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #444;
  background-color: #2c2c2c;
}

.footer-bottom p {
  color: #888;
  margin: 0;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer-section {
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style> 