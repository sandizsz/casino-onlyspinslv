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
    <div className="">
      <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-white text-center mb-4">
              Kazino
                <span className="text-[#C1FF72]"> Funkcijas</span>
              </h2>

              <p className="text-gray-400 text-center mb-12">
                Atklājiet labākās kazino funkcijas neaizmirstamai spēļu pieredzei
              </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-[#2B2B2B] border border-[#C1FF72]/10 hover:border-[#C1FF72]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#C1FF72]/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#C1FF72]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
