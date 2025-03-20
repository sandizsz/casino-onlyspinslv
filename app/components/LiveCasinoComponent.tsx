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
import { ChevronLeft, ChevronRight, Sparkles, Wallet, Shield } from 'lucide-react';
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
  bonusCode?: string;
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



const CasinoComponent2: React.FC<CasinoProps> = ({ casino, categorySlug }) => {
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
      {/* Main container with light background */}
      <div className="flex flex-col md:flex-row backdrop-blur-sm text-[#F9F5FF]">
        {/* Left column with logo - Visible on all devices, smaller on mobile */}
        <div className="w-full h-28 sm:h-36 md:h-auto md:w-1/4 md:min-w-[150px] bg-white relative min-h-[120px] sm:min-h-[150px] md:min-h-[260px] md:flex-shrink-0">
          {/* Bonus Code Box */}
          {casino.bonusCode && (
            <div className="absolute top-[-1px] left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-[#1D053F] px-3 py-[3px] rounded-b-md border flex items-center w-max">
                <span className="text-[#F9F5FF] text-[12px] leading-tight mr-1">Bonusa kods:</span>
                <span className="text-[12px] leading-tight uppercase font-bold bg-clip-text text-[#ffda23]">{casino.bonusCode}</span>
              </div>
            </div>
          )}
          <Image
            src={casino.imageUrl}
            alt={casino.offerTitle}
            fill
            className="object-contain scale-75"
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
        </div>

        {/* Middle column - Desktop: offer text, Mobile: top section with gauge and payment methods */}
        <div className="flex-1 p-4 pb-3 pt-2 sm:p-4 md:pr-0  md:flex-shrink-1 md:min-w-0 md:overflow-hidden">
          {/* Desktop only: Casino title */}
          <h2 className="hidden md:block text-lg uppercase sm:text-xl font-bold text-[#F9F5FF] mb-2 sm:mb-3">{casino.offerTitle}</h2>
          
          {/* Desktop only: Custom bullet points as bubbles */}
          <div className="hidden md:block ">
            {casino.offerText && (
              <div className="flex flex-wrap gap-2 mt-2">
                {casino.offerText.map((block: PortableTextBlock, blockIndex: number) => {
                  // Only process bullet list blocks
                  if (block._type === 'block' && block.listItem === 'bullet') {
                    return (
                      <div 
                        key={blockIndex} 
                        className="inline-flex items-center bg-[#F9F5FF]/5 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[10px] text-[#F9F5FF] border border-[#F9F5FF]/20 hover:border-[#8126FF]/40 transition-all hover:bg-[#F9F5FF]/10"
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

          {/* Mobile & Tablet: Top section with gauge and payment methods */}
          <div className="md:mt-6 md:border-t md:border-[#000025]/20 md:pt-3 sm:pt-0">
            {/* Mobile & Tablet: Info section with gauge and payment methods */}
            <div className="flex items-center md:flex-wrap md:gap-y-3">
              <div className="flex items-center md:flex-grow-0 md:flex-shrink-0">
                {/* RTP gauge using the rating - Left side on mobile */}
                <div className="flex flex-col items-center max-w-[60px] md:mr-2">
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
                
                {/* Mobile & Tablet: Min deposit with separator */}
                {casino.minDeposit && (
                  <div className="flex items-center md:hidden ml-1">
                    <div className="h-8 border-r border-[#F9F5FF]/20 mx-2"></div>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{casino.minDeposit}€</span>
                        <span className="text-[11px]  text-[#F9F5FF]/70 font-medium">Min. iemaksa</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop indicators container */}
              <div className="hidden md:flex md:items-center md:h-12 md:flex-shrink-0">
                {/* First separator */}
                <div className="h-8 border-r border-[#000025]/20 ml-1 mr-2"></div>

                {/* Min. iemaksa with wallet icon */}
                {casino.minDeposit && (
                  <>
                    <div className="flex items-center px-2">
                      <Wallet className="w-4 h-4 mr-1.5 text-[#8126FF]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{casino.minDeposit}€</span>
                        <span className="text-[11px] text-[#F9F5FF]/70 font-medium">Min. iemaksa</span>
                      </div>
                    </div>
                    <div className="h-8 border-r border-[#000025]/20 mx-2"></div>
                  </>
                )}
                
                {/* License section */}
                {casino.license && (
                  <>
                    <div className="flex items-center px-2">
                      <Shield className="w-4 h-4 mr-1.5 text-[#8126FF]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{casino.license}</span>
                        <span className="text-[11px] text-[#F9F5FF]/70 font-medium">Licence</span>
                      </div>
                    </div>
                    <div className="h-8 border-r border-[#000025]/20 mx-2"></div>
                  </>
                )}
              </div>
              
              {/* Payment methods - Right side on mobile, left side on tablet/desktop */}
              {casino.paymentMethods && casino.paymentMethods.length > 0 && (
                <div className="flex items-center ml-auto md:ml-0 space-x-1 md:space-x-2 md:mt-0 w-auto md:flex-shrink-0">
                  {/* Previous button */}
                  <button 
                    onClick={prevMethod}
                    className="w-5 h-5 flex items-center justify-center bg-[#F9F5FF]/5 hover:bg-[#F9F5FF]/10 rounded-full transition-colors text-[#F9F5FF] border border-[#F9F5FF]/20"
                    aria-label="Previous payment method"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  
                  {/* Payment method boxes */}
                  <div className="flex items-center space-x-1 overflow-hidden max-w-[120px] md:max-w-[150px]">
                    {currentMethods.map((method) => (
                      <div 
                        key={method._id}
                        className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F5FF]/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[#F9F5FF]/20 shadow-sm transition-all duration-300 ease-in-out hover:border-[#8126FF]/40"
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
                    className="w-5 h-5 flex items-center justify-center bg-[#F9F5FF]/5 hover:bg-[#F9F5FF]/10 rounded-full transition-colors text-[#F9F5FF] border border-[#F9F5FF]/20"
                    aria-label="Next payment method"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile & Tablet: Layout for offer description and free spins */}
          <div className="md:hidden grid gap-3" style={{ gridTemplateColumns: (casino.offerDescription && casino.freeSpins) ? '1fr 1fr' : '1fr' }}>
            {/* Container to ensure equal height for both boxes */}
            <div className="contents" id="equal-height-boxes">
              {/* Offer description box - only shown if there's an offer description */}
              {casino.offerDescription && (
                <Link
                  href={categorySlug && casino.categoryUrls?.length
                    ? `/${casino.offerTitle.toLowerCase().replace(/\s+/g, '')}-offer${casino.categoryUrls.find(cu => cu.categorySlug === categorySlug)?.urlNumber || ''}`
                    : `/${casino.offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      categorySlug && casino.categoryUrls?.length
                        ? casino.categoryUrls.find(cu => cu.categorySlug === categorySlug)?.url || casino.offerUrl
                        : casino.offerUrl,
                      '_blank'
                    );
                  }}
                  className="transition-transform hover:scale-105 h-full"
                >
                  <div className="relative backdrop-blur-sm px-3 py-4 rounded-xl text-center border border-[#F9F5FF]/20 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="absolute inset-0 bg-[#000025] rounded-xl"></div>
                    <div className="relative flex flex-col items-center justify-center w-full">
                      <div className="text-base sm:text-lg font-bold text-[#F9F5FF] leading-tight">{casino.offerDescription}</div>
                      <div className="flex items-center text-xs sm:text-sm font-medium text-[#F9F5FF]/80 mt-1">
                        <span>Bonuss</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
              
              {/* Free spins box */}
              {casino.freeSpins && (
                <Link
                  href={categorySlug && casino.categoryUrls?.length
                    ? `/${casino.offerTitle.toLowerCase().replace(/\s+/g, '')}-offer${casino.categoryUrls.find(cu => cu.categorySlug === categorySlug)?.urlNumber || ''}`
                    : `/${casino.offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      categorySlug && casino.categoryUrls?.length
                        ? casino.categoryUrls.find(cu => cu.categorySlug === categorySlug)?.url || casino.offerUrl
                        : casino.offerUrl,
                      '_blank'
                    );
                  }}
                  className={`transition-transform hover:scale-105 h-full ${!casino.offerDescription ? 'col-span-full' : ''}`}
                >
                  <div className="relative backdrop-blur-sm px-3 py-4 rounded-xl text-center border border-[#F9F5FF]/20 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="absolute inset-0 bg-[#000025] rounded-xl"></div>
                    <div className="relative flex flex-col items-center justify-center w-full">
                      <div className="text-base sm:text-lg font-bold text-[#F9F5FF] leading-tight">{casino.freeSpins}</div>
                      <div className="flex items-center text-xs sm:text-sm font-medium text-[#F9F5FF]/80 mt-1">
                        <span>Bezriska griezieni</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Desktop only: Right column with CTA */}
        <div className="hidden md:flex w-full md:w-[30%] p-4 sm:p-6 flex-col items-center justify-center ">
          <Link
            href={categorySlug && casino.categoryUrls?.length
              ? `/${casino.offerTitle.toLowerCase().replace(/\s+/g, '')}-offer${casino.categoryUrls.find(cu => cu.categorySlug === categorySlug)?.urlNumber || ''}`
              : `/${casino.offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`
            }
            onClick={(e) => {
              e.preventDefault();
              window.open(
                categorySlug && casino.categoryUrls?.length
                  ? casino.categoryUrls.find(cu => cu.categorySlug === categorySlug)?.url || casino.offerUrl
                  : casino.offerUrl,
                '_blank'
              );
            }}
            className="w-full flex-grow mb-3 transition-transform hover:scale-105"
          >
            <div className="relative backdrop-blur-sm px-3 py-6 sm:px-4 sm:py-6 rounded-2xl w-full text-center mb-3 sm:mb-4 border border-[#F9F5FF]/20 flex-grow flex items-center justify-center h-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
              {/* Background gradient for the offer description */}
              <div className="absolute inset-0 bg-[#000025] rounded-2xl"></div>
              <div className="relative text-md sm:text-lg font-bold text-[#F9F5FF] flex flex-col items-center justify-center">
                {casino.offerDescription ? (
                  <>
                    {casino.offerDescription}
                    {casino.freeSpins && (
                      <div className="mt-1 flex items-center justify-center">
                        <span className="text-xs font-medium text-[#F9F5FF]/80">+</span>
                        <Sparkles className="w-3 h-3 mx-1 text-[#773DFF]" />
                        <span className="text-xs font-medium text-[#F9F5FF]/80">{casino.freeSpins} Bezriska griezieni</span>
                      </div>
                    )}
                  </>
                ) : casino.freeSpins ? (
                  <div className="flex items-center justify-center">
                    <span>{casino.freeSpins} Bezriska griezieni</span>
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
          
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
              className="group relative px-5 sm:px-6 py-6 sm:py-6 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden transition-transform hover:scale-101 backdrop-blur-md bg-opacity-50 w-full whitespace-nowrap shadow-md hover:shadow-lg"
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

        {/* Mobile & Tablet: Claim button at the bottom - Using the original button style */}
        <div className="md:hidden w-full px-4 pb-4 bg-transparent backdrop-blur-md">
          <div className="w-full transform hover:scale-105 transition-transform duration-300">
            <ClaimButton 
              offerUrl={casino.offerUrl}
              offerTitle={casino.offerTitle}
              categorySlug={categorySlug}
              categoryUrls={casino.categoryUrls}
              className="group relative px-5 sm:px-6 py-6 sm:py-6 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden transition-transform hover:scale-101 backdrop-blur-md bg-opacity-50 w-full whitespace-nowrap shadow-md hover:shadow-lg"
            />
          </div>
          
          {/* Terms and conditions link */}
          {casino.termsConditionsUrl && (
            <a
              href={casino.termsConditionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-[#F9F5FF]/70 hover:text-[#F9F5FF] hover:underline transition-colors duration-300 text-center block"
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

export default CasinoComponent2;