import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

interface RegisterData {
  email: string
  password: string
  name: string
  phone: string
}

export const register = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/auth/register`, data)
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })
  return response.data
}

export const verifyEmail = async (token: string) => {
  const response = await axios.post(`${API_URL}/auth/verify-email`, { token })
  return response.data
} 