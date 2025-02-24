import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { Casino } from "./utils/interface";
import ContentPromo from "./components/ContentPromo";
import CasinoComponent2 from "./components/CasinoComponent2";
import AnimatedSection from "./components/AnimatedSection";
import { blackjackData } from "./data/pages/blackjack";
import { sicboData } from "./data/pages/sicbo";
import { kenoData } from "./data/pages/keno";
import { crapsData } from "./data/pages/craps";
import { slotsData } from "./data/pages/onlineslots";
import { rouletteData } from "./data/pages/roulette";
import { baccaratData } from "./data/pages/baccarat";
import { casinoGuidesData } from "./data/pages/guides";
import TopPicksComponent from "./components/TopPicksComponent";
import CasinoFeatures from './components/CasinoFeatures';
import PaymentMethods from './components/PaymentMethods';


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

export const revalidate = 60;

export default async function Home() {

  // 4 first casinos removed
  const casinos: Casino[] = (await getPosts()).slice(0, 16);

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
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <main className="relative">
        {/* Hero Section */}
        <AnimatedSection className="relative min-h-screen bg-[#0D0D0D] overflow-hidden">
          {/* Animated Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] -top-1/4 -right-1/4 animate-slow-spin">
              <div className="w-full h-full border border-[#C1FF72]/10 rounded-full"></div>
              <div className="absolute inset-4 border border-[#C1FF72]/10 rounded-full"></div>
              <div className="absolute inset-8 border border-[#C1FF72]/10 rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C1FF72]/5 blur-[120px] rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="min-h-screen flex flex-col justify-center items-center -mt-20">
              {/* Logo Section */}
              <div className="w-full max-w-[220px] mb-4">
                <Image
                  src="/images/loco-bonus.png"
                  alt="BangerSlots"
                  width={220}
                  height={110}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Main Text */}
              <div className="text-center max-w-4xl mx-auto space-y-4 mb-6">
                <h1 className="text-[4.5rem] font-bold leading-none">
                  <span className="text-white">Level Up </span>
                  <span className="text-[#C1FF72]">Your Game</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Your ultimate destination for casino entertainment and expert gaming strategies
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/category/all-bonuses"
                  className="group relative px-8 py-4 bg-[#C1FF72] text-black font-bold text-lg rounded-xl overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    Explore Top Casinos
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  href="/game-guides"
                  className="group px-8 py-4 bg-transparent border-2 border-[#C1FF72]/20 hover:border-[#C1FF72]/40 text-white font-bold text-lg rounded-xl transition-colors"
                >
                  <span className="flex items-center justify-center">
                      Spēļu pamācības
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#C1FF72]/10 blur-xl rounded-lg group-hover:bg-[#C1FF72]/20 transition-colors"></div>
                  <div className="relative text-center p-4">
                    <div className="text-3xl font-bold text-[#C1FF72] mb-2 group-hover:scale-110 transition-transform">10+</div>
                    <div className="text-sm text-gray-400">Game Categories</div>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#C1FF72]/10 blur-xl rounded-lg group-hover:bg-[#C1FF72]/20 transition-colors"></div>
                  <div className="relative text-center p-4">
                    <div className="text-3xl font-bold text-[#C1FF72] mb-2 group-hover:scale-110 transition-transform">100%</div>
                    <div className="text-sm text-gray-400">Secure Gaming</div>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#C1FF72]/10 blur-xl rounded-lg group-hover:bg-[#C1FF72]/20 transition-colors"></div>
                  <div className="relative text-center p-4">
                    <div className="text-3xl font-bold text-[#C1FF72] mb-2 group-hover:scale-110 transition-transform">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[#C1FF72]/10 blur-xl rounded-lg group-hover:bg-[#C1FF72]/20 transition-colors"></div>
                  <div className="relative text-center p-4">
                    <div className="text-3xl font-bold text-[#C1FF72] mb-2 group-hover:scale-110 transition-transform">50+</div>
                    <div className="text-sm text-gray-400">Expert Guides</div>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-[#C1FF72]/30 flex items-start justify-center p-2">
                  <div className="w-1 h-3 bg-[#C1FF72] rounded-full animate-scroll"></div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

     
       
         {/* Casino List Section */}
         <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative mb-16 text-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 opacity-30" />
              
              {/* Section title with cyberpunk accents */}
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-cyan-400 mb-4">
                  <div className="w-12 h-[2px] bg-cyan-400"></div>
                  <span className="text-sm font-mono uppercase tracking-[0.2em]">Elite Selection</span>
                  <div className="w-12 h-[2px] bg-cyan-400"></div>
                </div>
                
                <h2 className="text-4xl font-display mb-4 text-white">
                  Top-Rated Casinos on <span className="text-cyan-400">SPINNERTOP</span>
                </h2>
                
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Access the most trusted online casinos, featuring secure payment methods and exclusive bonuses. Your gateway to premium gaming experiences.
                </p>
                
                {/* Corner accents */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />
              </div>
            </div>

            <div className="space-y-4">
              {casinos?.length > 0 && casinos.slice(0, 15).map((casino, index) => {
                if (index === 4) {
                  return (
                    <div key={`${casino._id}-section-1`}>
                      <CasinoComponent2 casino={casino} index={index} />
                      <ContentPromo 
                        title="Safe Casino Deposits"
                        description="Explore secure payment methods for online casino gaming."
                        link="/deposit-methods"
                      />
                    </div>
                  );
                }
                if (index === 8) {
                  return (
                    <div key={`${casino._id}-section-2`}>
                      <CasinoComponent2 casino={casino} index={index} />
                      <ContentPromo 
                        title="Casino Game Types"
                        description="Explore a diverse range of casino games, from classic slots to modern video poker."
                        link="/casino-game-types"
                      />
                    </div>
                  );
                }
                if (index === 11) {
                  return (
                    <div key={`${casino._id}-section-3`}>
                      <CasinoComponent2 casino={casino} index={index} />
                      <ContentPromo 
                        title="Casino Tips & Tricks"
                        description="Improve your gaming experience with our curated tips and tricks."
                        link="/casino-tips-tricks"
                      />
                    </div>
                  );
                }
                return <CasinoComponent2 key={casino._id} casino={casino} index={index} />;
              })}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/category/all-casinos" className="group relative bg-black/60 border-2 border-cyan-500/40 text-cyan-400 px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border-cyan-400 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -translate-y-6 group-hover:translate-y-6 transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2 font-mono tracking-wider">
                  EXPLORE ALL CASINOS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection className="w-full py-20 bg-[#1A1A1A]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       
             {/* Features Section */}
         <CasinoFeatures />
            
          </div>
        </AnimatedSection>

        {/* Casino Guides */}
        <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-white">
                Noderīgas kazino pamācības,
                <span className="text-[#C1FF72]"> lai tu uzvarētu biežāk</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
              Mēs rūpējamies par jums un jūsu pieredzi mūsu piedāvātajos kazino, tāpēc esam sagatavojuši populārākās kazino spēļu pamācības.
              </p>
            </div>
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
              {guides.slice(0, 3).map((guide, index) => (
                  <AnimatedSection key={guide.title} delay={index * 0.2}>
                    <Link href={`/${guide.slug}`}>
                      <div className="bg-[#1A1F2C] border border-[#C1FF72]/20 rounded-2xl p-8 hover:border-[#C1FF72]/40 transition-colors h-full">
                        <p className="text-md uppercase tracking-wider text-gray-400 game-guide-label">Spēļu pamācības</p>
                        <h2 className="text-2xl font-bold mb-4">{guide.title}</h2>
                        <div className="w-24 h-1 bg-[#C1FF72] mb-6"></div>
                        <p className="text-gray-300 mb-4">{guide.description}</p>
                       
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <div className="flex justify-center">
                <Link href={`/${casinoGuidesData.slug}`} className="inline-flex items-center px-6 py-3 rounded-lg bg-[#C1FF72] hover:bg-[#C1FF72]/80 text-black font-semibold transition-colors duration-300">
                  Lasīt vairāk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

       

       

        {/* Payment Methods */}
        <PaymentMethods paymentMethods={uniquePaymentMethods} />

      </main>
    </div>
  );
}