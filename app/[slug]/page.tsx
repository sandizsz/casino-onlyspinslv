import { notFound } from 'next/navigation';
import Image from 'next/image';
import AnimatedSection from '../components/AnimatedSection';
import { PageData } from '@/app/types/pageTypes';

// Import page data
import { blackjackData } from '../data/pages/blackjack';
import { rouletteData } from '../data/pages/roulette';
import { baccaratData } from '../data/pages/baccarat';
import { sicboData } from "../data/pages/sicbo";
import { slotsData } from '../data/pages/onlineslots';
import { kenoData } from '../data/pages/keno';
import { crapsData } from '../data/pages/craps';
import { privacyPolicyData, disclaimerData, termsConditionsData, cookiePolicyData } from '../data/pages/legal';
import { casinoGuidesData, gamblingAdviceData, paymentMethodsData } from '../data/pages/guides';


// Combine all page data
const pages: PageData[] = [
  blackjackData,
  kenoData,
  crapsData,
  sicboData,
  rouletteData,
  baccaratData,
  privacyPolicyData,
  disclaimerData,
  termsConditionsData,
  cookiePolicyData,
  casinoGuidesData,
  gamblingAdviceData,
  paymentMethodsData,
  slotsData
];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-white text-[#9b98df] p-0 lg:p-4">
      <main className="relative pt-0">
        {/* Hero Section */}
        <AnimatedSection className="relative overflow-hidden bg-gradient-to-b from-[#1D053F] to-[#110226] rounded-t-0 lg:rounded-t-3xl rounded-b-3xl">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0"></div>
            {/* Bottom shadow for better transition */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#000025] to-transparent"></div>
          </div>
          
          {/* Image with overlay */}
          {page.image && (
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(100% 100% at 50.6% 0, rgba(0,0,37,0) 0, #000025 75.59%)' }}></div>
              <Image
                src={page.image}
                alt={page.title}
                fill
                className="object-cover opacity-40 -z-10"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 container mx-auto min-h-[75vh] content-center px-3 sm:px-4 md:px-6">
            <div className="min-h-[75vh] py-8 sm:py-10 md:py-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20">
              {/* Main Content */}
              <div className="relative text-center max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F9F5FF] uppercase drop-shadow-md">
                  {page.title} 
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                  {page.description}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 relative">

          <div
            className="prose prose-lg max-w-none legal-content text-[#1D053F]"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </main>
    </div>
  );
}
