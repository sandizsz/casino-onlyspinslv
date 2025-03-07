"use client"

import { Shield, Zap, Gift, Clock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Licencēts un Drošs',
    description: 'Visi kazino ir pilnībā licencēti un izmanto jaunākos drošības standartus'
  },
  {
    icon: Zap,
    title: 'Ātras Izmaksas',
    description: 'Saņemiet savus laimestus nekavējoties'
  },
  {
    icon: Gift,
    title: 'Ekskluzīvi Bonusi',
    description: 'Piekļūstiet īpašiem bonusiem un akcijām, kas pieejami tikai pie mums'
  },
  {
    icon: Clock,
    title: '24/7 Atbalsts',
    description: 'Diennakts klientu atbalsts visām jūsu spēļu vajadzībām'
  }
]

export default function CasinoFeatures() {
  return (
    <div className="relative py-12 sm:py-16 w-full overflow-hidden">
     
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl md:text-3xl font-light mb-4 sm:mb-6 bg-clip-text text-transparent uppercase bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">
            Kazino Funkcijas
          </h2>

          <p className="text-base sm:text-lg text-[#000025] max-w-2xl mx-auto leading-relaxed">
            Atklājiet labākās kazino funkcijas neaizmirstamai spēļu pieredzei
          </p>

        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group p-4 sm:p-6 rounded-xl bg-[#1D053F] backdrop-blur-sm border border-[#8126FF]/20 
               "
            >
             
              

              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#8126FF]/20 to-[#8126FF]/10 
                  flex items-center justify-center mb-4 sm:mb-6 border border-[#8126FF]/30 ">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#F9F5FF]" />
                </div>
                <h3 className=" uppercase text-md font-light text-[#F9F5FF] mb-2 sm:mb-3 ">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#F9F5FF]/70 flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
