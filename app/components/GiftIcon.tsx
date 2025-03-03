"use client"

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Gift } from 'lucide-react';
import { Casino } from '../utils/interface';
import Image from 'next/image';

interface GiftIconProps {
  casinos?: Casino[];
}

export function GiftIcon({ casinos = [] }: GiftIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [randomCasino, setRandomCasino] = useState<Casino | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleClick = () => {
    if (casinos && casinos.length > 0) {
      const randomIndex = Math.floor(Math.random() * casinos.length);
      setRandomCasino(casinos[randomIndex]);
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-[#8126FF]/30 rounded-lg blur-sm animate-pulse"></div>
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center w-10 h-10 bg-[#1D053F]/90 border border-[#8126FF]/20 rounded-lg hover:border-[#8126FF]/40 transition-all duration-300 group overflow-hidden"
        aria-label="Gift Icon"
      >
        <div className="absolute inset-0">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-[#8126FF]/20 to-transparent h-px w-[200%] opacity-30"
              style={{
                top: `${50 * i}%`,
                left: '-50%',
                animation: `scan ${2 + i}s linear infinite`
              }}
            />
          ))}
        </div>
        <Gift className="w-5 h-5 text-[#8126FF] group-hover:text-[#F9F5FF] transition-colors z-10" />
      </button>

      {isOpen && randomCasino && isMounted && createPortal(
        <>
          <div 
            className="fixed inset-0 bg-[#1D053F]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            style={{ position: 'fixed', zIndex: 9999999 }}
          />
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-[#1D053F]/90 border border-[#8126FF]/20 rounded-2xl p-4 md:p-8 overflow-hidden"
            style={{ position: 'fixed', zIndex: 9999999 }}
          >
            
            {/* Scan lines */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 w-full h-full opacity-10">
                <div className="absolute w-[300px] h-[300px] rounded-full bg-[#8126FF] blur-[150px] -top-48 -left-24"></div>
              </div>
              
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-transparent via-[#8126FF]/20 to-transparent h-px w-[200%] opacity-30"
                  style={{
                    top: `${30 * i}%`,
                    left: '-50%',
                    animation: `scan ${3 + i}s linear infinite`
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#1D053F] border border-[#8126FF]/40 rounded-full hover:border-[#8126FF]/60 transition-all duration-300 z-20"
            >
              <span className="text-[#8126FF] hover:text-[#F9F5FF] text-lg font-medium">×</span>
            </button>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
              <div className="relative w-40 h-40 md:w-64 md:h-64 flex-shrink-0">
                <div className="absolute inset-0 bg-[#8126FF]/10 rounded-xl blur-xl animate-pulse"></div>
                <div className="relative h-full w-full bg-[#1D053F]/40 rounded-xl border border-[#8126FF]/20 p-4">
                  <Image
                    src={randomCasino.imageUrl}
                    alt={randomCasino.offerTitle}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex-grow border-t-2 md:border-t-0 md:border-l-2 border-[#8126FF]/20 pt-4 md:pt-0 md:pl-8 space-y-4 w-full md:w-auto text-center md:text-left">
                <h3 className="text-lg md:text-xl text-[#F9F5FF] font-light">
                  {randomCasino.offerTitle}
                </h3>
                <p className="text-[#F9F5FF]/70 text-sm">
                  {randomCasino.offerDescription}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <a
                    href={randomCasino.offerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#8126FF]/20 hover:bg-[#8126FF]/30 text-[#F9F5FF] px-6 py-2 rounded-full transition-all duration-300 text-center"
                  >
                    Reģistrēties
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto border border-[#8126FF]/20 hover:border-[#8126FF]/40 text-[#F9F5FF] px-6 py-2 rounded-full transition-all duration-300 text-center"
                  >
                    Vēlāk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
