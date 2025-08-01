import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Shield, Lock, Handshake } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import useClientStore from '../../lib/client-store'
import InformationStep from './steps/InformationStep'
import BasicInfoStep from './steps/BasicInfoStep'
import BankSelectionStep from './steps/BankSelectionStep'
import BankCredentialsStep from './steps/BankCredentialsStep'
import SuccessStep from './steps/SuccessStep'

const STEPS = [
  { id: 'info', title: 'Información', component: InformationStep },
  { id: 'basic', title: 'Datos Básicos', component: BasicInfoStep },
  { id: 'bank', title: 'Seleccionar Banco', component: BankSelectionStep },
  { id: 'credentials', title: 'Credenciales', component: BankCredentialsStep },
  { id: 'success', title: 'Completado', component: SuccessStep }
]

const ClientRegistration = () => {
  const navigate = useNavigate()
  const { getSupportedBanks } = useClientStore()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bank_name: '',
    credentials: {}
  })

  useEffect(() => {
    // Load supported banks when component mounts
    getSupportedBanks()
  }, [])

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate('/dashboard')
    }
  }

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }))
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepComplete = (data) => {
    setFormData(prev => ({ ...prev, ...data }))
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100
  const CurrentStepComponent = STEPS[currentStep].component

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 0 ? 'Dashboard' : 'Atrás'}
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Handshake className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MercadoCredito</h1>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Registrar Nuevo Cliente
            </h2>
            <span className="text-sm text-gray-500">
              Paso {currentStep + 1} de {STEPS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {STEPS.map((step, index) => (
              <div 
                key={step.id}
                className={`text-xs ${
                  index <= currentStep 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CurrentStepComponent
          formData={formData}
          onNext={handleNext}
          onComplete={handleStepComplete}
          onBack={handleBack}
        />
      </main>

      {/* Security Footer */}
      {currentStep < STEPS.length - 1 && (
        <footer className="bg-white border-t mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Datos protegidos
              </div>
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-green-600" />
                Conexión segura
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Información encriptada
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default ClientRegistration

