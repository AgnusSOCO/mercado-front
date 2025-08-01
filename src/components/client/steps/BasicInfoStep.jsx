import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const basicInfoSchema = z.object({
  first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres')
})

const BasicInfoStep = ({ formData, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      first_name: formData.first_name || '',
      last_name: formData.last_name || ''
    }
  })

  const onSubmit = (data) => {
    onNext(data)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Información Básica del Cliente</CardTitle>
          <CardDescription>
            Ingresa los datos básicos del cliente que deseas registrar
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nombre(s) *</Label>
                <Input
                  id="first_name"
                  placeholder="Juan Carlos"
                  {...register('first_name')}
                  className="text-base"
                />
                {errors.first_name && (
                  <p className="text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last_name">Apellido(s) *</Label>
                <Input
                  id="last_name"
                  placeholder="Pérez González"
                  {...register('last_name')}
                  className="text-base"
                />
                {errors.last_name && (
                  <p className="text-sm text-red-600">{errors.last_name.message}</p>
                )}
              </div>
            </div>
            
            <Alert>
              <AlertDescription>
                <strong>Nota:</strong> Asegúrate de que los nombres coincidan exactamente con los documentos 
                oficiales del cliente para evitar problemas en el proceso de verificación.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-8"
                size="lg"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BasicInfoStep

