'use client'

import { useState } from 'react'
import CasinoComponent from "@/app/components/CasinoComponent2"
import { PortableText } from '@portabletext/react';
// AnimatedSection removed for performance
import { useLoading } from '@/app/context/LoadingContext'
import type { Casino, Category } from '@/app/utils/interface'

// Extended Category interface with richText for this file
interface ExtendedCategory extends Category {
  richText?: Array<{
    _type: string;
    [key: string]: unknown;
  }>;
}

interface CategoryPageClientProps {
  initialCasinos: Casino[]
  initialCategory: ExtendedCategory | null
}

export default function CategoryPageClient({ initialCasinos, initialCategory }: CategoryPageClientProps) {
  const { setIsLoading } = useLoading()
  const [casinos] = useState(initialCasinos)
  const [category] = useState<ExtendedCategory | null>(initialCategory)
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
      <div className="w-full py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-light leading-tight text-[#F9F5FF] uppercase">
            {category.title} 
          </h1>
          {category.description && (
            <p className="text-lg text-center text-[#F9F5FF]/70 mb-12 max-w-3xl mx-auto">
              {category.description}
            </p>
          )}

          {category.richText && category.richText.length > 0 && (
            <section className="legal-content max-w-3xl mx-auto mb-12">
              <PortableText value={category.richText} />
            </section>
          )}
          
          <div className="space-y-6">
            {casinos?.map((casino, index) => (
              <div key={casino._id}>
                <CasinoComponent casino={casino} index={index} categorySlug={category.slug.current} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
