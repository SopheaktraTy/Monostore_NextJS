import axios from "axios"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json"
  }
})

// Add a response interceptor
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // If session expired and OTP is required (from backend refreshTokens logic)
    if (
      error.response?.status === 200 &&
      error.response?.data?.otpRequired &&
      !originalRequest._retry
    ) {
      const email = error.response.data.email
      if (typeof window !== "undefined") {
        localStorage.setItem("pendingEmail", email)
        window.location.href = "/verify-otp"
      }
      return Promise.reject(error)
    }

    // Handle 401 Unauthorized for token refresh (existing logic if any)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem("refreshToken")

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${API.defaults.baseURL}/auth/refresh-token`,
            { refreshtoken: refreshToken }
          )

          // If session expired and OTP is sent
          if (res.data.otpRequired) {
            localStorage.setItem("pendingEmail", res.data.email)
            window.location.href = "/verify-otp"
            return Promise.reject(error)
          }

          if (res.data.AccessToken) {
            localStorage.setItem("accessToken", res.data.AccessToken)
            localStorage.setItem("refreshToken", res.data.RefreshToken)
            API.defaults.headers.common["Authorization"] =
              `Bearer ${res.data.AccessToken}`
            return API(originalRequest)
          }
        } catch (refreshError) {
          // If refresh fails or returns 401, redirect to login
          localStorage.clear()
          window.location.href = "/login"
          return Promise.reject(refreshError)
        }
      } else {
        localStorage.clear()
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default API
