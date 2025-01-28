import axios from 'axios'
import { ENDPOINT } from './apiUrls'
import { cookies } from './cookies'
import store from '@/store'
const api = axios.create({
  baseURL: ENDPOINT
})
api.interceptors.request.use(
  async (config) => {
    const token = store.getters.getToken
    if (token === null) {
      token = cookies['user-token']
    }
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
