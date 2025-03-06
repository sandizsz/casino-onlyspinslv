"use client"

import Link from "next/link"
import Image from "next/image"

import { Category, Casino } from "../utils/interface"
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
  casinos?: Casino[]
}

export function NavbarClient({ categories, casinos = [] }: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMenuOpen(false)
        document.body.style.overflow = 'unset'
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    
    // Initial check
    handleScroll()
    
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
      <style jsx global>{glowStyles}</style>
      <nav className="w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-transparent">
        <div className={` mx-auto relative ${isScrolled ? 'px-2 sm:px-4 md:px-6 py-1 sm:py-2' : 'px-6 sm:px-8 md:px-10 mt-2 sm:mt-4'} transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]`}>
          <div 
            className={`flex items-center ${isScrolled ? 'mx-1 sm:mx-2 md:mx-4 px-3 sm:px-5 md:px-8 py-3 sm:py-4 md:py-5 backdrop-blur-lg' : 'h-16 sm:h-18 md:h-20'} transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] relative rounded-xl sm:rounded-2xl`}
            style={isScrolled ? { 
              minHeight: '3.5rem',
              position: 'relative',
              outline: '1px solid rgba(255, 255, 255, 0.15)',
              outlineOffset: '-1px'
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
                  <div className="h-8 sm:h-10 md:h-12 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
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

              {/* Gift Icon */}
              <div className="mr-3">
                <GiftIcon casinos={casinos} />
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center">
              {/* Left - Logo */}
              <div className="flex-shrink-0">
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

              {/* Center - Navigation Items */}
              <div className="flex-1 flex justify-center items-center space-x-2 mx-4">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    className="whitespace-nowrap px-2 py-1.5 text-xs lg:text-sm font-light text-white hover:text-[#9b98df] transition-all duration-300 ease-in"
                  >
                    {category.title}
                  </Link>
                ))}
                <Link
                  href="/spelu-pamacibas"
                  className="whitespace-nowrap px-2 py-1.5 text-xs lg:text-sm font-light text-white hover:text-[#9b98df] transition-all duration-300 ease-in"
                >
                  Spēļu pamācības
                </Link>
                <Link
                  href="/gambling-advice"
                  className="whitespace-nowrap px-2 py-1.5 text-xs lg:text-sm font-light text-white hover:text-[#9b98df] transition-all duration-300 ease-in"
                >
                  Padomi
                </Link>
                <Link
                  href="/payment-methods"
                  className="whitespace-nowrap px-2 py-1.5 text-xs lg:text-sm font-light text-white hover:text-[#9b98df] transition-all duration-300 ease-in"
                >
                  Maksājumu metodes
                </Link>
              </div>

              {/* Right - Gift Icon */}
              <div className="flex-shrink-0">
                <GiftIcon casinos={casinos} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-20 sm:top-24 left-0 right-0 bottom-0 z-40 bg-[rgb(0_0_37)] backdrop-blur-lg border-t border-[#8126FF]/20 transform transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          <div className="relative w-full h-full">

            <div className="flex flex-col items-center pt-8 space-y-6 p-8 overflow-y-auto h-screen relative w-full">
              <div className="w-full max-w-md space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-6 py-3.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                  >
                    {category.title}
                  </Link>
                ))}
                <Link
                  href="/spelu-pamacibas"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-6 py-3.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                >
                  Spēļu pamācības
                </Link>
                <Link
                  href="/gambling-advice"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-6 py-3.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                >
                  Padomi
                </Link>
                <Link
                  href="/payment-methods"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-6 py-3.5 rounded-xl text-base font-light text-white hover:text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-all duration-300 ease-in border border-transparent hover:border-[#8126FF]/30"
                >
                  Maksājumu metodes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}