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
          const response = await axios.post('/auth/register', userData)
          const { user, access_token } = response.data
          
          get().setAuth(user, access_token)
          return { success: true, data: response.data }
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'Error en el registro'
          set({ error: errorMessage, isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Login promoter
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await axios.post('/auth/login', credentials)
          const { user, access_token } = response.data
          
          get().setAuth(user, access_token)
          return { success: true, data: response.data }
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'Error en el inicio de sesión'
          set({ error: errorMessage, isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Admin login
      adminLogin: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await axios.post('/auth/admin-login', credentials)
          const { user, access_token } = response.data
          
          get().setAuth(user, access_token)
          return { success: true, data: response.data }
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'Error en el acceso de administrador'
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

