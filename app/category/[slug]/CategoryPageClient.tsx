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
      <div className="min-h-screen from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center">
        <div className="text-center p-12 bg-[#1E2A44]/50 rounded-lg border border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.3)]">
          <p className="text-xl font-['Rajdhani'] text-[#C0C0C0]">
            Category not found
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen from-[#1A1A1A] to-[#0D0D0D]">
      <AnimatedSection className="w-full py-20 bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold text-center text-[#C1FF72] [text-shadow:_0_0_30px_#C1FF72] mb-4">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-lg text-center text-[#C0C0C0] mb-12 max-w-3xl mx-auto">
              {category.description}
            </p>
          )}
          
          <div className="space-y-6">
            {casinos?.map((casino, index) => (
              <AnimatedSection key={casino._id}>
                <CasinoComponent casino={casino} index={index} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
