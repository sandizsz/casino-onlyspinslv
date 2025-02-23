import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { Casino } from "./utils/interface";
import CasinoComponent from "./components/CasinoComponent";
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
                    Game Guides
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

        {/* Top Picks Section */}
        <section className="relative  bg-[#0D0D0D]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, #C1FF72 1px, transparent 1px), linear-gradient(-45deg, #C1FF72 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <TopPicksComponent casinos={casinos} />
        </section>

        {/* New Informational Section */}
        <AnimatedSection className="relative py-24 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/95 to-[#0D0D0D]"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(193, 255, 114, 0.15) 0%, transparent 50%)`
            }}></div>
          </div>

          <div className="container mx-auto px-4">
            <div className="relative grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C1FF72]/10 border border-[#C1FF72]/20">
                  <span className="w-2 h-2 rounded-full bg-[#C1FF72] animate-pulse"></span>
                  <span className="text-sm font-medium text-[#C1FF72]">Expert Gaming Insights</span>
                </div>
                
                <h2 className="text-4xl font-bold leading-tight">
                  Master the Art of 
                  <span className="block text-[#C1FF72] mt-1">Online Casino Gaming</span>
                </h2>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  Dive into the world of online casinos with confidence. Our comprehensive guides and expert advice will help you navigate the best gaming opportunities and maximize your chances of success.
                </p>

                <div className="flex flex-wrap gap-6 pt-2">
                  <Link 
                    href="/game-guides" 
                    className="inline-flex items-center px-6 py-3 bg-[#C1FF72] text-black font-semibold rounded-xl hover:bg-[#C1FF72]/90 transition-all duration-300 group"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Content - Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#C1FF72]/10">
                  <div className="text-[#C1FF72] mb-3">🎮</div>
                  <h3 className="text-lg font-semibold mb-2">Game Strategies</h3>
                  <p className="text-gray-400 text-sm">Expert tips and proven tactics for popular casino games</p>
                </div>
                
                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#C1FF72]/10">
                  <div className="text-[#C1FF72] mb-3">🎁</div>
                  <h3 className="text-lg font-semibold mb-2">Bonus Tips</h3>
                  <p className="text-gray-400 text-sm">Maximize your rewards with smart bonus strategies</p>
                </div>
                
                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#C1FF72]/10">
                  <div className="text-[#C1FF72] mb-3">🛡️</div>
                  <h3 className="text-lg font-semibold mb-2">Safe Gaming</h3>
                  <p className="text-gray-400 text-sm">Best practices for secure and responsible gaming</p>
                </div>
                
                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#C1FF72]/10">
                  <div className="text-[#C1FF72] mb-3">📈</div>
                  <h3 className="text-lg font-semibold mb-2">Pro Tips</h3>
                  <p className="text-gray-400 text-sm">Advanced techniques from industry experts</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Casino Offers */}
        <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Most exciting offers picked by <span className="text-[#C1FF72]">Bangerslots</span>
            </h2>


            {/* First 4 Casinos Removed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

           
              {casinos?.length > 0 && casinos.slice(4, 50).map((casino, index) => (
                <CasinoComponent key={casino._id} casino={casino} index={index} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
                <Link href={`/category/all-bonuses`} className="inline-flex items-center px-6 py-3 rounded-lg bg-[#C1FF72] hover:bg-[#C1FF72]/80 text-black font-semibold transition-colors duration-300">
                  View All Bonuses
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                Various casino guides to
                <span className="text-[#C1FF72]"> increase your winnings</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We care about you and your experience in the casinos we are providing, that&apos;s why we have
                prepared complete guides of most popular casino games
              </p>
            </div>
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
              {guides.slice(0, 3).map((guide, index) => (
                  <AnimatedSection key={guide.title} delay={index * 0.2}>
                    <Link href={`/${guide.slug}`}>
                      <div className="bg-[#1A1F2C] border border-[#C1FF72]/20 rounded-2xl p-8 hover:border-[#C1FF72]/40 transition-colors h-full">
                        <p className="text-md uppercase tracking-wider text-gray-400 game-guide-label">Game guides</p>
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
                  Read More Guides
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