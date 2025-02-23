"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import { TypedObject } from '@portabletext/types'
import GaugeComponent from 'react-gauge-component'
import { Wallet, ChevronDown } from 'lucide-react'
import { createPortal } from 'react-dom'
import ClaimButton from './ClaimButton';

interface Category {
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
  paymentMethods: PaymentMethod[];
  orderRank?: number;
  categoryUrls?: CategoryUrl[];
}

interface CasinoProps {
  casino: Casino;
  index: number;
  categorySlug?: string;
}

const CasinoComponent: React.FC<CasinoProps> = ({ casino, index, categorySlug }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPaymentDropdownOpen(false);
      }
    };

    const updateDropdownPosition = () => {
      if (dropdownRef.current && isPaymentDropdownOpen) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        setDropdownPosition({
          top: rect.bottom + scrollY + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    if (mounted) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      updateDropdownPosition();
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', updateDropdownPosition);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [mounted, isPaymentDropdownOpen]);

  // Helper function to get score text based on rating
  const getScoreText = (rating: number) => {
    if (rating >= 9.0) return 'Excellent';
    if (rating >= 4.0) return 'Great';
    if (rating >= 3.5) return 'Very Good';
    if (rating >= 3.0) return 'Good';
    return 'Fair';
  };

  return (
    <div className="relative group h-full flex-grow">
      <div className="relative bg-[#1E1E1E] rounded-xl overflow-hidden flex flex-col h-full">
        {/* Header with Casino Name and Rating */}
        <div className="flex items-center justify-between p-2 pb-8 bg-[#2B2B2B]">
          <div className="flex items-center gap-2">
            <div className="relative w-20 h-20">
              <Image
                src={casino.imageUrl}
                alt={casino.offerTitle}
                fill
                className="object-cover rounded"
              />
            </div>
            <h3 className="text-sm font-semibold text-white">
              {casino.offerTitle}
            </h3>
          </div>
          
          {/* Rating Display */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm text-gray-400">Score:</span>
              <span className="text-sm font-medium text-[#C1FF72]">{getScoreText(casino.rating)}</span>
            </div>
            <div className="w-[80px] h-[50px]">
              <GaugeComponent
                id={`gauge-${casino._id}`}
                type="semicircle"
                arc={{
                  colorArray: ['#C1FF72'],
                  subArcs: [{
                    limit: 10,
                    color: '#2B2B2B',
                    showTick: true
                  }],
                  width: 0.2,
                  padding: 0.02,
                  cornerRadius: 1
                }}
                pointer={{
                  type: "arrow",
                  color: '#FFF',
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
                      fontSize: "80px",
                      fill: "#ffffff",
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
        </div>

        {/* Position Number */}
        <div className="z-10 absolute -top-px -left-px w-9 h-9 flex items-center justify-center bg-[#C1FF72] rounded-tl-lg rounded-br-lg border-r-2 border-b-2 border-[#C1FF72] shadow-[4px_4px_20px_rgba(193,255,114,0.3)]">
          <span className="font-['Orbitron'] font-bold text-[12px] text-black [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
            #{casino.orderRank || index + 1}
          </span>
        </div>

        {/* Payment Methods Dropdown */}
        <div className="relative mt-4 px-2" ref={dropdownRef}>
          <button
            onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
            className="w-full px-4 py-2 text-left bg-[#2B2B2B] text-white rounded-lg hover:bg-[#363636] transition-colors duration-200 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Payment Methods
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-200 ${isPaymentDropdownOpen ? 'transform rotate-180' : ''}`}
            />
          </button>
          
          {mounted && isPaymentDropdownOpen && createPortal(
            <div 
              className="absolute bg-[#2B2B2B] border border-[#C1FF72]/10 rounded-lg shadow-lg z-[40]"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
              }}
            >
              <div className="p-2 grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                {casino.paymentMethods.map((method) => (
                  <div
                    key={method._id}
                    className="px-3 py-2 text-sm text-white hover:bg-[#363636] cursor-pointer rounded flex items-center gap-2"
                  >
                    {method.image?.asset?.url && (
                      <Image
                        src={method.image.asset.url}
                        alt={method.name}
                        width={20}
                        height={20}
                        className="object-contain flex-shrink-0"
                      />
                    )}
                    <span className="truncate">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>,
            document.body
          )}
        </div>

        {/* Main Bonus Content */}
        <div className="flex-grow p-4">
          <p className="text-gray-300 text-center">
            {casino.offerDescription}
          </p>
        </div>

        {/* CTA Button and T&Cs */}
        <div className="mt-auto flex flex-col gap-2">
          {casino.termsConditionsUrl && (
            <div className="text-center">
              <a
                href={casino.termsConditionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-[#C1FF72] transition-colors"
              >
                T&Cs Apply
              </a>
            </div>
          )}
         <ClaimButton 
              offerUrl={casino.offerUrl}
              offerTitle={casino.offerTitle}
              categorySlug={categorySlug}
              categoryUrls={casino.categoryUrls}
            />
        </div>
      </div>
    </div>
  );
}

export default CasinoComponent;