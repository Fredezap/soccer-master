import axios from 'axios'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_DEV_BASE_URL
  : import.meta.env.VITE_API_PROD_BASE_URL

export const apiInstance = axios.create({
  baseURL: BASE_URL
})