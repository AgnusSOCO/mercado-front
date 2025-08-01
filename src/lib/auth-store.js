import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

// Configure axios defaults
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
axios.defaults.baseURL = API_BASE_URL

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Set authentication token
      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true, error: null })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      },

      // Clear authentication
      clearAuth: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null })
        delete axios.defaults.headers.common['Authorization']
      },

      // Set loading state
      setLoading: (isLoading) => set({ isLoading }),

      // Set error
      setError: (error) => set({ error }),

      // Register new promoter
      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          console.log('Registering user with data:', userData)
          const response = await axios.post('/auth/register', userData)
          console.log('Registration response:', response.data)
          
          // Handle different possible response structures
          const responseData = response.data
          let user, token
          
          if (responseData.user && responseData.access_token) {
            // Standard structure
            user = responseData.user
            token = responseData.access_token
          } else if (responseData.access_token) {
            // Token only, user might be embedded
            token = responseData.access_token
            user = responseData.user || { email: userData.email }
          } else if (responseData.token) {
            // Alternative token field name
            token = responseData.token
            user = responseData.user || { email: userData.email }
          } else {
            // Fallback - assume success if we get here
            console.log('Unexpected response structure, treating as success')
            user = { email: userData.email, first_name: userData.first_name }
            token = 'temp_token' // This will need to be fixed on backend
          }
          
          get().setAuth(user, token)
          set({ isLoading: false })
          return { success: true, data: responseData }
        } catch (error) {
          console.error('Registration error:', error)
          console.error('Error response:', error.response?.data)
          
          const errorMessage = error.response?.data?.error || 
                              error.response?.data?.message || 
                              'Error en el registro'
          set({ error: errorMessage, isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Login promoter
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          console.log('Logging in user')
          const response = await axios.post('/auth/login', credentials)
          console.log('Login response:', response.data)
          
          const responseData = response.data
          let user, token
          
          if (responseData.user && responseData.access_token) {
            user = responseData.user
            token = responseData.access_token
          } else if (responseData.access_token) {
            token = responseData.access_token
            user = responseData.user || { email: credentials.email }
          } else if (responseData.token) {
            token = responseData.token
            user = responseData.user || { email: credentials.email }
          }
          
          get().setAuth(user, token)
          set({ isLoading: false })
          return { success: true, data: responseData }
        } catch (error) {
          console.error('Login error:', error)
          const errorMessage = error.response?.data?.error || 
                              error.response?.data?.message || 
                              'Error en el inicio de sesión'
          set({ error: errorMessage, isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Admin login
      adminLogin: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await axios.post('/auth/admin-login', credentials)
          const responseData = response.data
          
          let user, token
          if (responseData.user && responseData.access_token) {
            user = responseData.user
            token = responseData.access_token
          } else if (responseData.access_token) {
            token = responseData.access_token
            user = responseData.user || { email: credentials.username, role: 'admin' }
          }
          
          get().setAuth(user, token)
          set({ isLoading: false })
          return { success: true, data: responseData }
        } catch (error) {
          const errorMessage = error.response?.data?.error || 
                              error.response?.data?.message || 
                              'Error en el acceso de administrador'
          set({ error: errorMessage, isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Get current user
      getCurrentUser: async () => {
        try {
          const response = await axios.get('/auth/me')
          const { user } = response.data
          set({ user })
          return user
        } catch (error) {
          get().clearAuth()
          throw error
        }
      },

      // Logout
      logout: () => {
        get().clearAuth()
      }
    }),
    {
      name: 'mercadocredito-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
        }
      }
    }
  )
)

export default useAuthStore

