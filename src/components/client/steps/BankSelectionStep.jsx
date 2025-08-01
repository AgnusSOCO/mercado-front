import { useState } from 'react'
import { Building2, ArrowRight, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import useClientStore from '../../../lib/client-store'

// Bank logos mapping
const BANK_LOGOS = {
  'Banamex': '/src/assets/bank-logos/banamex-logo.png',
  'BBVA': '/src/assets/bank-logos/bbva-logo.png',
  'Banorte': '/src/assets/bank-logos/banorte-logo.jpg',
  'Santander': '/src/assets/bank-logos/santander-logo.png',
  'HSBC': '/src/assets/bank-logos/hsbc-logo.png',
  'Banco Azteca': '/src/assets/bank-logos/banco-azteca-logo.png',
  'Scotiabank': '/src/assets/bank-logos/scotiabank-logo.jpg'
}

const BankSelectionStep = ({ formData, onNext }) => {
  const { supportedBanks } = useClientStore()
  const [selectedBank, setSelectedBank] = useState(formData.bank_name || '')

  const handleBankSelect = (bankName) => {
    setSelectedBank(bankName)
  }

  const handleContinue = () => {
    if (selectedBank) {
      onNext({ bank_name: selectedBank })
    }
  }

  const bankList = Object.keys(supportedBanks)

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Selecciona el Banco</CardTitle>
          <CardDescription>
            Elige el banco donde {formData.first_name} {formData.last_name} tiene su cuenta
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              <strong>Importante:</strong> Asegúrate de seleccionar el banco correcto donde el cliente 
              tiene su cuenta activa y conoce sus credenciales de acceso.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bankList.map((bankName) => (
              <div
                key={bankName}
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedBank === bankName
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleBankSelect(bankName)}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    {selectedBank === bankName && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className="mb-4 flex items-center justify-center h-16">
                      {BANK_LOGOS[bankName] ? (
                        <img
                          src={BANK_LOGOS[bankName]}
                          alt={`${bankName} logo`}
                          className="max-h-12 max-w-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center"
                        style={{ display: BANK_LOGOS[bankName] ? 'none' : 'flex' }}
                      >
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {bankName}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {bankList.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Cargando bancos disponibles...
              </p>
            </div>
          )}
          
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleContinue}
              disabled={!selectedBank}
              className="bg-blue-600 hover:bg-blue-700 px-8"
              size="lg"
            >
              Continuar con {selectedBank || 'banco seleccionado'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BankSelectionStep

