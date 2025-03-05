"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Category, Casino } from "../utils/interface"
import { useState, useEffect } from "react"
import { GiftIcon } from "./GiftIcon"

interface NavbarClientProps {
  categories: Category[]
  casinos?: Casino[]
}

export function NavbarClient({ categories, casinos = [] }: NavbarClientProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMenuOpen(false)
        document.body.style.overflow = 'unset'
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
    <nav className="w-full bg-gradient-to-b from-[#1D053F] to-[#110226] relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#8126FF] blur-[150px] -top-48 -left-24"></div>
        </div>
       
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-24">
          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Left - Logo */}
            <div className="flex-1">
              <Link href="/" className="flex items-center group">
                <div className="h-12 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/BalticSlots.png"
                    alt="Baltic slots logo"
                    width={160}
                    height={80}
                    className="object-contain w-full h-full"
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
              className="relative z-50 flex items-center space-x-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#1D053F] to-[#2D0B5A] hover:from-[#8126FF] hover:to-[#8126FF] backdrop-blur-sm border border-[#8126FF]/20 group transition-all duration-300"
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
            {/* Left side - Casino Categories */}
            <div className="flex-1 flex justify-start">
              <div className="flex space-x-1 bg-[#1D053F]/50 backdrop-blur-sm rounded-full border border-[#8126FF]/20 p-1">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    className={`whitespace-nowrap px-2.5 lg:px-3 py-1.5 rounded-full text-sm lg:text-base font-light transition-all duration-300 ${     pathname === `/category/${category.slug.current}`
                        ? "bg-[#8126FF] text-[#F9F5FF] shadow-[0_0_20px_rgba(129,38,255,0.4)]"
                        : "text-[#F9F5FF]/70 hover:text-[#F9F5FF] hover:bg-[#8126FF]/20"
                    }`}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex-shrink-0 mx-4">
              <Link href="/" className="flex items-center group">
                <div className="h-12 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/BalticSlots.png"
                    alt="Baltic slots logo"
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right side - Other Pages */}
            <div className="flex-1 flex justify-end items-center">
              <div className="flex space-x-1 bg-[#1D053F]/50 backdrop-blur-sm rounded-full border border-[#8126FF]/20 p-1">
                {[
                  { href: "/game-guides", label: "Spēļu pamācības" },
                  { href: "/gambling-advice", label: "Padomi" },
                  { href: "/payment-methods", label: "Maksājumu metodes" }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap px-2.5 lg:px-3 py-1.5 rounded-full text-sm lg:text-base font-light transition-all duration-300 ${     pathname === item.href
                        ? "bg-[#8126FF] text-[#F9F5FF] shadow-[0_0_20px_rgba(129,38,255,0.4)]"
                        : "text-[#F9F5FF]/70 hover:text-[#F9F5FF] hover:bg-[#8126FF]/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Gift Icon */}
              <div className="ml-4">
                <GiftIcon casinos={casinos} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-24 left-0 right-0 bottom-0 z-40 bg-gradient-to-b from-[#1D053F]/95 to-[#110226]/95 backdrop-blur-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="relative">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-[300px] h-[300px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-24 right-0"></div>
              <div className="absolute w-[300px] h-[300px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 -left-24"></div>
            </div>
            <div className="flex flex-col items-center pt-8 space-y-6 p-8 overflow-y-auto h-screen relative">
              <div className="w-full max-w-md space-y-6">
            {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full px-6 py-3 rounded-xl text-lg font-light transition-all duration-300 ${     
                    pathname === `/category/${category.slug.current}`
                      ? "bg-[#8126FF] text-[#F9F5FF] shadow-[0_0_20px_rgba(129,38,255,0.4)]"
                      : "text-[#F9F5FF]/70 hover:text-[#F9F5FF] hover:bg-[#8126FF]/20"
                  }`}
                >
                  {category.title}
                </Link>
              ))}
            
            {[
                { href: "/game-guides", label: "Spēļu pamācības" },
                { href: "/gambling-advice", label: "Padomi" },
                { href: "/payment-methods", label: "Maksājumu metodes" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full px-6 py-3 rounded-xl text-lg font-light transition-all duration-300 ${     
                    pathname === item.href
                      ? "bg-[#8126FF] text-[#F9F5FF] shadow-[0_0_20px_rgba(129,38,255,0.4)]"
                      : "text-[#F9F5FF]/70 hover:text-[#F9F5FF] hover:bg-[#8126FF]/20"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}