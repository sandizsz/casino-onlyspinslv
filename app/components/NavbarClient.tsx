"use client"

import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/client";
import { ChevronDown } from "lucide-react";

import { Category } from "../utils/interface"
import { useState, useEffect } from "react"
import { GiftIcon } from "./GiftIcon"

// Add CSS for glow and glassmorphism effects
const glowStyles = `
  .glow-effect {
    box-shadow: 0 0 15px 0 rgba(129, 38, 255, 0.4), 0 0 30px 0 rgba(129, 38, 255, 0.3), 0 0 45px 0 rgba(129, 38, 255, 0.1);
  }

  .navbar-sticky-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: inherit;
    z-index: -1;
    background: rgba(29, 5, 63, 0.2);
    backdrop-filter: blur(12px);
  }
  
  .navbar-sticky-gradient::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(91.63deg, rgb(119, 61, 255), rgb(54, 47, 255));
    will-change: filter;
    filter: blur(40px);
    opacity: 0.6;
    z-index: -5;
  }
`

interface NavbarClientProps {
  categories: Category[]
}

export function NavbarClient({ categories }: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [giftCasinos, setGiftCasinos] = useState([])

  // Fetch and filter casinos with the gift tag
  useEffect(() => {
    const fetchGiftCasinos = async () => {
      try {
        // Force using direct Sanity query for testing
        const query = `*[
          _type == "casino" && 
          count(tags[]->_id[@ == "efe5ddb1-3fdc-4a0b-8bd5-519db4fc6759"]) > 0
        ] | order(orderRank)[0...5] {
          _id,
          offerTitle,
          offerUrl,
          offerDescription,
          "imageUrl": casinoImage.asset->url,
          tags[]-> {
            _id,
            title,
            slug {
              current
            }
          }
        }`;
        
        const data = await client.fetch(query);
        setGiftCasinos(data);
      } catch {
        throw new Error('Failed to fetch gift casinos');
      }
    };

    fetchGiftCasinos();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      
      if (screenWidth >= 1024) { // lg breakpoint
        setIsMenuOpen(false)
        document.body.style.overflow = 'unset'
      }
      
      // Update mobile state
      setIsMobile(screenWidth < 640)
      
      // Update navbar height CSS variable
      updateNavbarHeight()
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      
      // Update navbar height after scroll state changes
      setTimeout(updateNavbarHeight, 300) // Wait for transition to complete
    }
    
    // Function to update the navbar height CSS variable
    const updateNavbarHeight = () => {
      const navbarElement = document.querySelector('nav')
      if (navbarElement) {
        const height = navbarElement.offsetHeight
        document.documentElement.style.setProperty('--navbar-height', `${height}px`)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    
    // Initial setup
    handleScroll()
    
    // Set initial navbar height after component mounts
    setTimeout(updateNavbarHeight, 100)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <style jsx global>{`
        ${glowStyles}
        
        /* Add safe area inset padding for iOS devices */
        @supports (padding-top: env(safe-area-inset-top)) {
          .safe-area-padding-top {
            padding-top: env(safe-area-inset-top);
          }
        }
      `}</style>
      <nav className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isMenuOpen ? 'bg-[#000025]' : 'bg-transparent'} safe-area-padding-top`}>
      <div className={`mx-auto relative ${isScrolled ? 
  'md:px-6  sm:py-2 px-0' : 
  'md:px-10 mt-2 sm:mt-4 px-3 sm:px-5'  // Keep some padding when not scrolled
} transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]`}>
  <div 
    className={`flex items-center ${isScrolled ? 
      'md:px-8 py-3 sm:py-4 md:py-5 backdrop-blur-lg mx-0 px-3 sm:px-5' : 
      'h-16 sm:h-18 md:h-20'
    } transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] relative md:rounded-xl sm:rounded-2xl rounded-none w-full`}
      style={isScrolled ? { 
        minHeight: '3.5rem',
        position: 'relative',
        ...(isMobile ? {
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none'
        } : {
          outline: '1px solid rgba(255, 255, 255, 0.15)',
          outlineOffset: '-1px'
        })
      } : {}}
    >
            {isScrolled && (
              <>
                <div className="navbar-sticky-gradient"></div>
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-[5%] h-[30%] bg-[#8126FF] opacity-20 rounded-full blur-[25px] z-[-1]"></div>
                <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-[5%] h-[30%] bg-[#8126FF] opacity-20 rounded-full blur-[25px] z-[-1]"></div>
              </>
            )}
            {/* Mobile Layout */}
            <div className="lg:hidden flex items-center justify-between w-full">
              {/* Left - Logo */}
              <div className="flex-1">
                <Link href="/" className="flex items-center group">
                  <div className="h-10 sm:h-10 md:h-12 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/BalticSlots.png"
                      alt="Baltic slots logo"
                      width={160}
                      height={80}
                      className="object-contain w-full h-full cursor-pointer"
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Gift Icon - Now visible on mobile */}
              <div className="flex-shrink-0 mr-3">
                {giftCasinos.length > 0 && <GiftIcon casinos={giftCasinos} />}
              </div>
            
              {/* Right - Burger Menu */}
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-50 flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#1D053F] to-[#2D0B5A] hover:from-[#8126FF] hover:to-[#8126FF] backdrop-blur-sm border border-[#8126FF]/20 group transition-all duration-300"
                aria-label="Toggle menu"
              >
                <span className="text-[#F9F5FF]/70 group-hover:text-[#F9F5FF] font-light tracking-wide transition-colors duration-300">Izvēlne</span>
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <span className={`absolute h-[2px] bg-current transition-all duration-300 ${
                    isMenuOpen 
                      ? "top-[9px] w-5 rotate-45 bg-[#F9F5FF]" 
                      : "top-[4px] w-3.5 bg-[#F9F5FF]/70 group-hover:bg-[#F9F5FF] group-hover:w-5"
                  }`}></span>
                  <span className={`absolute h-[2px] transition-all duration-300 ${
                    isMenuOpen
                      ? "w-0 opacity-0"
                      : "w-5 bg-[#F9F5FF]/70 group-hover:bg-[#F9F5FF]"
                  }`}></span>
                  <span className={`absolute h-[2px] bg-current transition-all duration-300 ${
                    isMenuOpen
                      ? "top-[9px] w-5 -rotate-45 bg-[#F9F5FF]"
                      : "top-[14px] w-4 bg-[#F9F5FF]/70 group-hover:bg-[#F9F5FF] group-hover:w-5"
                  }`}></span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation - MODIFIED FOR CENTERING */}
            <div className="hidden lg:flex items-center justify-between w-full relative">
              {/* Left - Logo */}
              <div className="flex-shrink-0 w-[200px]">
                <Link href="/" className="flex items-center group">
                  <div className="h-8 sm:h-10 md:h-12 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/BalticSlots.png"
                      alt="Baltic slots logo"
                      width={100}
                      height={100}
                      className="object-contain w-full h-full cursor-pointer"
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Center - Navigation Items - CENTERED WITH ABSOLUTE POSITIONING */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-2">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/kategorija/${category.slug.current}`}
                    className="whitespace-nowrap px-2 py-1.5 text-xs lg:text-sm font-light text-white hover:text-[#9b98df] transition-all duration-300 ease-in"
                  >
                    {category.title}
                  </Link>
                ))}
                
                {/* Desktop dropdown menu */}
                <div className="relative group">
                  <button
                    className="flex items-center whitespace-nowrap px-2 py-1.5 text-xs lg:text-sm font-light text-white hover:text-[#9b98df] transition-all duration-300 ease-in"
                  >
                    Kazino akadēmija
                    <ChevronDown className="ml-1 w-3 h-3 group-hover:text-[#9b98df] transition-all duration-300" />
                  </button>
                  
                  {/* Dropdown content for desktop */}
                  <div className="absolute left-0 top-full mt-1 w-48 bg-[#1D053F]/90 backdrop-blur-md border border-[#8126FF]/20 rounded-xl shadow-xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                    <div className="py-2 px-1">
                      <Link
                        href="/spelu-pamacibas"
                        className="block px-4 py-2 text-sm font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in rounded-lg"
                      >
                        Spēļu pamācības
                      </Link>
                      <Link
                        href="/padomi"
                        className="block px-4 py-2 text-sm font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in rounded-lg"
                      >
                        Padomi
                      </Link>
                      <Link
                        href="/maksajumu-metodes"
                        className="block px-4 py-2 text-sm font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in rounded-lg"
                      >
                        Maksājumu metodes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Social Links + Gift Icon */}
              <div className="flex-shrink-0 w-[200px] flex justify-end items-center space-x-4">
                {/* Social Media Links - Only visible on desktop */}
                <div className="hidden lg:block rounded-lg px-2 py-1 transition-all duration-300">
                  {/* Label text above icons */}
                  <div className="flex flex-col items-center">
                    
                    {/* Social icons */}
                    <div className="flex items-center space-x-3">
                      <a href="https://t.me/onlywinslv" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                        <Image 
                          src="/images/BS-telegram_white.svg" 
                          alt="Telegram"
                          width={20}
                          height={20}
                          className="opacity-75 hover:opacity-100"
                        />
                      </a>
                      <a href="https://kick.com/onlywinscasino" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                        <Image 
                          src="/images/kick_white.svg" 
                          alt="Kick"
                          width={16}
                          height={16}
                          className="opacity-75 hover:opacity-100"
                        />
                      </a>
                      <a href="https://www.youtube.com/@OW_Stream" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                        <Image 
                          src="/images/Youtube_white.svg" 
                          alt="Youtube"
                          width={20}
                          height={20}
                          className="opacity-75 hover:opacity-100"
                        />
                      </a>
                      <a href="https://www.instagram.com/onlywinstream/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                        <Image 
                          src="/images/instagram_white.svg" 
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="opacity-75 hover:opacity-100"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Gift Icon */}
                {giftCasinos.length > 0 && <GiftIcon casinos={giftCasinos} />}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-[var(--navbar-height,4rem)] left-0 right-0 bottom-0 z-40 bg-[rgb(0_0_37)] backdrop-blur-lg border-t border-[#8126FF]/20 transform transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          <div className="relative w-full h-full overflow-y-auto">

            <div className="flex flex-col items-center pt-6 space-y-4 p-6 relative w-full">
              <div className="w-full max-w-md space-y-4">
                {/* Casino Categories Section */}
                <div className="space-y-3">
                  <h3 className="text-sm uppercase text-[#8126FF]/70 font-medium tracking-wider px-2">Kazino Kategorijas</h3>
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/kategorija/${category.slug.current}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-5 py-2.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
                
                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#8126FF]/30 to-transparent my-2"></div>
                
                {/* Other Links Section - Kept as original (not dropdown) */}
                <div className="space-y-3">
                  <h3 className="text-sm uppercase text-[#8126FF]/70 font-medium tracking-wider px-2">Kazino akadēmija</h3>
                  <Link
                    href="/spelu-pamacibas"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-5 py-2.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                  >
                    Spēļu pamācības
                  </Link>
                  <Link
                    href="/padomi"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-5 py-2.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                  >
                    Padomi
                  </Link>
                  <Link
                    href="/maksajumu-metodes"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-5 py-2.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                  >
                    Maksājumu metodes
                  </Link>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#8126FF]/30 to-transparent my-3"></div>
                
                {/* Social Media Links */}
                <div className="space-y-3">
                  <h3 className="text-sm uppercase text-[#8126FF]/70 font-medium tracking-wider px-2">Seko Mums</h3>
                  <div className="flex justify-start items-center space-x-6 p-3">
                    <a href="https://t.me/onlywinslv" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/BS-telegram.svg" 
                        alt="Telegram"
                        width={26}
                        height={26}
                        className="opacity-75 hover:opacity-100"
                      />
                    </a>
                    <a href="https://kick.com/onlywinscasino" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/kick.svg" 
                        alt="Kick"
                        width={20}
                        height={20}
                        className="opacity-75 hover:opacity-100"
                      />
                    </a>
                    <a href="https://www.youtube.com/@OnlyWins_Stream" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/Youtube.svg" 
                        alt="Youtube"
                        width={26}
                        height={26}
                        className="opacity-75 hover:opacity-100"
                      />
                    </a>
                    <a href="https://www.instagram.com/onlywinstream/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/instagram.svg" 
                        alt="Instagram"
                        width={26}
                        height={26}
                        className="opacity-75 hover:opacity-100"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}