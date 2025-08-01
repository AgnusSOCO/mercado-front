import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, UserPlus, TrendingUp, LogOut, Handshake } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import useAuthStore from '../../lib/auth-store'
import useClientStore from '../../lib/client-store'
import ClientList from '../client/ClientList'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { stats, getStats, clients, getClients, isLoading } = useClientStore()

  useEffect(() => {
    getStats()
    getClients()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleRegisterClient = () => {
    navigate('/client/register')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Handshake className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MercadoCredito</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_clients || 0}</div>
              <p className="text-xs text-muted-foreground">
                Clientes registrados
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.this_month_clients || 0}</div>
              <p className="text-xs text-muted-foreground">
                Nuevos registros
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.success_rate || 0}%</div>
              <p className="text-xs text-muted-foreground">
                Credenciales completadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Register New Client Button */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    ¿Listo para registrar un nuevo cliente?
                  </h3>
                  <p className="text-blue-100">
                    Ayuda a más personas a acceder a créditos financieros
                  </p>
                </div>
                <Button 
                  onClick={handleRegisterClient}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrar Nuevo Cliente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="register" className="space-y-4">
          <TabsList>
            <TabsTrigger value="register">Registrar Cliente</TabsTrigger>
          </TabsList>
          
          <TabsContent value="register" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mis Clientes</CardTitle>
                <CardDescription>
                  Lista de todos los clientes que has registrado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClientList clients={clients} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Dashboard

