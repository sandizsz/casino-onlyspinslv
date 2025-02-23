"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Category } from "../utils/interface"
import { useState } from "react"

interface NavbarClientProps {
  categories: Category[]
}

export function NavbarClient({ categories }: NavbarClientProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#C1FF72] blur-[150px] -top-48 -left-24"></div>
        </div>
       
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-24">
          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Left - Logo */}
            <div className="flex-1">
              <Link href="/" className="flex items-center group">
                <div className="h-16 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/loco-bonus.png"
                    alt="Loco Bonus logo"
                    width={160}
                    height={80}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right - Burger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 flex items-center space-x-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#242424] hover:from-[#C1FF72] hover:to-[#C1FF72] backdrop-blur-sm border border-[#C1FF72]/20 group transition-all duration-300"
              aria-label="Toggle menu"
            >
              <span className="text-[#C0C0C0] group-hover:text-white font-medium tracking-wide transition-colors duration-300">Menu</span>
              <div className="w-5 h-5 relative flex items-center justify-center">
                <span className={`absolute h-[2px] bg-current transition-all duration-300 ${
                  isMenuOpen 
                    ? "top-[9px] w-5 rotate-45 bg-white" 
                    : "top-[4px] w-3.5 bg-[#C0C0C0] group-hover:bg-white group-hover:w-5"
                }`}></span>
                <span className={`absolute h-[2px] transition-all duration-300 ${
                  isMenuOpen
                    ? "w-0 opacity-0"
                    : "w-5 bg-[#C0C0C0] group-hover:bg-white"
                }`}></span>
                <span className={`absolute h-[2px] bg-current transition-all duration-300 ${
                  isMenuOpen
                    ? "top-[9px] w-5 -rotate-45 bg-white"
                    : "top-[14px] w-4 bg-[#C0C0C0] group-hover:bg-white group-hover:w-5"
                }`}></span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center">
            {/* Left side - Casino Categories */}
            <div className="flex-1 flex justify-start">
              <div className="flex space-x-1 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-full border border-[#C1FF72]/10 p-1">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    className={`whitespace-nowrap px-2.5 lg:px-3 py-1.5 rounded-full text-sm lg:text-base font-['Rajdhani'] font-semibold transition-all duration-300 ${
                      pathname === `/category/${category.slug.current}`
                        ? "bg-[#C1FF72] text-black shadow-[0_0_20px_rgba(193,255,114,0.3)]"
                        : "text-[#C0C0C0] hover:text-white hover:bg-[#C1FF72]/10"
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
                <div className="h-16 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/loco-bonus.png"
                    alt="BangerSlots logo"
                    width={220}
                    height={120}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right side - Other Pages */}
            <div className="flex-1 flex justify-end">
              <div className="flex space-x-1 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-full border border-[#C1FF72]/10 p-1">
                {[
                  { href: "/game-guides", label: "Game Guides" },
                  { href: "/gambling-advice", label: "Gambling Advice" }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap px-2.5 lg:px-3 py-1.5 rounded-full text-sm lg:text-base font-['Rajdhani'] font-semibold transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-[#C1FF72] text-black shadow-[0_0_20px_rgba(193,255,114,0.3)]"
                        : "text-[#C0C0C0] hover:text-white hover:bg-[#C1FF72]/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col items-center justify-center min-h-screen space-y-8 p-8">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-['Rajdhani'] font-semibold transition-all duration-300 relative group ${
                  pathname === `/category/${category.slug.current}`
                    ? "text-[#C1FF72]"
                    : "text-[#C0C0C0]"
                }`}
              >
                {category.title}
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#C1FF72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
            
            {[
              { href: "/game-guides", label: "Game Guides" },
              { href: "/gambling-advice", label: "Gambling Advice" }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-['Rajdhani'] font-semibold transition-all duration-300 relative group ${
                  pathname === item.href
                    ? "text-[#C1FF72]"
                    : "text-[#C0C0C0]"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#C1FF72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}