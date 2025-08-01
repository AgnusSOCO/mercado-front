import { CheckCircle, XCircle, Calendar, Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const ClientList = ({ clients, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay clientes registrados
        </h3>
        <p className="text-gray-500">
          Comienza registrando tu primer cliente para ver la lista aquí.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <Card key={client.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {client.first_name[0]}{client.last_name[0]}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {client.first_name} {client.last_name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {client.bank_name}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(client.created_at).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                {client.has_credentials ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">Completado</span>
                  </div>
                ) : (
                  <div className="flex items-center text-orange-600">
                    <XCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">Pendiente</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ClientList

