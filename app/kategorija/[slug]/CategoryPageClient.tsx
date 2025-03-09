'use client'

import { useState } from 'react'
import CasinoComponent from "@/app/components/CasinoComponent"
import AnimatedSection from "@/app/components/AnimatedSection"
import { useLoading } from '@/app/context/LoadingContext'
import type { Casino, Category } from '@/app/utils/interface'

interface CategoryPageClientProps {
  initialCasinos: Casino[]
  initialCategory: Category | null
}

export default function CategoryPageClient({ initialCasinos, initialCategory }: CategoryPageClientProps) {
  const { setIsLoading } = useLoading()
  const [casinos] = useState(initialCasinos)
  const [category] = useState(initialCategory)
  const [error] = useState(!initialCategory)

  setIsLoading(false)

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1D053F] to-[#110226] flex items-center justify-center">
        <div className="text-center p-12 bg-[#1D053F]/50 rounded-lg border border-[#8126FF]/20 shadow-[0_0_20px_rgba(129,38,255,0.3)]">
          <p className="text-xl font-['Rajdhani'] text-[#F9F5FF]/70">
            Category not found
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D053F] to-[#110226]">
      <AnimatedSection className="w-full py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold text-center text-[#8126FF] [text-shadow:_0_0_30px_rgba(129,38,255,0.6)] mb-4">
            {category.title} 
          </h1>
          {category.description && (
            <p className="text-lg text-center text-[#F9F5FF]/70 mb-12 max-w-3xl mx-auto">
              {category.description}
            </p>
          )}
          
          <div className="space-y-6">
            {casinos?.map((casino, index) => (
              <AnimatedSection key={casino._id}>
                <CasinoComponent casino={casino} index={index} categorySlug={category.slug.current} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
