import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

export default function Footer() {
  return (

    
    <footer className="w-full bg-[#000025] text-[#F9F5FF] border-t border-[#8126FF]/20 backdrop-blur-sm rounded-t-3xl">
      {/* Legal Links */}
      <div className="border-b border-[#8126FF]/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#9b98df]">
            <Link href="/privacy-policy" className="hover:text-[#8126FF] transition-colors duration-300">
              Privātuma politika
            </Link>
            <Link href="/terms-conditions" className="hover:text-[#8126FF] transition-colors duration-300">
              Noteikumi & nosacījumi
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#8126FF] transition-colors duration-300">
            Sīkfailu politika
            </Link>
            <Link href="/atruna" className="hover:text-[#8126FF] transition-colors duration-300">
            Atruna
            </Link>
          </div>
        </div>
      </div>

      {/* Gambling Awareness Logos */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <Link href="https://www.gamblingtherapy.org" className="transform hover:scale-110 hover:rotate-2 transition-all duration-300">
            <Image 
              src="/images/GAMBLING_THERAPY-logo.png" 
              alt="Gambling Therapy Logo"
              width={100}
              height={50}
              className="h-8 w-auto object-contain opacity-100 brightness-125 transition-all duration-300"
            />
          </Link>
          <Link href="" className="transform hover:scale-110 hover:rotate-2 transition-all duration-300">
            <Image 
              src="/images/Image1.png" 
              alt="Gambling Awareness Logo 1"
              width={100}
              height={50}
              className="h-8 w-auto object-contain opacity-100 transition-all duration-300"
            />
          </Link>
          <Link href="https://www.gambleaware.org/" className="transform hover:scale-110 hover:rotate-2 transition-all duration-300">
            <Image 
              src="/images/Image2.png"
              alt="Gambling Awareness Logo 2"
              width={100}
              height={50}
              className="h-8 w-auto object-contain opacity-100 transition-all duration-300"
            />
          </Link>
          <Link href="https://www.gamcare.org.uk/" className="transform hover:scale-110 hover:rotate-2 transition-all duration-300">
            <Image 
              src="/images/Image3.png"
              alt="Gambling Awareness Logo 3"
              width={100}
              height={50}
              className="h-8 w-auto object-contain opacity-100 transition-all duration-300"
            />
          </Link>
          <Link href="https://www.gamstop.co.uk" className="transform hover:scale-110 hover:rotate-2 transition-all duration-300">
            <Image 
              src="/images/Image4.png"
              alt="Gambling Awareness Logo 4"
              width={100}
              height={50}
              className="h-8 w-auto object-contain opacity-100 transition-all duration-300"
            />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#8126FF]/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-[#9b98df]">
{new Date().getFullYear()} © Baltic Slots. Visas tiesības paturētas.
          </p>
        </div>
      </div>
    </footer>
  );
}
