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
    <AnimatedSection className="from-[#1A1A1A] to-[#0D0D0D]">
      <div className="container mx-auto px-4 py-24 ">
        <div className="max-w-4xl mx-auto ">
          {page.image ? (
            <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidde n">
              <Image
                src={page.image}
                alt={page.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <h1 className="text-5xl font-bold mb-8 text-[#C1FF72] [text-shadow:_0_0_30px_#C1FF72]">
              {page.title}
            </h1>
          )}
          {page.image && <h1 className="text-4xl font-bold mb-4 text-white">{page.title}</h1>}
          <p className="text-xl text-gray-400 mb-8">{page.description}</p>
          <div
            className="prose prose-lg prose-invert max-w-none legal-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
