import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ClaimButton from '@/app/components/ClaimButton';
import { TypedObject } from '@portabletext/types';
import CasinoHeroComponent from '@/app/components/CasinoHeroComponent';

// Define TypeScript interfaces
interface SanityImage {
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface PaymentMethod {
  _id: string;
  title: string;
  paymentImage?: SanityImage;
  name?: string;
  image?: {
    asset: {
      url: string;
    };
  };
}

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface Tag {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
}

interface CategoryUrl {
  categoryId: string;
  categorySlug: string;
  url: string;
  urlNumber?: string;
}

interface Casino {
  _id: string;
  offerTitle: string;
  slug: {
    current: string;
  };
  casinoImage?: SanityImage;
  offerDescription?: string;
  rating?: number;
  bonusCode?: string;
  offerUrl?: string;
  termsConditionsUrl?: string;
  offerText?: TypedObject[];
  categories?: Category[];
  tags?: Tag[];
  freeSpins?: number;
  license?: string;
  minDeposit?: number;
  paymentMethods?: PaymentMethod[];
  categoryUrls?: CategoryUrl[];
}

// Define page params
interface PageProps {
  params: {
    slug: string;
  };
}

// Fetch casino data
async function getCasino(slug: string): Promise<Casino | null> {
  const query = groq`*[_type == "casino" && slug.current == $slug][0]{
    _id,
    offerTitle,
    slug,
    casinoImage,
    offerDescription,
    rating,
    bonusCode,
    offerUrl,
    termsConditionsUrl,
    offerText,
    categories[]->{
      _id,
      title,
      slug
    },
    tags[]->{
      _id,
      title
    },
    freeSpins,
    license,
    minDeposit,
    paymentMethods[]->{
      _id,
      title,
      name,
      paymentImage,
      image{
        asset->{
          url
        }
      }
    }
  }`;

  return await client.fetch(query, { slug });
}

// Generate metadata for casino page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const casino = await getCasino(params.slug);
  
  if (!casino) {
    return {
      title: 'Nav atrasts | Balticslots',
      description: 'Nav atrasts kazino.',
    };
  }

  return {
    title: `${casino.offerTitle} | ${casino.offerDescription || 'Balticslots'}`,
    description: casino.offerDescription || `Spēlē ${casino.offerTitle} kazino un saņem bonusu!`,
  };
}

// Generate static paths for all casinos
export async function generateStaticParams() {
  const query = groq`*[_type == "casino" && defined(slug.current)]{
    "slug": slug.current
  }`;
  const slugs = await client.fetch(query);
  
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

export default async function CasinoPage({ params }: PageProps) {
  const casino = await getCasino(params.slug);
  
  if (!casino) {
    notFound();
  }

  // Pre-process image URLs for the casino image and payment methods
  const casinoImageUrl = casino.casinoImage ? urlFor(casino.casinoImage).url() : '/placeholder-casino.png';
  
  // Create a map of payment method IDs to their image URLs
  const paymentMethodImageUrls: Record<string, string> = {};
  if (casino.paymentMethods) {
    casino.paymentMethods.forEach(method => {
      if (method._id && method.paymentImage) {
        paymentMethodImageUrls[method._id] = urlFor(method.paymentImage).url();
      }
    });
  }

  return (
    <div className="bg-white text-[#9b98df] p-0 lg:p-4">
      <main className="relative pt-0 mt-0">
        {/* Hero section with CasinoHeroComponent */}
        <CasinoHeroComponent 
          casino={casino} 
          casinoImageUrl={casinoImageUrl}
          paymentMethodImageUrls={paymentMethodImageUrls}
        />
        
        {/* Content section with white background */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 relative">
          {/* Casino details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Offer details */}
              {casino.offerText && casino.offerText.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-[#1D053F]">Par kazino</h2>
                  
                  {/* Bubble-style bullet points */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {casino.offerText.map((block: any, blockIndex: number) => {
                      // Process bullet list blocks as bubbles
                      if (block._type === 'block' && block.listItem === 'bullet') {
                        return (
                          <div 
                            key={blockIndex} 
                            className="bg-[#8126FF]/10 hover:bg-[#8126FF]/20 text-[#8126FF] px-4 py-2 rounded-full transition-colors"
                          >
                            {block.children?.map((child: { text: string }, childIndex: number) => (
                              <span key={childIndex}>{child.text}</span>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  {/* Regular content (non-bullet points) */}
                  <div className="legal-content text-[#1D053F]">
                    {casino.offerText.map((block: any, blockIndex: number) => {
                      // Only render non-bullet content in this section
                      if (block._type === 'block' && !block.listItem) {
                        return <PortableText key={blockIndex} value={[block]} />;
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
              
              {/* Categories */}
              {casino.categories && casino.categories.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-[#1D053F]">Kategorijas</h2>
                  <div className="flex flex-wrap gap-2">
                    {casino.categories.map(category => (
                      <Link 
                        key={category._id} 
                        href={`/kategorija/${category.slug?.current}`}
                        className="bg-[#8126FF]/10 hover:bg-[#8126FF]/20 text-[#8126FF] px-4 py-2 rounded-full transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
            
            </div>
            
            <div className="md:col-span-1">
              {/* Mobile-friendly CTA */}
              <div className="sticky top-24">
                {casino.offerUrl && (
                  <div className="bg-gradient-to-b from-[#1D053F] to-[#110226] p-6 rounded-lg shadow-lg text-center mb-8">
                    <h2 className="text-xl font-bold mb-2 text-[#F9F5FF]">Gatavs spēlēt?</h2>
                    <p className="text-[#F9F5FF]/70 mb-4">Saņem savu bonusu tūlīt!</p>
                    <ClaimButton 
                      offerUrl={casino.offerUrl} 
                      offerTitle={casino.offerTitle}
                      categoryUrls={casino.categoryUrls}
                      className="group relative px-5 sm:px-6 py-6 sm:py-6 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] text-[#F9F5FF] text-lg sm:text-xl rounded-xl overflow-hidden transition-transform hover:scale-101 backdrop-blur-md bg-opacity-50 w-full whitespace-nowrap shadow-md hover:shadow-lg"
                    />
                  </div>
                )}
                
             
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
