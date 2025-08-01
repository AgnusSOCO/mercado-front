import { Shield, Lock, Eye, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const InformationStep = ({ onNext }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Información Importante</CardTitle>
          <CardDescription className="text-base">
            Antes de comenzar, es importante que entiendas cómo protegemos la información de tus clientes
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Encriptación de Datos
                </h3>
                <p className="text-sm text-gray-600">
                  Todas las credenciales bancarias se encriptan usando algoritmos de seguridad avanzados antes de ser almacenadas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="flex-shrink-0">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Acceso Restringido
                </h3>
                <p className="text-sm text-gray-600">
                  Solo el personal autorizado puede acceder a la información, y todas las acciones quedan registradas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Cumplimiento Normativo
                </h3>
                <p className="text-sm text-gray-600">
                  Nuestro sistema cumple con todas las regulaciones de protección de datos financieros en México.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-amber-800 mb-1">
                  Responsabilidad del Promotor
                </h4>
                <p className="text-sm text-amber-700">
                  Como promotor, eres responsable de explicar a tus clientes el propósito de la recolección de datos 
                  y obtener su consentimiento antes de proceder.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <Button 
              onClick={() => onNext({})}
              className="bg-blue-600 hover:bg-blue-700 px-8"
              size="lg"
            >
              Entendido, Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InformationStep

