import Link from "next/link";
import Image from "next/image";


export default function Footer() {
  return (

    
    <footer className="w-full bg-[#000025] text-[#F9F5FF] border-t border-[#8126FF]/20 backdrop-blur-sm rounded-t-3xl">
      {/* Legal Links */}
      <div className="border-b border-[#8126FF]/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#9b98df]">
            <Link href="/privatuma-politika" className="hover:text-[#8126FF] transition-colors duration-300">
              Privātuma politika
            </Link>
            <Link href="/noteikumi-nosacijumi" className="hover:text-[#8126FF] transition-colors duration-300">
              Noteikumi & nosacījumi
            </Link>
            <Link href="/sikfailu-politika" className="hover:text-[#8126FF] transition-colors duration-300">
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
          <div className="relative p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/25 rounded-full blur-2xl opacity-85 transition-all duration-300"></div>
            <Link href="https://www.gamblingtherapy.org" className="block relative z-10 transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <Image 
                src="/images/gambling_therapy.png" 
                alt="Gambling Therapy Logo"
                width={100}
                height={50}
                className="h-8 w-auto object-contain opacity-100 brightness-125 transition-all duration-300"
              />
            </Link>
          </div>
          <div className="relative p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/25 rounded-full blur-2xl opacity-85 transition-all duration-300"></div>
            <a href="https://as.org.lv" target="_blank" rel="noopener noreferrer"  className="block relative z-10 transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <Image 
                src="/images/anon.png" 
                alt="Anonīmie spēlmaņi"
                width={100}
                height={100}
                className="h-14 w-auto object-contain opacity-100 transition-all duration-300"
              />
            </a>
          </div>
          <div className="relative p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/25 rounded-full blur-2xl opacity-85 transition-all duration-300"></div>
            <a href="https://www.gambleaware.org/" target="_blank" rel="noopener noreferrer"  className="block relative z-10 transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <Image 
                src="/images/BGA.png"
                alt="Gambling Awareness Logo 2"
                width={100}
                height={50}
                className="h-4 w-auto object-contain opacity-100 transition-all duration-300"
              />
            </a>
          </div>
          <div className="relative p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/25 rounded-full blur-2xl opacity-85 transition-all duration-300"></div>
            <a href="https://www.gamcare.org.uk/"  target="_blank" rel="noopener noreferrer"  className="block relative z-10 transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <Image 
                src="/images/Image3.png"
                alt="Gambling Awareness Logo 3"
                width={100}
                height={50}
                className="h-8 w-auto object-contain opacity-100 transition-all duration-300"
              />
            </a>
          </div>
          <div className="relative p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/25 rounded-full blur-2xl opacity-85 transition-all duration-300"></div>
            <a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer"  className="block relative z-10 transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <Image 
                src="/images/Image4.png"
                alt="Gambling Awareness Logo 4"
                width={100}
                height={50}
                className="h-8 w-auto object-contain opacity-100 transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </div>



      {/* Copyright */}
      <div className="border-t border-[#8126FF]/20">
      <div className="flex justify-center items-center space-x-6 pt-4">
            <a href="https://t.me/onlywinslv" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
              <Image 
                src="/images/BS-telegram.svg" 
                alt="Telegram"
                width={24}
                height={24}
                className="opacity-75 hover:opacity-100"
              />
            </a>
            <a href="https://kick.com/onlywinscasino" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
              <Image 
                src="/images/kick.svg" 
                alt="Kick"
                width={18}
                height={18}
                className="opacity-75 hover:opacity-100"
              />
            </a>
            <a href="https://www.youtube.com/@OnlyWins_Stream" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
              <Image 
                src="/images/Youtube.svg" 
                alt="Youtube"
                width={24}
                height={24}
                className="opacity-75 hover:opacity-100"
              />
            </a>
            <a href="https://www.instagram.com/onlywinstream/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
              <Image 
                src="/images/instagram.svg" 
                alt="Instagram"
                width={24}
                height={24}
                className="opacity-75 hover:opacity-100"
              />
            </a>
          </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-[#9b98df]">
{new Date().getFullYear()} © Baltic Slots. Visas tiesības paturētas.
          </p>
        </div>
      </div>
    </footer>
  );
}
