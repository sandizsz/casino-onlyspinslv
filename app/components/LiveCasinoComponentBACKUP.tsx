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
import { ChevronLeft, ChevronRight, Sparkles, Wallet, Shield } from 'lucide-react'

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

// Function to determine rank style based on index

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



const LiveCasinoComponent: React.FC<CasinoProps> = ({ casino, categorySlug }) => {
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
    <div className="group flex flex-col w-full rounded-3xl overflow-hidden shadow-lg mb-4 sm:mb-6 bg-[#000025] relative">
      {/* Animated Blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* First flame blob */}
        <div className="absolute top-[35%] left-[15%] w-[40%] h-[60%] bg-[#3930ff]/40 blur-[70px] animate-blob-flame"></div>
        {/* Second flame blob - positioned top right */}
        <div className="absolute top-[5%] right-[10%] w-[35%] h-[50%] bg-[#3930ff]/45 blur-[80px] animate-blob-flame-delayed"></div>
        {/* Third flame blob */}
        <div className="absolute bottom-[20%] right-[25%] w-[30%] h-[45%] bg-[#3930ff]/35 blur-[60px] animate-blob-flame" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-3xl z-10 border border-[#F9F5FF]/20 backdrop-blur-sm"></div>
      
      {/* Ensure content is above the glow */}
      <div className="relative z-10 w-full h-full">
      {/* Main container with dark background */}
      <div className="flex flex-col md:flex-row backdrop-blur-sm text-[#F9F5FF]">
        {/* Left column with logo */}
        <div className="w-full h-40 sm:h-48 md:h-auto md:w-1/4 bg-white backdrop-blur-sm relative overflow-hidden rounded-l-3xl">
          {/* Rank indicator */}
       
          <Image
            src={casino.imageUrl}
            alt={casino.offerTitle}
            fill
            className="object-contain scale-75 "
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
        </div>

        {/* Middle column with offer text */}
        <div className="flex-1 p-4 sm:p-6 bg-transparent backdrop-blur-md">
          {/* Casino title */}
          <h2 className="text-lg uppercase sm:text-xl font-bold text-[#F9F5FF] mb-2 sm:mb-3">{casino.offerTitle}</h2>
          
          {/* Custom bullet points as bubbles */}
          <div className="text-[#F9F5FF]">
            {casino.offerText && (
              <div className="flex flex-wrap gap-2 mt-2">
                {casino.offerText.map((block: PortableTextBlock, blockIndex: number) => {
                  // Only process bullet list blocks
                  if (block._type === 'block' && block.listItem === 'bullet') {
                    return (
                      <div 
                        key={blockIndex} 
                        className="inline-flex items-center bg-[#F9F5FF]/5 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-[#F9F5FF] border border-[#F9F5FF]/20 hover:border-[#8126FF]/40 transition-all hover:bg-[#F9F5FF]/10"
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
          <div className="mt-6 sm:mt-10 border-t border-[#F9F5FF]/10 pt-3 sm:pt-4">
            
            {/* Bottom info section with indicators and payment methods */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-3 sm:flex-nowrap sm:overflow-x-auto">
              {/* Free Spins - Only show if value exists */}
              {casino.freeSpins && (
                <>
                  <div className="flex items-center pr-3">
                    <Sparkles className="w-4 h-4 mr-1.5 text-[#773DFF]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{casino.freeSpins}</span>
                      <span className="text-[10px] text-[#F9F5FF]/70">Bezriska griezieni</span>
                    </div>
                  </div>
                  
                  {/* Separator */}
                  <div className="h-8 border-r border-[#F9F5FF]/20 mx-2"></div>
                </>
              )}
              
              {/* Min. iemaksa with wallet icon - Only show if value exists */}
              {casino.minDeposit && (
                <>
                  <div className="flex items-center px-3">
                    <Wallet className="w-4 h-4 mr-1.5 text-[#773DFF]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{casino.minDeposit}€</span>
                      <span className="text-[10px] text-[#F9F5FF]/70">Min. iemaksa</span>
                    </div>
                  </div>
                  
                  {/* Separator */}
                  <div className="h-8 border-r border-[#F9F5FF]/20 mx-2"></div>
                </>
              )}
              
              {/* License section - Only show if value exists */}
              {casino.license && (
                <>
                  <div className="flex items-center px-3">
                    <Shield className="w-4 h-4 mr-1.5 text-[#773DFF]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{casino.license}</span>
                      <span className="text-[10px] text-[#F9F5FF]/70">Licence</span>
                    </div>
                  </div>
                  
                  {/* Separator - hidden on mobile */}
                  <div className="hidden sm:block h-8 border-r border-[#F9F5FF]/20 mx-2"></div>
                </>
              )}
              
              {/* Payment methods on same line */}
              {casino.paymentMethods && casino.paymentMethods.length > 0 && (
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-1 ml-0 sm:ml-1 mt-2 sm:mt-0 w-full sm:w-auto">
                  {/* Previous button */}
                  <button 
                    onClick={prevMethod}
                    className="w-7 h-7 sm:w-5 sm:h-5 flex items-center justify-center bg-[#F9F5FF]/5 hover:bg-[#F9F5FF]/10 rounded-full transition-colors text-[#F9F5FF] border border-[#F9F5FF]/20"
                    aria-label="Previous payment method"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-3 sm:h-3" />
                  </button>
                  
                  {/* Payment method boxes */}
                  <div className="flex items-center space-x-2 sm:space-x-1 overflow-hidden max-w-[220px] sm:max-w-[150px]">
                    {currentMethods.map((method) => (
                      <div 
                        key={method._id}
                        className="w-10 h-10 sm:w-8 sm:h-8 bg-[#F9F5FF]/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[#F9F5FF]/20 shadow-sm transition-all duration-300 ease-in-out hover:border-[#8126FF]/40"
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
                    className="w-7 h-7 sm:w-5 sm:h-5 flex items-center justify-center bg-[#F9F5FF]/5 hover:bg-[#F9F5FF]/10 rounded-full transition-colors text-[#F9F5FF] border border-[#F9F5FF]/20"
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
        <div className="w-full md:w-1/4 p-4 sm:p-6 flex flex-col items-center justify-center bg-transparent backdrop-blur-md rounded-r-3xl">
          <div className="relative backdrop-blur-sm p-3 sm:p-4 rounded-2xl w-full text-center mb-3 sm:mb-4 border border-[#F9F5FF]/20">
            {/* Background gradient for the offer description */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
            <div className="relative text-sm sm:text-md font-bold text-[#F9F5FF]/80">{casino.offerDescription}</div>
          </div>
          
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
                  color: '#F9F5FF',
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
                      fill: '#F9F5FF'
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
          
          {/* Claim button - using your component */}
          <div className="w-full transform hover:scale-105 transition-transform duration-300">
            <ClaimButton 
              offerUrl={casino.offerUrl}
              offerTitle={casino.offerTitle}
              categorySlug={categorySlug}
              categoryUrls={casino.categoryUrls}
              className="group relative px-5 sm:px-6 py-2 sm:py-3 bg-[#8126FF] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden transition-transform hover:scale-105 backdrop-blur-md bg-opacity-50 w-full whitespace-nowrap shadow-md hover:shadow-lg"
            />
          </div>
          
          {casino.termsConditionsUrl && (
            <a
              href={casino.termsConditionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-[#F9F5FF]/70 hover:text-[#F9F5FF] hover:underline transition-colors duration-300"
            >
              Noteikumi un nosacījumi
            </a>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default LiveCasinoComponent;