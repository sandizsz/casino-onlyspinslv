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
import { ChevronLeft, ChevronRight, Sparkles, Wallet, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';

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



const CasinoComponent2: React.FC<CasinoProps> = ({ casino, index, categorySlug }) => {
  // State for payment methods pagination
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const methodsToShow = 3;
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
        <div className="w-full h-40 sm:h-48 md:h-auto md:w-1/4 bg-white relative min-h-[260px]">

          <Image
            src={casino.imageUrl}
            alt={casino.offerTitle}
            fill
            className="object-contain scale-75 "
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
        </div>

         {/* Position Number */}
         <div className="z-10 absolute rounded-tl-lg rounded-br-lg  ">
            {/* RTP gauge using the rating */}
            <div className="flex flex-col items-center max-w-[60px]">
            <div className="w-[105px] h-[60px]">
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
                  width: 20,
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
                      fill: '#000025',
                      textShadow: 'none'
                    
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
                
              />
            </div>
          </div>
        </div>

            {/* Middle column with offer text */}
            <div className="flex-1 p-4 sm:p-6 bg-transparent backdrop-blur-md">
          {/* Casino title */}
          <h2 className="text-lg uppercase sm:text-xl font-bold text-[#000025] mb-2 sm:mb-3">{casino.offerTitle}</h2>
          
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

          {/* Payment methods section */}
          <div className="mt-6 sm:mt-10 border-t border-[#000025]/20 pt-3 sm:pt-4">
            
            {/* Bottom info section with indicators and payment methods */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-3 sm:flex-nowrap sm:overflow-x-auto">
              {/* Min. iemaksa with wallet icon - Only show if value exists */}
              {casino.minDeposit && (
                <>
                  <div className="flex items-center px-3">
                    <Wallet className="w-4 h-4 mr-1.5 text-[#773DFF]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{casino.minDeposit}€</span>
                      <span className="text-[11px] text-gray-600 font-medium">Min. iemaksa</span>
                    </div>
                  </div>
                  
                  {/* Separator */}
                  <div className="h-8 border-r border-[#000025]/20 mx-2"></div>
                </>
              )}
              
              {/* License section - Only show if value exists */}
              {casino.license && (
                <>
                  <div className="flex items-center px-3">
                    <Shield className="w-4 h-4 mr-1.5 text-[#773DFF]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{casino.license}</span>
                      <span className="text-[11px] text-gray-600 font-medium">Licence</span>
                    </div>
                  </div>
                  
                  {/* Separator - hidden on mobile */}
                  <div className="hidden sm:block h-8 border-r border-[#000025]/20 mx-2"></div>
                </>
              )}
              
              {/* Payment methods on same line */}
              {casino.paymentMethods && casino.paymentMethods.length > 0 && (
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-1 ml-0 sm:ml-1 mt-2 sm:mt-0 w-full sm:w-auto">
                  {/* Previous button */}
                  <button 
                    onClick={prevMethod}
                    className="w-7 h-7 sm:w-5 sm:h-5 flex items-center justify-center  hover:bg-[#000025]/10 rounded-full transition-colors text-[#000025] border border-[#000025]/20"
                    aria-label="Previous payment method"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-3 sm:h-3" />
                  </button>
                  
                  {/* Payment method boxes */}
                  <div className="flex items-center space-x-2 sm:space-x-1 overflow-hidden max-w-[220px] sm:max-w-[150px]">
                    {currentMethods.map((method) => (
                      <div 
                        key={method._id}
                        className="w-12 h-12 sm:w-10 sm:h-10 backdrop-blur-sm rounded-md flex items-center justify-center border border-[#000025]/20 shadow-sm transition-all duration-300 ease-in-out"
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
                  
                  {/* Next button */}
                  <button 
                    onClick={nextMethod}
                    className="w-7 h-7 sm:w-5 sm:h-5 flex items-center justify-center  hover:bg-[#000025]/10 rounded-full transition-colors text-[#000025] border border-[#000025]/20"
                    aria-label="Next payment method"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-3 sm:h-3" />
                  </button>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Right column with CTA */}
        <div className="w-full md:w-[30%] p-4 sm:p-6 flex flex-col items-center justify-center bg-white/80">
          <div className="relative backdrop-blur-sm px-3 py-6 sm:px-4 sm:py-6 rounded-2xl w-full text-center mb-3 sm:mb-4 border border-[#F9F5FF]/20">
            {/* Background gradient for the offer description */}
            <div className="absolute inset-0 bg-[#000025] rounded-2xl"></div>
            <Link href={casino.offerUrl}>
              <div className="relative text-md sm:text-lg font-bold text-[#F9F5FF]">
                {casino.offerDescription}
                {casino.freeSpins && (
                  <div className="mt-1 flex items-center justify-center">
                    <span className="text-xs font-medium text-[#F9F5FF]/80">+</span>
                    <Sparkles className="w-3 h-3 mx-1 text-[#773DFF]" />
                    <span className="text-xs font-medium text-[#F9F5FF]/80">{casino.freeSpins} Bezriska griezieni</span>
                  </div>
                )}
              </div>
            </Link>
          </div>
          
          {/* RTP gauge using the rating 
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
                      fill: '#000025',
                      textShadow: 'none !important'
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
          </div>*/}
          
          {/* Claim button - using your component */}
          <div className="w-full transform hover:scale-105 transition-transform duration-300">
            <ClaimButton 
              offerUrl={casino.offerUrl}
              offerTitle={casino.offerTitle}
              categorySlug={categorySlug}
              categoryUrls={casino.categoryUrls}
              className="group relative px-5 sm:px-6 py-6 sm:py-6 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden transition-transform hover:scale-105 backdrop-blur-md bg-opacity-50 w-full whitespace-nowrap shadow-md hover:shadow-lg"
            />
          </div>
          
          {casino.termsConditionsUrl && (
            <a
              href={casino.termsConditionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-gray-600 hover:text-[#000025] hover:underline transition-colors duration-300"
            >
              Noteikumi un nosacījumi
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CasinoComponent2;