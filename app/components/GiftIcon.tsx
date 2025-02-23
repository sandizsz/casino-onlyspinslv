"use client"

import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { Casino } from '../utils/interface';
import Image from 'next/image';

interface GiftIconProps {
  casinos?: Casino[];
}

export function GiftIcon({ casinos = [] }: GiftIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [randomCasino, setRandomCasino] = useState<Casino | null>(null);

  const handleClick = () => {
    if (casinos && casinos.length > 0) {
      const randomIndex = Math.floor(Math.random() * casinos.length);
      setRandomCasino(casinos[randomIndex]);
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-cyan-500/30 rounded-lg blur-sm animate-pulse"></div>
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center w-10 h-10 bg-black/90 border border-cyan-500/20 rounded-lg hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden"
        aria-label="Gift Icon"
      >
        <div className="absolute inset-0">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent h-px w-[200%] opacity-30"
              style={{
                top: `${50 * i}%`,
                left: '-50%',
                animation: `scan ${2 + i}s linear infinite`
              }}
            />
          ))}
        </div>
        <Gift className="w-5 h-5 text-cyan-500 group-hover:text-cyan-400 transition-colors z-10" />
      </button>

      {isOpen && randomCasino && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-black/90 border border-cyan-500/20 rounded-lg p-4 md:p-8 z-[70]">
            {/* Corner accents */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-cyan-500/40" />
            <div className="absolute -top-px -right-px w-4 h-4 border-t border-r border-cyan-500/40" />
            <div className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-cyan-500/40" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-cyan-500/40" />
            
            {/* Scan lines */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent h-px w-[200%] opacity-30"
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
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-black border border-cyan-500/40 rounded-lg hover:border-cyan-400/60 transition-all duration-300"
            >
              <span className="text-cyan-500 hover:text-cyan-400">✕</span>
            </button>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
              <div className="relative w-40 h-40 md:w-64 md:h-64 flex-shrink-0">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur-xl animate-pulse"></div>
                <div className="relative h-full w-full bg-black/40 rounded-lg border border-cyan-500/20 p-4">
                  <Image
                    src={randomCasino.imageUrl}
                    alt={randomCasino.offerTitle}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex-grow border-t-2 md:border-t-0 md:border-l-2 border-cyan-500/20 pt-4 md:pt-0 md:pl-8 space-y-4 w-full md:w-auto text-center md:text-left">
                <h3 className="text-lg md:text-xl text-white group-hover:text-cyan-400 transition-colors">
                  {randomCasino.offerTitle}
                </h3>
                <p className="text-gray-400 text-sm">
                  {randomCasino.offerDescription}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <a
                    href={randomCasino.offerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-6 py-2 rounded-lg transition-all duration-300 text-center"
                  >
                    Play
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 px-6 py-2 rounded-lg transition-all duration-300 text-center"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
