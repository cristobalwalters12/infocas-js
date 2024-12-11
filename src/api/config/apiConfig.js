import axios from 'axios'
import { ENDPOINT } from './apiUrls'

const api = axios.create({
  baseURL: ENDPOINT
})

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('user-token')
    if (token === null) {
      token = sessionStorage.getItem('user-token')
    }
    console.log('token', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
