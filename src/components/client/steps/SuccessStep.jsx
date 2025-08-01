import { useNavigate } from 'react-router-dom'
import { CheckCircle, UserPlus, Home, Repeat } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SuccessStep = ({ formData }) => {
  const navigate = useNavigate()

  const handleRegisterAnother = () => {
    // Reload the page to start fresh
    window.location.reload()
  }

  const handleGoToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            ¡Cliente Registrado Exitosamente!
          </CardTitle>
          <CardDescription className="text-base">
            Las credenciales de {formData.first_name} {formData.last_name} han sido 
            guardadas de forma segura en el sistema
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-3">
              Resumen del registro:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Cliente:</span>
                <span className="font-medium text-green-900">
                  {formData.first_name} {formData.last_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Banco:</span>
                <span className="font-medium text-green-900">
                  {formData.bank_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Estado:</span>
                <span className="font-medium text-green-900">
                  Credenciales completas
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Fecha:</span>
                <span className="font-medium text-green-900">
                  {new Date().toLocaleDateString('es-MX')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-1">
                  Próximos pasos
                </h4>
                <p className="text-sm text-blue-700">
                  El cliente ha sido registrado exitosamente. Los datos están seguros y 
                  encriptados. Puedes continuar registrando más clientes o revisar tu 
                  dashboard para ver las estadísticas actualizadas.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleRegisterAnother}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Registrar Otro Cliente
            </Button>
            
            <Button 
              onClick={handleGoToDashboard}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir al Dashboard
            </Button>
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              ¡Gracias por usar MercadoCredito! 🎉
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessStep

