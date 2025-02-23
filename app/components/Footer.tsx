import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-white border-t border-[#C1FF72]/20 backdrop-blur-sm">
      {/* Legal Links */}
      <div className="border-b border-[#C1FF72]/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#C0C0C0]">
            <Link href="/privacy-policy" className="hover:text-[#C1FF72] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-[#C1FF72] transition-colors duration-300">
              Terms & Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#C1FF72] transition-colors duration-300">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-[#C1FF72] transition-colors duration-300">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>

      {/* Gambling Awareness Logos */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
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
      <div className="border-t border-[#C1FF72]/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-[#C0C0C0]">
            Copyright {new Date().getFullYear()} Bangerslots. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
