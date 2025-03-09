"use client"

import Image from "next/image";
import { TypedObject } from '@portabletext/types'

// Define more specific types for Portable Text blocks
interface PortableTextBlock extends TypedObject {
  _type: string;
  listItem?: string;
  children?: Array<{
    _type?: string;
    text: string;
    marks?: string[];
  }>;
}
import ClaimButton from './ClaimButton';
import GaugeComponent from 'react-gauge-component'
import { useState} from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Wallet, Shield, CreditCard } from 'lucide-react'

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface Tag {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface PaymentMethod {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
}

interface CategoryUrl {
  categoryId: string;
  categorySlug: string;
  url: string;
  urlNumber?: string;
}

interface Casino {
  _id: string;
  offerTitle: string;
  offerUrl: string;
  offerDescription: string;
  offerText: TypedObject[];
  rating: number;
  imageUrl: string;
  termsConditionsUrl: string;
  categories: Category[];
  tags: Tag[];
  paymentMethods: PaymentMethod[];
  orderRank?: number;
  categoryUrls?: CategoryUrl[];
  freeSpins?: number;
  license?: string;
  minDeposit?: number;
}

interface CasinoProps {
  casino: Casino;
  index: number;
  categorySlug?: string;
}



// Function to get gauge colors based on rating
const getGaugeColors = (rating: number): string[] => {
  if (rating >= 9) {
    // Excellent - Light to very dark purple gradient
    return ['#F3E8FF', '#3B0764']; // Very light purple to very dark purple
  } else if (rating >= 8) {
    // Very good - Light to dark purple gradient
    return ['#EDE9FE', '#4C1D95']; // Light purple to dark purple
  } else if (rating >= 7) {
    // Good - Light to medium dark purple gradient
    return ['#E9D5FF', '#5B21B6']; // Light purple to medium dark purple
  } else if (rating >= 6) {
    // Above average - Light to medium purple gradient
    return ['#F5F3FF', '#6D28D9']; // Light purple to medium purple
  } else {
    // Default - Original purple gradient
    return ['#F9F5FF', '#8126FF']; // Original light to medium purple
  }
};

// Function to get gauge arc color based on rating
const getGaugeArcColor = (rating: number): string => {
  if (rating >= 9) {
    return '#2E1065'; // Very dark purple
  } else if (rating >= 8) {
    return '#3B0764'; // Dark purple
  } else if (rating >= 7) {
    return '#4C1D95'; // Medium dark purple
  } else if (rating >= 6) {
    return '#5B21B6'; // Medium purple
  } else {
    return '#6D28D9'; // Original purple
  }
};

// Function to get value label color based on rating
const getValueLabelColor = (rating: number): string => {
  if (rating >= 9) {
    return '#2E1065'; // Very dark purple
  } else if (rating >= 8) {
    return '#3B0764'; // Dark purple
  } else if (rating >= 7) {
    return '#4C1D95'; // Medium dark purple
  } else if (rating >= 6) {
    return '#5B21B6'; // Medium purple
  } else {
    return '#6D28D9'; // Original purple
  }
};

const CasinoComponent2: React.FC<CasinoProps> = ({ casino, categorySlug }) => {
  // State for payment methods pagination
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const methodsToShow = 5;
  const filteredMethods = casino.paymentMethods?.filter(method => method.image?.asset?.url) || [];
  const totalMethods = filteredMethods.length;
  
  // Handler functions for pagination
  const nextMethod = () => {
    if (totalMethods > methodsToShow && !isAnimating) {
      setIsAnimating(true);
      setStartIndex((prev) => (prev + 1) % totalMethods);
      setTimeout(() => setIsAnimating(false), 300); // Match this with the CSS transition duration
    }
  };
  
  const prevMethod = () => {
    if (totalMethods > methodsToShow && !isAnimating) {
      setIsAnimating(true);
      setStartIndex((prev) => (prev - 1 + totalMethods) % totalMethods);
      setTimeout(() => setIsAnimating(false), 300); // Match this with the CSS transition duration
    }
  };
  
  // Get methods to display with circular array logic
  const getVisibleMethods = () => {
    const result = [];
    for (let i = 0; i < methodsToShow; i++) {
      const index = (startIndex + i) % totalMethods;
      result.push(filteredMethods[index]);
    }
    return result;
  };
  
  const currentMethods = totalMethods > 0 ? getVisibleMethods() : [];
  return (
    <div className="flex flex-col w-full rounded-lg overflow-hidden shadow-lg mb-4 sm:mb-6">
      {/* Main container with light background */}
      <div className="flex flex-col md:flex-row bg-white/80 backdrop-blur-sm text-[#000025]">
        {/* Left column with logo */}
        <div className="w-full h-40 sm:h-48 md:h-auto md:w-1/4 bg-white relative">

          <Image
            src={casino.imageUrl}
            alt={casino.offerTitle}
            fill
            className="object-contain scale-75 "
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
        </div>

        {/* Right column with content in two rows */}
        <div className="flex-1 p-6 bg-[#F9F5FF] flex flex-col">
          {/* First row: Title and tags on left, bonus description on right */}
          <div className="flex-1 flex flex-col md:flex-row gap-4 mb-4">
            {/* Left column (55%): Casino title and tags */}
            <div className="md:w-[55%] flex flex-col justify-start">
              {/* Casino title */}
              <h2 className="text-lg font-light uppercase text-[#000025] mb-2 sm:mb-0">{casino.offerTitle}</h2>
              
              {/* Custom bullet points as bubbles */}
              <div className="text-[#000025]">
                {casino.offerText && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {casino.offerText.map((block: PortableTextBlock, blockIndex: number) => {
                      // Only process bullet list blocks
                      if (block._type === 'block' && block.listItem === 'bullet') {
                        return (
                          <div 
                            key={blockIndex} 
                            className="inline-flex items-center bg-purple-100/70 px-1.5 py-0.5 rounded-full text-[10px] text-purple-900 border border-purple-200"
                          >
                            {block.children?.map((child: { text: string }, childIndex: number) => (
                              <span key={childIndex}>{child.text}</span>
                            ))}
                          </div>
                        );
                      }
                      // For non-bullet content, use regular PortableText
                      if (block._type === 'block' && !block.listItem) {
                        return (
                          <div key={blockIndex} className="mb-2">
                            {block.children?.map((child: { text: string }, childIndex: number) => (
                              <span key={childIndex}>{child.text}</span>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column (45%): Bonus description */}
            <div className="md:w-[45%] flex items-center">
              <div className="bg-white/80 p-3 sm:p-5 rounded-lg w-full border border-gray-200 flex items-center justify-center h-full">
                <div className="text-sm sm:text-lg font-bold text-[#000025] text-center">{casino.offerDescription}</div>
              </div>
            </div>
          </div>

          {/* Second row: Indicators, gauge, and claim button */}
          <div className="mt-4 sm:mt-6 border-t pt-3 sm:pt-4 flex flex-col md:flex-row gap-4">
            {/* Left side: Indicators and payment methods (55%) */}
            <div className="md:w-[55%]">
              {/* Indicators section */}
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start mb-5">
                {/* Free Spins - Only show if value exists */}
                {casino.freeSpins && (
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5 text-[#000025]" />
                    <div className="flex flex-col ml-1">
                      <span className="text-[11px] text-gray-600 font-medium">Bezriska griezieni</span>
                      <span className="text-sm font-bold text-[#000025]">{casino.freeSpins}</span>
                    </div>
                  </div>
                )}
                
                {/* Min. iemaksa with wallet icon - Only show if value exists */}
                {casino.minDeposit && (
                  <div className="flex items-center ">
                    <Wallet className="w-4 h-4 mr-1.5 text-[#000025]" />
                    <div className="flex flex-col ml-1">
                      <span className="text-[11px] text-gray-600 font-medium">Min. iemaksa</span>
                      <span className="text-sm font-bold text-[#000025]">{casino.minDeposit}€</span>
                    </div>
                  </div>
                )}
                
                {/* License section - Only show if value exists */}
                {casino.license && (
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1.5 text-[#000025]" />
                    <div className="flex flex-col ml-1">
                      <span className="text-[11px] text-gray-600 font-medium">Licence</span>
                      <span className="text-sm font-bold text-[#000025]">{casino.license}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payment methods section */}
              {casino.paymentMethods && casino.paymentMethods.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <div className="flex items-center">
                      <CreditCard className="w-3.5 h-3.5 mr-1 text-[#000025]" />
                      <span className="text-[11px] text-gray-600 font-medium">Maksājumu metodes</span>
                    </div>
                    <div className="flex items-center gap-1 pl-2">
                      <button 
                        onClick={prevMethod}
                        className="w-5 h-5 flex items-center justify-center bg-[#000025]/10 hover:bg-[#000025]/20 rounded-full transition-colors"
                        aria-label="Previous payment method"
                      >
                        <ChevronLeft className="w-3 h-3 text-[#000025]" />
                      </button>
                      <button 
                        onClick={nextMethod}
                        className="w-5 h-5 flex items-center justify-center bg-[#000025]/10 hover:bg-[#000025]/20 rounded-full transition-colors"
                        aria-label="Next payment method"
                      >
                        <ChevronRight className="w-3 h-3 text-[#000025]" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start">
                  {/* Payment method boxes */}
                  <div className="flex items-center justify-between gap-3 overflow-hidden mt-2">
                    {currentMethods.map((method) => (
                      <div 
                        key={method._id}
                        className="w-10 h-10 sm:w-8 sm:h-8 bg-white rounded-md flex items-center justify-center border border-[#000025]/10 transition-all duration-200 ease-in-out hover:border-[#000025]/30 hover:shadow-sm hover:scale-105"
                      >
                        {method.image?.asset?.url && (
                          <div className="relative w-full h-full">
                            <Image
                              src={method.image.asset.url}
                              alt={method.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  

                  </div>
                </div>
              )}
            </div>
            
            {/* Right side: Gauge and claim button (45%) */}
            <div className="md:w-[45%] flex flex-col items-center">
              {/* RTP gauge using the rating */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-[120px] h-[75px]">
              <GaugeComponent
                id={`gauge-${casino._id}`}
                type="semicircle"
                arc={{
                  colorArray: getGaugeColors(casino.rating),
                  subArcs: [{
                    limit: 10,
                    color: getGaugeArcColor(casino.rating),
                    showTick: true
                  }],
                  width: 0.2,
                  padding: 0.02,
                  cornerRadius: 1,
                  gradient: true
                }}
                pointer={{
                  type: "arrow",
                  color: '#000025',
                  length: 10,
                  width: 40,
                  elastic: true
                }}
                value={casino.rating}
                minValue={0}
                maxValue={10}
                labels={{
                  valueLabel: {
                    formatTextValue: value => value.toFixed(1),
                    style: { 
                      fontSize: "60px",
                      fontWeight: "bold",
                      fill: '#000025'
                    }
                  },
                  tickLabels: {
                    hideMinMax: true,
                    ticks: [],
                    defaultTickValueConfig: {
                      hide: true
                    },
                    defaultTickLineConfig: {
                      hide: true
                    }
                  }
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          
              </div>
              
              {/* Claim button */}
              <div className="w-[75%] transform hover:scale-105 transition-transform duration-300">
                <ClaimButton 
                  offerUrl={casino.offerUrl}
                  offerTitle={casino.offerTitle}
                  categorySlug={categorySlug}
                  categoryUrls={casino.categoryUrls}
                  className="w-full bg-gradient-to-r from-[#000025] to-[#000040] hover:from-[#000030] hover:to-[#000050] shadow-md hover:shadow-lg text-xs py-1.5 px-4"
                />
              </div>
              
              {casino.termsConditionsUrl && (
                <a
                  href={casino.termsConditionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs text-[#000025]/70 hover:text-[#000025] hover:underline transition-colors duration-300"
                >
                  Noteikumi un nosacījumi
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoComponent2;