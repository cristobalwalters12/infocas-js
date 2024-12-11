import axios from 'axios'
import { ENDPOINT } from './apiUrls'

const api = axios.create({
  baseURL: ENDPOINT
})

const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
  const [key, value] = cookie.split('=')
  acc[key] = value
  return acc
}, {})

console.log(cookies['user-token'])

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('user-token')
    if (token === null) {
      token = cookies['user-token']
    }
    cookies['user-token']
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
