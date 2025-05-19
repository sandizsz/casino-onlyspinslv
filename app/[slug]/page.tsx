// app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageData } from '@/app/types/pageTypes';

// ✅ Statically import all page data
import { blackjackData } from '../data/pages/blackjack';
import { rouletteData } from '../data/pages/roulette';
import { baccaratData } from '../data/pages/baccarat';
import { sicboData } from '../data/pages/sicbo';
import { slotsData } from '../data/pages/onlineslots';
import { kenoData } from '../data/pages/keno';
import { crapsData } from '../data/pages/craps';
import {
  privacyPolicyData,
  disclaimerData,
  termsConditionsData,
  cookiePolicyData,
} from '../data/pages/legal';
import {
  casinoGuidesData,
  gamblingAdviceData,
  paymentMethodsData,
} from '../data/pages/guides';

// ✅ Combine all page data into a single array
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
  slotsData,
];

// ✅ Define static paths for SSG
export async function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

// ✅ Correct type definition for dynamic metadata
export async function generateMetadata(
  { params }: { params: { slug: string } } | { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  // Defensive: support both Promise and plain object
  let slug: string;
  if (typeof (params as any)?.then === 'function') {
    // params is a Promise
    const awaited = await (params as unknown as Promise<{ slug: string }>);
    slug = awaited.slug;
  } else {
    slug = (params as { slug: string }).slug;
  }
  const page = pages.find((p) => p.slug === slug);

  if (!page) {
    return {
      title: 'Not Found | Casino Only Spins',
      description: 'Page not found.',
    };
  }

  return {
    title: page.metaTitle || `${page.title} | Casino Only Spins`,
    description: page.metaDescription || page.description,
  };
}

// ✅ Fix type and dynamic route usage for Next.js 15
interface PageProps {
  params: { slug: string };
}

// ✅ Main Page Component (no await on params needed here anymore)
export default async function Page({ params }: PageProps) {
  // Defensive: support both Promise and plain object for params
  let slug: string;
  if (typeof (params as any)?.then === 'function') {
    // params is a Promise
    const awaited = await (params as unknown as Promise<{ slug: string }>);
    slug = awaited.slug;
  } else {
    slug = (params as { slug: string }).slug;
  }
  const page = pages.find((p) => p.slug === slug);

  if (!page) notFound();

  return (
    <div className="bg-white text-[#9b98df] p-0 lg:p-4">
      <main className="relative pt-0">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#1D053F] to-[#110226] rounded-t-0 lg:rounded-t-3xl rounded-b-3xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24" />
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#000025] to-transparent" />
          </div>

          {page.image && (
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(100% 100% at 50.6% 0, rgba(0,0,37,0) 0, #000025 75.59%)',
                }}
              />
              <Image
                src={page.image}
                alt={page.title}
                fill
                className="object-cover opacity-40 -z-10"
                priority
              />
            </div>
          )}

          <div className="relative z-10 container mx-auto min-h-[75vh] content-center px-3 sm:px-4 md:px-6">
            <div className="min-h-[75vh] py-8 sm:py-10 md:py-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20">
              <div className="relative text-center max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-6">
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-light leading-tight text-[#F9F5FF] uppercase">
                  {page.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                  {page.description}
                </p>
              </div>
            </div>
          </div>
        </div>

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
