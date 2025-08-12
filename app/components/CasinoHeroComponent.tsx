"use client"

import Image from "next/image";
import { TypedObject } from '@portabletext/types'
import ClaimButton from './ClaimButton';
import { Sparkles, Wallet, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import GaugeComponent from 'react-gauge-component';
import { useState } from 'react';

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

// Define interfaces
interface SanityImage {
  asset: {
    _ref: string;
  };
  alt?: string;
}

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
  slug?: {
    current: string;
  };
}

interface PaymentMethod {
  _id: string;
  title: string;
  paymentImage?: SanityImage;
  name?: string;
  image?: {
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
  slug: {
    current: string;
  };
  casinoImage?: SanityImage;
  offerDescription?: string;
  rating?: number;
  bonusCode?: string;
  offerUrl?: string;
  termsConditionsUrl?: string;
  offerText?: TypedObject[];
  categories?: Category[];
  tags?: Tag[];
  freeSpins?: number;
  license?: string;
  minDeposit?: number;
  paymentMethods?: PaymentMethod[];
  categoryUrls?: CategoryUrl[];
}

interface CasinoHeroProps {
  casino: Casino;
  casinoImageUrl: string;
  paymentMethodImageUrls: Record<string, string>;
}

const CasinoHeroComponent: React.FC<CasinoHeroProps> = ({ casino, casinoImageUrl, paymentMethodImageUrls }) => {
  // State for payment methods pagination
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const methodsToShow = 5; // Show exactly 5 boxes
  
  // Filter out payment methods without images
  const filteredMethods = casino.paymentMethods?.filter(method => 
    method._id && (method.image?.asset?.url || paymentMethodImageUrls[method._id])
  ) || [];
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
    // Only try to get methods if we have any
    if (totalMethods > 0) {
      // Always show exactly methodsToShow boxes (5)
      const visibleCount = Math.min(methodsToShow, totalMethods);
      for (let i = 0; i < visibleCount; i++) {
        const index = (startIndex + i) % totalMethods;
        result.push(filteredMethods[index]);
      }
      
      // If we have fewer than methodsToShow methods, duplicate them to fill the carousel
      if (totalMethods < methodsToShow) {
        let extraIndex = 0;
        while (result.length < methodsToShow) {
          result.push({...filteredMethods[extraIndex % totalMethods]});
          extraIndex++;
        }
      }
    }
    return result;
  };
  
  const currentMethods = totalMethods > 0 ? getVisibleMethods() : [];

  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1D053F] to-[#110226] rounded-t-0 lg:rounded-t-3xl rounded-b-3xl pt-16 sm:pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#000025] to-transparent" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto min-h-[75vh] px-4 sm:px-6 lg:px-8 flex items-center justify-center max-w-[1300px]">
        <div className="w-full py-6 sm:py-8 md:py-12 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
          {/* Casino card - Left side */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:sticky lg:top-24">
            {/* Title and description - Mobile & Tablet only */}
            <div className="w-full lg:hidden mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center text-[#F9F5FF]">{casino.offerTitle}</h1>
              
              {casino.offerDescription && (
                <p className="text-base sm:text-lg text-[#F9F5FF]/90 text-center">{casino.offerDescription}</p>
              )}
            </div>
            
            {/* Casino image */}
            {casinoImageUrl && (
              <div className="bg-white p-3 rounded-xl shadow-lg lg:mb-4 mb-0 w-full relative">
                {/* Bonus Code Box */}
                {casino.bonusCode && (
                  <div className="absolute top-[-1px] left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-[#1D053F] px-3 py-[3px] rounded-b-md flex items-center w-max">
                      <span className="text-[#F9F5FF] text-[12px] leading-tight mr-1">Bonusa kods:</span>
                      <span className="text-[12px] leading-tight uppercase font-bold bg-clip-text text-[#ffda23]">{casino.bonusCode}</span>
                    </div>
                  </div>
                )}
                <div className="mx-auto aspect-square flex items-center justify-center" style={{ maxWidth: '220px' }}>
                  <Image
                    src={casinoImageUrl}
                    alt={casino.offerTitle}
                    width={180}
                    height={180}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
                
                {/* Rating box removed from mobile */}
              </div>
            )}
            
            {/* Rating display - Desktop only */}
            {casino.rating && (
              <div className="w-full mb-4 hidden lg:block">
                <div className="bg-[#8126FF]/20 p-3 rounded-lg">
                  <div className="text-center mb-1">
                    <h3 className="text-[10px] uppercase text-[#F9F5FF]/70 mb-1 text-center">Vērtējums</h3>
                  </div>
                  <div className="flex flex-col items-center">
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
                          color: '#F9F5FF',
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
                              fill: '#F9F5FF',
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
              </div>
            )}
          </div>
          
          {/* Casino details - Right side */}
          <div className="w-full lg:w-2/3 text-[#F9F5FF] flex flex-col">
            {/* Title and description - Desktop only */}
            <div className="mb-6 hidden lg:block">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-left">{casino.offerTitle}</h1>
              
              {casino.offerDescription && (
                <p className="text-base sm:text-lg text-[#F9F5FF]/90 text-left">{casino.offerDescription}</p>
              )}
            </div>
            
            {/* Feature boxes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {casino.freeSpins !== undefined && (
                <div className="bg-[#8126FF]/20 p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-[90px] sm:h-[100px]">
                  <div className="flex-shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#F9F5FF]/70 mb-1" />
                  </div>
                  <h3 className="text-[10px] uppercase text-[#F9F5FF]/70 mb-1 text-center">Bezriska griezieni</h3>
                  <p className="text-base lg:text-lg font-bold">{casino.freeSpins}</p>
                </div>
              )}
              
              {casino.minDeposit !== undefined && (
                <div className="bg-[#8126FF]/20 p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-[90px] sm:h-[100px]">
                  <div className="flex-shrink-0">
                    <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-[#F9F5FF]/70 mb-1" />
                  </div>
                  <h3 className="text-[10px] uppercase text-[#F9F5FF]/70 mb-1 text-center">Min. iemaksa</h3>
                  <p className="text-base lg:text-lg font-bold">€{casino.minDeposit}</p>
                </div>
              )}
              
              {casino.license && (
                <div className="bg-[#8126FF]/20 p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-[90px] sm:h-[100px]">
                  <div className="flex-shrink-0">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#F9F5FF]/70 mb-1" />
                  </div>
                  <h3 className="text-[10px] uppercase text-[#F9F5FF]/70 mb-1 text-center">Licence</h3>
                  <p className="text-base lg:text-lg font-bold">{casino.license}</p>
                </div>
              )}
              
              {casino.bonusCode && (
                <div className="bg-[#8126FF]/20 p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-[90px] sm:h-[100px]">
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#F9F5FF]/70 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M7 15h0M12 15h0M17 15h0" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] uppercase text-[#F9F5FF]/70 mb-1 text-center">Bonusa kods</h3>
                  <p className="text-base lg:text-lg font-bold">{casino.bonusCode}</p>
                </div>
              )}
            </div>
            
            {/* Payment methods carousel */}
            {casino.paymentMethods && casino.paymentMethods.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[10px] uppercase text-[#F9F5FF]/70 mb-1 pb-2 text-center lg:text-left">Maksājumu metodes</h3>
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  {/* Previous button */}
                  <button 
                    onClick={prevMethod}
                    className="w-5 h-5 flex items-center justify-center bg-[#F9F5FF]/5 hover:bg-[#F9F5FF]/10 rounded-full transition-colors text-[#F9F5FF] border border-[#F9F5FF]/20"
                    aria-label="Previous payment method"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  
                  {/* Payment method boxes */}
                  <div className="flex items-center space-x-2 overflow-hidden max-w-[300px] sm:max-w-[400px]">
                    {currentMethods.map((method: PaymentMethod, index: number) => (
                      <div 
                        key={`${method._id}-${index}`}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F9F5FF]/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#F9F5FF]/20 shadow-sm transition-all duration-300 ease-in-out hover:border-[#8126FF]/40"
                      >
                        {method.image?.asset?.url ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={method.image.asset.url}
                              alt={method.name || 'Payment method'}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ) : paymentMethodImageUrls[method._id] ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={paymentMethodImageUrls[method._id]}
                              alt={method.name || 'Payment method'}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  
                  {/* Next button */}
                  <button 
                    onClick={nextMethod}
                    className="w-5 h-5 flex items-center justify-center bg-[#F9F5FF]/5 hover:bg-[#F9F5FF]/10 rounded-full transition-colors text-[#F9F5FF] border border-[#F9F5FF]/20"
                    aria-label="Next payment method"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
            
            {/* CTA buttons */}
            {casino.offerUrl && (
              <div className="mt-0 lg:mt-auto w-full max-w-full lg:max-w-full mx-auto lg:mx-0">
                <ClaimButton 
                  offerUrl={casino.offerUrl} 
                  offerTitle={casino.offerTitle}
                  categoryUrls={casino.categoryUrls}
                  className="group relative px-5 sm:px-6 py-6 sm:py-6 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-lg sm:text-xl rounded-xl overflow-hidden transition-transform hover:scale-101 backdrop-blur-md bg-opacity-50 w-full whitespace-nowrap shadow-md hover:shadow-lg"
                />
                
                {casino.termsConditionsUrl && (
                  <div className="mt-2 text-center lg:text-left">
                    <Link 
                      href={casino.termsConditionsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-[#F9F5FF]/50 hover:text-[#F9F5FF] hover:underline text-center transition-colors duration-300"
                    >
                      Noteikumi un nosacījumi
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoHeroComponent;
