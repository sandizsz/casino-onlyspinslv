import { notFound } from 'next/navigation';
import Image from 'next/image';
import AnimatedSection from '../components/AnimatedSection';
import { PageData } from '../types/pageTypes';

// Import page data
import { blackjackData } from '../data/pages/blackjack';
import { rouletteData } from '../data/pages/roulette';
import { baccaratData } from '../data/pages/baccarat';
import { sicboData } from "../data/pages/sicbo";
import { slotsData } from '../data/pages/onlineslots';
import { kenoData } from '../data/pages/keno';
import { crapsData } from '../data/pages/craps';
import { privacyPolicyData, disclaimerData, termsConditionsData, cookiePolicyData } from '../data/pages/legal';
import { casinoGuidesData, gamblingAdviceData, } from '../data/pages/guides';


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
    <AnimatedSection className="bg-gradient-to-b from-[#1D053F] to-[#110226]">
      <div className="container mx-auto px-4 py-24 relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {page.image ? (
            <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden border border-[#8126FF]/20 shadow-[0_0_20px_rgba(129,38,255,0.2)]">
              <Image
                src={page.image}
                alt={page.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-8">
              <span className="bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">
                {page.title} 
              </span>
            </h1>
          )}
          {page.image && <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-4">
            <span className="bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">
              {page.title}
            </span>
          </h1>}
          <p className="text-xl text-[#F9F5FF]/70 mb-8">{page.description}</p>
          <div
            className="prose prose-lg prose-invert max-w-none legal-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
