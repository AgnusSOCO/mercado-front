import { create } from 'zustand'
import axios from 'axios'

const useClientStore = create((set, get) => ({
  clients: [],
  supportedBanks: {},
  stats: null,
  isLoading: false,
  error: null,

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error
  setError: (error) => set({ error }),

  // Get supported banks
  getSupportedBanks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('/clients/banks')
      set({ supportedBanks: response.data.banks, isLoading: false })
      return response.data.banks
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al obtener bancos'
      set({ error: errorMessage, isLoading: false })
      throw error
    }
  },

  // Create new client
  createClient: async (clientData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post('/clients', clientData)
      const newClient = response.data.client
      
      set(state => ({
        clients: [newClient, ...state.clients],
        isLoading: false
      }))
      
      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al crear cliente'
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  // Get all clients
  getClients: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('/clients')
      set({ clients: response.data.clients, isLoading: false })
      return response.data.clients
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al obtener clientes'
      set({ error: errorMessage, isLoading: false })
      throw error
    }
  },

  // Add bank credentials for client
  addBankCredentials: async (clientId, credentials) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`/clients/${clientId}/credentials`, credentials)
      
      // Update client in the list
      set(state => ({
        clients: state.clients.map(client => 
          client.id === clientId 
            ? { ...client, has_credentials: true }
            : client
        ),
        isLoading: false
      }))
      
      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al guardar credenciales'
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  // Get promoter statistics
  getStats: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('/clients/stats')
      set({ stats: response.data, isLoading: false })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al obtener estadísticas'
      set({ error: errorMessage, isLoading: false })
      throw error
    }
  }
}))

export default useClientStore

