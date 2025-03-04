import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { Casino } from "./utils/interface";
import CasinoComponent2 from "./components/CasinoComponent2";
import AnimatedSection from "./components/AnimatedSection";
import LiveCasinoComponent from "./components/LiveCasinoComponent";
import { blackjackData } from "./data/pages/blackjack";
import { sicboData } from "./data/pages/sicbo";
import { kenoData } from "./data/pages/keno";
import { crapsData } from "./data/pages/craps";
import { slotsData } from "./data/pages/onlineslots";
import { rouletteData } from "./data/pages/roulette";
import { baccaratData } from "./data/pages/baccarat";
import { casinoGuidesData } from "./data/pages/guides";
import CasinoFeatures from './components/CasinoFeatures';
import PaymentMethods from './components/PaymentMethods';
import NewsletterComponent from './components/NewsletterComponent';


async function getPosts() {
  const query = `*[_type == "casino"] | order(orderRank)[0...50] {
    _id,
    offerTitle,
    offerUrl,
    offerDescription,
    offerText,
    rating,
    "imageUrl": casinoImage.asset->url,
    termsConditionsUrl,
    freeSpins,
    license,
    minDeposit,
    "categoryUrls": categoryUrls[] {
      "categoryId": category->_id,
      "categorySlug": category->slug.current,
      "categoryTitle": category->title,
      url,
      urlNumber
    },
    tags[]-> {
      _id,
      title,
      slug {
        current
      }
    },
    categories[]-> {
      _id,
      slug,
      title
    },
    paymentMethods[]-> {
      _id,
      name,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      }
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

// Set to 0 during development to see changes immediately, adjust to higher value in production
export const revalidate = 0;

export default async function Home() {

  // Get all casinos
  const allCasinos: Casino[] = await getPosts();
  
  // Filter casinos with the specific tag ID for the live section
  const liveCasinos: Casino[] = allCasinos.filter(casino => {
    // Make sure tags exist and is an array
    if (!casino.tags || !Array.isArray(casino.tags)) {
      return false;
    }
    
    // Check if any tag has the specific ID
    return casino.tags.some(tag => tag && tag._id === 'c1700974-296c-42d3-bbc7-0a539601f49e');
  });
  
  // Debug log
  console.log(`Found ${liveCasinos.length} casinos with the live tag`);
  
  // Regular casinos for the main list (excluding the first 4)
  const casinos: Casino[] = allCasinos.slice(0, 16);

  // Get unique payment methods from all casinos
  const uniquePaymentMethods = Array.from(
    new Map(
      casinos.flatMap(casino => casino.paymentMethods || [])
        .map(method => [method._id, method])
    ).values()
  );



  const guides = [
    blackjackData,
    rouletteData,
    baccaratData,
    crapsData,
    kenoData,
    sicboData,
    slotsData
  ];

 

  return (
    <div className=" bg-[#1D053F] text-[#F9F5FF]">
      <main className="relative">
        {/* Hero Section */}
        <AnimatedSection className="relative overflow-hidden bg-[#1D053F] w-full">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient background image */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="/images/gradient.png" 
                alt="Gradient background" 
                fill 
                priority
                className="object-cover object-center opacity-60"
              />
            </div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] blur-sm">
              <Image src="/images/star.svg" width={218} height={228} alt="Decorative star" className="w-full h-full animate-slow-spin" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] opacity-[0.03]">
              <Image src="/images/star.svg" width={218} height={228} alt="Decorative star" className="w-full h-full" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="min-h-[90vh] w-full py-8 md:py-12 flex flex-col justify-center items-center">
              {/* Main Content */}
              <div className="relative text-center w-full max-w-4xl mx-auto space-y-4 mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6">
              
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-[#F9F5FF]">
                  TAVS ONLINE <span className="bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-4xl sm:text-5xl md:text-6xl font-light leading-tight">CASINO</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#F9F5FF]/70 max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                  Discover a world of premium casino entertainment and master winning strategies crafted by experts
                </p>
              
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-xl mx-auto px-4 sm:px-0">
                <Link 
                  href="/category/all-bonuses"
                  className="group relative px-5 sm:px-6 py-2 sm:py-3 bg-[#8126FF] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden transition-transform hover:scale-105 backdrop-blur-md bg-opacity-50 w-full sm:flex-1 text-center whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    Visi kazino
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  href="/game-guides"
                  className="group px-5 sm:px-6 py-2 sm:py-3 bg-[#F9F5FF]/5 backdrop-blur-md border border-[#F9F5FF]/20 hover:border-[#8126FF]/40 text-[#F9F5FF] text-base sm:text-lg rounded-xl transition-all hover:bg-[#F9F5FF]/10 w-full sm:flex-1 text-center whitespace-nowrap"
                >
                  <span className="flex items-center justify-center">
                      Spēļu pamācības
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl w-full mx-auto px-4 sm:px-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] mb-1 sm:mb-2">10+</div>
                    <div className="text-xs sm:text-sm font-medium text-[#F9F5FF]/80">Spēļu kategorijas</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] mb-1 sm:mb-2">100%</div>
                    <div className="text-xs sm:text-sm font-medium text-[#F9F5FF]/80">Droši kazino</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] mb-1 sm:mb-2">24/7</div>
                    <div className="text-xs sm:text-sm font-medium text-[#F9F5FF]/80">Atbalsts</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] mb-1 sm:mb-2">50+</div>
                    <div className="text-xs sm:text-sm font-medium text-[#F9F5FF]/80">Spēļu pamācības</div>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator - Hidden on mobile, visible on larger screens */}
              <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="relative w-6 h-10 rounded-full p-[2px] backdrop-blur-sm overflow-hidden">
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]"></div>
                  {/* Inner content with background */}
                  <div className="absolute inset-[1px] rounded-full bg-[#1D053F]/80 flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] rounded-full animate-scroll"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

      
       
        
        {/* Currently Playing Casino Section - Only shown if there are casinos with the specific tag */}
        {liveCasinos && liveCasinos.length > 0 && (
          <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Special container with distinct background */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1D053F] to-[#1D053F]/80 border-2 border-[#8126FF]/30 shadow-[0_0_30px_rgba(129,38,255,0.2)] p-8">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#8126FF] rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#8126FF] rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#8126FF] rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#8126FF] rounded-br-xl"></div>
                
                <div className="relative mb-12 text-center">
                {/* Section title */}
                <div className="relative text-center max-w-4xl mx-auto mb-8">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] shadow-[0_0_20px_rgba(108,59,255,0.5)] transition-shadow duration-200 ease-in-out cursor-pointer hover:shadow-[0_0_30px_rgba(108,59,255,0.6)]">
                      <div className="relative flex">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                        <div className="absolute h-2.5 w-2.5 rounded-full bg-red-500 animate-ping opacity-75"></div>
                      </div>
                      <span className="text-sm font-medium text-white ml-2">Šobrīd tiek spēlēts</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light mb-4 bg-clip-text text-transparent uppercase bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">
                    Tiešraides kazino
                  </h2>
                  <p className="text-[#F9F5FF]/70 max-w-2xl mx-auto text-lg leading-relaxed">
                    Pievienojieties simtiem spēlāju, kuri šobrīd bauda šo populāro kazino
                  </p>
                </div>
              </div>
              
              {/* Live Casino Component */}
              <div className="relative z-10 mx-auto max-w-6xl">
                {liveCasinos[0] && (
                  <LiveCasinoComponent casino={liveCasinos[0]} index={0} />
                )}
              </div>
          
            </div>
            </div>
          </AnimatedSection>
        )}
    
       
        {/* Newsletter Section */}
        <AnimatedSection className="w-full py-10  bg-[#1D053F]">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <NewsletterComponent />
          </div>
        </AnimatedSection>
        
        {/* Casino List Section */}
         <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative mb-16 text-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-[#8126FF]/10 via-transparent to-[#8126FF]/10 opacity-20" />
              
              {/* Section title */}
              <div className="relative text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 text-[#8126FF] mb-4">
          
                </div>
                
                <h2 className="text-2xl md:text-3xl font-light mb-6 bg-clip-text text-transparent uppercase bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">
                  Labākie kazino no BALTIC SLOTS
                </h2>
                
                <p className="text-[#F9F5FF]/70 max-w-2xl mx-auto text-lg leading-relaxed">
                Spēlējiet visuzticamākajiem tiešsaistes kazino ar drošām maksājumu metodēm un ekskluzīviem bonusiem. Jūsu iespēja uz augstākās kvalitātes spēļu pieredzi.
                </p>
                
                {/* Background glow */}
                <div className="absolute -inset-4 bg-[#8126FF]/5 rounded-3xl -z-10 blur-xl"></div>
              </div>
            </div>

            <div className="space-y-4">
              {casinos?.length > 0 && casinos.slice(0, 15).map((casino, index) => (
                <CasinoComponent2 key={casino._id} casino={casino} index={index} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link 
                href="/category/all-casinos" 
                className="group relative px-6 py-3 bg-[#8126FF] text-[#F9F5FF] text-lg rounded-xl overflow-hidden transition-transform hover:scale-105 backdrop-blur-md bg-opacity-50 max-w-xs w-full text-center whitespace-nowrap text-normal"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center">
                  Visi kazino
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection className="w-full bg-[#1A1A1A]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       
             {/* Features Section */}
         <CasinoFeatures />
            
          </div>
        </AnimatedSection>

        {/* Casino Guides */}
        <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-light mb-4 bg-clip-text text-transparent uppercase bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">
                Noderīgas kazino pamācības
              </h2>
              <p className="text-[#F9F5FF]/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Mēs rūpējamies par jums un jūsu pieredzi mūsu piedāvātajos kazino, tāpēc esam sagatavojuši populārākās kazino spēļu pamācības.
              </p>
            </div>
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
              {guides && guides.length > 0 ? guides.slice(0, 3).map((guide, index) => (
                  <AnimatedSection key={index} delay={index * 0.2}>
                    <Link href={`/${guide.slug}`}>
                      <div className="bg-[#1D053F]/80 backdrop-blur-sm border border-[#8126FF]/20 rounded-xl p-8 hover:border-[#8126FF]/40 hover:shadow-[0_0_15px_rgba(129,38,255,0.2)] transition-all duration-300 h-full">
                        <p className="text-sm uppercase tracking-wider text-[#F9F5FF]/60 game-guide-label">Spēļu pamācības</p>
                        <h2 className="text-lg font-light mb-2 text-[#F9F5FF]">{guide.title}</h2>
                        <div className="w-24 h-1 bg-[#8126FF] mb-6"></div>
                        <p className="text-[#F9F5FF]/70 mb-4 text-sm">{guide.description}</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                )) : <p className="text-center col-span-3 text-[#F9F5FF]/70">No guides available</p>}
              </div>
              <div className="flex justify-center">
                <Link 
                  href={`/${casinoGuidesData.slug}`} 
                  className="group relative px-6 py-3 bg-[#8126FF] text-[#F9F5FF] font-normal text-lg rounded-xl overflow-hidden transition-transform hover:scale-105 backdrop-blur-md bg-opacity-50 inline-flex items-center"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center">
                    Lasīt vairāk
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

       

       

        {/* Payment Methods */}
        <AnimatedSection className="w-full bg-[#0D0D0D]">
          <PaymentMethods paymentMethods={uniquePaymentMethods} />
        </AnimatedSection>

      </main>
    </div>
  );
}