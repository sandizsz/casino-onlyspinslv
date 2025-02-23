'use client'

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Casino } from '../utils/interface'
import ClaimButton from './ClaimButton'

interface TopPicksComponentProps {
  casinos: Casino[]
}

export const revalidate = 60;

const TopPicksComponent = ({ casinos }: TopPicksComponentProps) => {
  // Define the order of tags we want to display
  const tagOrder = ['best-deposit-bonus', 'fast-withdrawal', 'most-reliable', 'vip'];
  

  
  // Filter casinos to get one casino per tag, following our preferred order
  const topPicks = tagOrder.map(tagSlug => {
    const matchingCasino = casinos.find(casino => 
      casino.tags?.some((tag: { slug: { current: string } }) => {
      
        return tag.slug.current.toLowerCase() === tagSlug;
      })
    );
  
    return matchingCasino;
  }).filter((casino): casino is Casino => casino !== undefined);



  return (
    <div className="w-full bg-[#0D0D0D] py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#C1FF72] to-[#C1FF72] text-transparent bg-clip-text">
              Hand-Picked
            </span> Top Deals
          </h2>
          <p className="text-gray-400">Exclusive offers selected just for you</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPicks.map((casino, index) => (
            <div 
              key={casino._id} 
              className="group relative bg-gradient-to-br from-[#1E1E1E] to-[#2B2B2B] rounded-2xl hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Spotlight Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C1FF72]/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              
              {/* Category Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-[#C1FF72] to-[#C1FF72] text-black text-sm font-bold px-8 py-1.5 rounded-full shadow-lg min-w-[180px] text-center whitespace-nowrap">
                  {casino.tags?.[0]?.title || tagOrder[index].toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-8 relative z-10 flex flex-col h-full">
                {/* Logo Container */}
                <div className="relative w-full aspect-square mb-6 bg-black/30 rounded-xl p-4">
                  <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={casino.imageUrl}
                      alt={casino.offerTitle}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-grow">
                  <div className="space-y-4">
                    <h3 className="text-white text-lg font-medium line-clamp-1 group-hover:text-[#C1FF72] transition-colors">
                      {casino.offerTitle}
                    </h3>
                    <p className="text-[#C1FF72] text-sm font-bold">
                      {casino.offerDescription}
                    </p>
                  </div>

                  {/* CTA Section */}
                  <div className="mt-auto pt-4 flex flex-col space-y-3">
                    <ClaimButton
                      offerUrl={casino.offerUrl}
                      offerTitle={casino.offerTitle}
                      categoryUrls={casino.categoryUrls}
                    />
                    
                    {casino.termsConditionsUrl && (
                      <Link 
                        href={casino.termsConditionsUrl}
                        className="relative text-[10px] text-center text-gray-400 hover:text-[#C1FF72] transition-colors z-20"
                      >
                        Terms & Conditions Apply
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopPicksComponent
