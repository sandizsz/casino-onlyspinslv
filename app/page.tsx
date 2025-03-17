import { ArrowRight } from 'lucide-react';
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
    bonusCode,
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
export const revalidate = 60;

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
  

  const casinos: Casino[] = allCasinos.slice(0, 12);

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
    <div className="bg-white text-[#9b98df] p-0 lg:p-4">
      <main className="relative pt-0">
        {/* Hero Section */}
        <AnimatedSection className="relative overflow-hidden bg-[#000025] rounded-t-0 lg:rounded-t-3xl rounded-b-3xl">
          {/* Animated Blobs */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* First flame blob */}
            <div className="absolute top-[35%] left-[15%] w-[40%] h-[60%] bg-[#3930ff]/40 blur-[70px] animate-blob-flame FancyBlob_animateOpacity__6GgAA"></div>
            {/* Second flame blob - positioned top right */}
            <div className="absolute top-[5%] right-[10%] w-[35%] h-[50%] bg-[#3930ff]/45 blur-[80px] animate-blob-flame-delayed"></div>
       
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto min-h-[100vh] sm:min-h-[100vh] lg:min-h-[96vh] content-center px-3 sm:px-4 md:px-6">
            <div className="min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] py-12 sm:py-16 md:py-20 flex flex-col justify-center items-center">
              {/* Main Content */}
              <div className="relative text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 mb-3 sm:mb-4 md:mb-8 px-2 sm:px-4 md:px-6">
              
                
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight text-[#F9F5FF]">
                ONLINE CASINO 
                <span className="bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight"> JAUNUMI</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                Izbaudi svaigākos un ekskluzīvākos kazino piedāvājumus Latvijā
                </p>
              
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 w-full max-w-xl mx-auto px-3 sm:px-2 md:px-0">
              <Link 
                  href="/kategorija/visi-bonusi"
                  className="group relative px-5 sm:px-6 py-2 sm:py-3 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden backdrop-blur-md w-full sm:flex-1 text-center whitespace-nowrap"
                >
                  <span className="relative flex items-center justify-center">
                    Visi kazino
                    <ArrowRight className="ml-2 h-5 w-5 transform transition-all duration-300 ease-bounce-out group-hover:translate-x-1.5 group-hover:duration-200" />
                  </span>
                </Link>
                <Link 
                  href="/spelu-pamacibas"
                  className="group px-5 sm:px-6 py-2 sm:py-3 bg-[#F9F5FF]/5 backdrop-blur-md border border-[#F9F5FF]/20 hover:border-[#8126FF]/40 text-[#F9F5FF] text-base sm:text-lg rounded-xl transition-all hover:bg-[#F9F5FF]/10 w-full sm:flex-1 text-center whitespace-nowrap"
                >
                  <span className="flex items-center justify-center">
                      Spēļu pamācības
                   
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl w-full mx-auto px-4 sm:px-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#F9F5FF] mb-1 sm:mb-2">10+</div>
                    <div className="text-xs sm:text-sm font-medium text-[#9b98df]">Spēļu kategorijas</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#F9F5FF] mb-1 sm:mb-2">100%</div>
                    <div className="text-xs sm:text-sm font-medium text-[#9b98df]">Droši kazino</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#F9F5FF] mb-1 sm:mb-2">24/7</div>
                    <div className="text-xs sm:text-sm font-medium text-[#9b98df]">Atbalsts</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 rounded-2xl"></div>
                  <div className="relative backdrop-blur-sm border border-[#F9F5FF]/5 rounded-2xl p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#F9F5FF] mb-1 sm:mb-2">50+</div>
                    <div className="text-xs sm:text-sm font-medium text-[#9b98df]">Spēļu pamācības</div>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator - Hidden on mobile, visible on larger screens */}
              <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="relative w-5 h-8 rounded-full p-[1.5px] backdrop-blur-sm overflow-hidden">
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]"></div>
                  {/* Inner content with background */}
                  <div className="absolute inset-[1px] rounded-full bg-[#1D053F]/80 flex items-start justify-center p-1.5">
                    <div className="w-1 h-2.5 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] rounded-full animate-scroll"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

      
       
        
        {/* Currently Playing Casino Section - Only shown if there are casinos with the specific tag */}
        {liveCasinos && liveCasinos.length > 0 && (
          <AnimatedSection className="relative overflow-hidden bg-[#000025] rounded-3xl mt-12 py-12 sm:py-16 md:py-20">
            {/* Animated Blobs */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {/* First flame blob */}
              <div className="absolute top-[35%] left-[15%] w-[40%] h-[60%] bg-[#3930ff]/40 blur-[70px] animate-blob-flame"></div>
              {/* Second flame blob - positioned top right */}
              <div className="absolute top-[5%] right-[10%] w-[35%] h-[50%] bg-[#3930ff]/45 blur-[80px] animate-blob-flame-delayed"></div>
              {/* Third flame blob */}
              <div className="absolute bottom-[20%] right-[25%] w-[30%] h-[45%] bg-[#3930ff]/35 blur-[60px] animate-blob-flame" style={{animationDelay: '1.5s'}}></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative text-center max-w-4xl mx-auto mb-8 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F9F5FF]/5 backdrop-blur-md border border-[#F9F5FF]/20 hover:border-[#8126FF]/40 transition-all hover:bg-[#F9F5FF]/10">
                    <div className="relative flex">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                      <div className="absolute h-2.5 w-2.5 rounded-full bg-red-500 animate-ping opacity-75"></div>
                    </div>
                    <span className="text-sm font-medium text-[#F9F5FF] ml-2">Šobrīd tiek spēlēts</span>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light mb-2 text-[#F9F5FF]">
                  TIEŠRAIDES <span className="bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">KAZINO</span>
                </h2>
                <p className="text-sm sm:text-base text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                  Pievienojieties simtiem spēlāju, kuri šobrīd bauda šo populāro kazino
                </p>
              </div>
              
              {/* Live Casino Component */}
              <div className="relative z-10 mx-auto max-w-6xl">
                {liveCasinos[0] && (
                  <LiveCasinoComponent casino={liveCasinos[0]} index={0} />
                )}
              </div>
            </div>
          </AnimatedSection>
        )}
    
       
        {/* Newsletter Section */}
        <AnimatedSection className="w-full py-10 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <NewsletterComponent />
          </div>
        </AnimatedSection>
        
        {/* Casino List Section */}
         <AnimatedSection className="relative overflow-hidden w-full py-20 bg-[#000025] rounded-3xl">
          {/* Animated Blobs for Casino List */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Single top blob - centered behind title */}
            <div className="absolute top-[5%] left-[30%] w-[40%] h-[35%] bg-[#3930ff]/40 blur-[75px] animate-blob-flame FancyBlob_animateOpacity__6GgAA"></div>
            {/* Far-middle blob - positioned away from the top */}
            <div className="absolute top-[60%] right-[15%] w-[35%] h-[45%] bg-[#3930ff]/35 blur-[80px] animate-blob-flame-delayed"></div>
            {/* Bottom blob - well below the title area */}
            <div className="absolute bottom-[10%] left-[25%] w-[30%] h-[40%] bg-[#3930ff]/30 blur-[60px] animate-blob-flame" style={{animationDelay: '1.5s'}}></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative mb-16 text-center">
              {/* Background glow effect - removed to avoid multiple blob appearance */}
              
              {/* Section title */}
              <div className="relative text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 text-[#8126FF] mb-4">
          
                </div>
                
                <h2 className="text-2xl md:text-3xl font-light mb-6 uppercase text-[#F9F5FF]">
                  LABĀKIE KAZINO NO <span className="bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">BALTIC SLOTS</span>
                </h2>
                
                <p className="text-[#9b98df] max-w-2xl mx-auto text-lg leading-relaxed">
                Spēlējiet visuzticamākajiem tiešsaistes kazino ar drošām maksājumu metodēm un ekskluzīviem bonusiem. Jūsu iespēja uz augstākās kvalitātes spēļu pieredzi.
                </p>
                
                {/* Background glow - removed to avoid multiple blob appearance */}
              </div>
            </div>

            <div className="space-y-4">
              {casinos?.length > 0 && casinos.slice(0, 15).map((casino, index) => (
                <CasinoComponent2 key={casino._id} casino={casino} index={index} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
            <Link 
  href="/kategorija/visi-bonusi"
  className="group relative px-8 sm:px-6 py-4 sm:py-3 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden backdrop-blur-md w-full sm:w-auto sm:max-w-xs text-center whitespace-nowrap"
>
  <span className="relative flex items-center justify-center">
    Visi kazino
    <ArrowRight className="ml-2 h-5 w-5 transform transition-all duration-300 ease-bounce-out group-hover:translate-x-1.5 group-hover:duration-200" />
  </span>
</Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection className="w-full bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       
             {/* Features Section */}
         <CasinoFeatures />
            
          </div>
        </AnimatedSection>

        {/* Casino Guides */}
        <AnimatedSection className="relative overflow-hidden w-full py-20 bg-[#000025] rounded-0 rounded-t-3xl lg:rounded-3xl">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Single top blob - centered behind title */}
            <div className="absolute top-[5%] left-[30%] w-[40%] h-[35%] bg-[#3930ff]/40 blur-[75px] animate-blob-flame FancyBlob_animateOpacity__6GgAA"></div>
            {/* Far-middle blob - positioned away from the top */}
            <div className="absolute top-[60%] right-[15%] w-[35%] h-[45%] bg-[#3930ff]/35 blur-[80px] animate-blob-flame-delayed"></div>
            {/* Bottom blob - well below the title area */}
            <div className="absolute bottom-[10%] left-[25%] w-[30%] h-[40%] bg-[#3930ff]/30 blur-[60px] animate-blob-flame" style={{animationDelay: '1.5s'}}></div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12 relative z-10">
              <h2 className="text-2xl md:text-3xl font-light mb-4 uppercase text-[#F9F5FF] relative inline-block">
                <span className="relative z-10">Noderīgas kazino pamācības</span>
              </h2>
              <p className="text-[#9b98df] max-w-2xl mx-auto text-lg leading-relaxed relative z-10">
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
                        <h2 className="uppercase text-lg font-light mb-2 text-[#F9F5FF]">{guide.title}</h2>
                        <div className="w-24 h-1 bg-[#8126FF] mb-6"></div>
                        <p className="text-[#9b98df] mb-4 text-sm">{guide.description}</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                )) : <p className="text-center col-span-3 text-[#F9F5FF]/70">No guides available</p>}
              </div>
              <div className="flex justify-center">
            

                <Link 
  href={`/${casinoGuidesData.slug}`} 
  className="group relative px-8 sm:px-6 py-4 sm:py-3 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-base sm:text-lg rounded-xl overflow-hidden backdrop-blur-md w-full sm:w-auto sm:max-w-xs text-center whitespace-nowrap"
>
  <span className="relative flex items-center justify-center">
  Lasīt vairāk
    <ArrowRight className="ml-2 h-5 w-5 transform transition-all duration-300 ease-bounce-out group-hover:translate-x-1.5 group-hover:duration-200" />
  </span>
</Link>
              </div>
            </div>
          </div>

            {/* Payment Methods */}
        <AnimatedSection className="w-full">
          <PaymentMethods paymentMethods={uniquePaymentMethods} />
        </AnimatedSection>

        </AnimatedSection>

       

       

      

      </main>
    </div>
  );
}