<template>
  <div class="register-container">
    <div class="register-form">
      <h2>會員註冊</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">電子郵件</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            :class="{ 'error': errors.email }"
            required
          >
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <div class="password-input">
            <input 
              :type="showPassword ? 'text' : 'password'"
              id="password" 
              v-model="formData.password"
              :class="{ 'error': errors.password }"
              required
            >
            <button 
              type="button" 
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">確認密碼</label>
          <div class="password-input">
            <input 
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword" 
              v-model="formData.confirmPassword"
              :class="{ 'error': errors.confirmPassword }"
              required
            >
            <button 
              type="button" 
              class="toggle-password"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>

        <div class="form-group">
          <label for="name">姓名</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name"
            :class="{ 'error': errors.name }"
            required
          >
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="phone">手機號碼</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="formData.phone"
            :class="{ 'error': errors.phone }"
            required
          >
          <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <span v-if="!isSubmitting">註冊</span>
          <i v-else class="fas fa-spinner fa-spin"></i>
        </button>
      </form>

      <div class="login-link">
        已有帳號？ <router-link to="/login">立即登入</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: ''
})

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: ''
})

const validateForm = () => {
  let isValid = true
  
  // 重置錯誤訊息
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // 驗證電子郵件
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    errors.email = '請輸入有效的電子郵件地址'
    isValid = false
  }

  // 驗證密碼
  if (formData.password.length < 8) {
    errors.password = '密碼長度至少需要8個字元'
    isValid = false
  }

  // 驗證確認密碼
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = '密碼不一致'
    isValid = false
  }

  // 驗證姓名
  if (formData.name.length < 2) {
    errors.name = '請輸入正確的姓名'
    isValid = false
  }

  // 驗證手機號碼
  const phoneRegex = /^09\d{8}$/
  if (!phoneRegex.test(formData.phone)) {
    errors.phone = '請輸入有效的手機號碼'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isSubmitting.value = true
    await register(formData)
    router.push('/login')
  } catch (error: any) {
    if (error.response?.data?.message) {
      // 處理API返回的錯誤訊息
      const field = error.response.data.field
      if (field && errors.hasOwnProperty(field)) {
        errors[field as keyof typeof errors] = error.response.data.message
      }
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 20px;
}

.register-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
}

.register-form h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #2980b9;
}

.submit-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-form {
    padding: 20px;
  }
}
</style> 