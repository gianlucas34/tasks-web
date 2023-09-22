import axios from 'axios'
import cookie from 'js-cookie'
import { TOKEN_COOKIE } from '@/constants/cookies'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

if (typeof window !== 'undefined') {
  api.interceptors.request.use(
    (config) => {
      const token = cookie.get(TOKEN_COOKIE)

      if (token) {
        config.headers.Authorization = token
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const token = cookie.get(TOKEN_COOKIE)

      if (token && error?.response?.status === 401) {
        cookie.remove(TOKEN_COOKIE)
        localStorage.clear()

        window.location.href = '/'
      }

      return Promise.reject(error)
    }
  )
}
