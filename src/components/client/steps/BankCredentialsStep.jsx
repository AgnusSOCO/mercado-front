import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Eye, EyeOff, Shield, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import useClientStore from '../../../lib/client-store'

const BankCredentialsStep = ({ formData, onComplete }) => {
  const { supportedBanks, createClient, addBankCredentials, isLoading } = useClientStore()
  const [showPasswords, setShowPasswords] = useState({})
  const [error, setError] = useState('')

  const bankConfig = supportedBanks[formData.bank_name] || {}
  
  // Create dynamic schema based on bank requirements
  const createSchema = () => {
    const schemaFields = {}
    
    bankConfig.required?.forEach(field => {
      schemaFields[field] = z.string().min(1, `${bankConfig.labels?.[field] || field} es requerido`)
    })
    
    bankConfig.fields?.forEach(field => {
      if (!bankConfig.required?.includes(field)) {
        schemaFields[field] = z.string().optional()
      }
    })
    
    return z.object(schemaFields)
  }

  const schema = createSchema()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData.credentials || {}
  })

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const onSubmit = async (credentials) => {
    setError('')
    
    try {
      // First create the client
      const clientResult = await createClient({
        first_name: formData.first_name,
        last_name: formData.last_name,
        bank_name: formData.bank_name
      })
      
      if (!clientResult.success) {
        setError(clientResult.error)
        return
      }
      
      // Then add the credentials
      const credentialsResult = await addBankCredentials(
        clientResult.data.client.id,
        credentials
      )
      
      if (!credentialsResult.success) {
        setError(credentialsResult.error)
        return
      }
      
      // Success! Move to next step
      onComplete({
        credentials,
        client: clientResult.data.client
      })
      
    } catch (err) {
      setError('Error inesperado. Por favor intenta de nuevo.')
    }
  }

  const renderField = (field) => {
    const label = bankConfig.labels?.[field] || field
    const isRequired = bankConfig.required?.includes(field)
    const isPassword = field === 'password'
    const showPassword = showPasswords[field]

    return (
      <div key={field} className="space-y-2">
        <Label htmlFor={field}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <div className="relative">
          {isPassword && (
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          )}
          <Input
            id={field}
            type={isPassword && !showPassword ? 'password' : 'text'}
            placeholder={`Ingresa tu ${label.toLowerCase()}`}
            className={isPassword ? 'pl-10 pr-10' : ''}
            {...register(field)}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => togglePasswordVisibility(field)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {errors[field] && (
          <p className="text-sm text-red-600">{errors[field].message}</p>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">
            Credenciales de {formData.bank_name}
          </CardTitle>
          <CardDescription>
            Ingresa las credenciales bancarias de {formData.first_name} {formData.last_name}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Seguridad garantizada:</strong> Toda la información se encripta automáticamente 
                antes de ser almacenada. Solo personal autorizado puede acceder a estos datos.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {bankConfig.fields?.map(field => renderField(field))}
            </div>
            
            {bankConfig.fields?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Configuración del banco no disponible
                </p>
              </div>
            )}
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 px-8"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Credenciales'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BankCredentialsStep

