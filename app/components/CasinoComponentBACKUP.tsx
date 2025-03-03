"use client"

import Image from "next/image";
import { TypedObject } from '@portabletext/types'
import { PortableText } from '@portabletext/react';
import ClaimButton from './ClaimButton';
import { Sparkles, Shield, Flame, ThumbsUp } from 'lucide-react';
import GaugeComponent from 'react-gauge-component'

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
  slug: {
    current: string;
  };
}

interface PaymentMethod {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
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
  offerUrl: string;
  offerDescription: string;
  offerText: TypedObject[];
  rating: number;
  imageUrl: string;
  termsConditionsUrl: string;
  categories: Category[];
  tags: Tag[];
  paymentMethods: PaymentMethod[];
  orderRank?: number;
  categoryUrls?: CategoryUrl[];
}

interface CasinoProps {
  casino: Casino;
  index: number;
  categorySlug?: string;
}

const TAGS = {
  'Free Spins': '04cd2708-ea30-4cf2-be7b-6503a51c1d81',
  'Trusted': '3c74b95c-5e7e-4d74-9ca8-2fee19e21263',
  'Popular': '1d5ff23f-daa1-4fc9-89b3-dbde52f2839b',
  'Recommended': '3afc3c7e-3421-4b41-a3a2-0de00a605ef5',
};

const CasinoComponent2: React.FC<CasinoProps> = ({ casino, index, categorySlug }) => {

  return (
    <div className={`relative w-full h-[300px] bg-[#1D053F]/80 backdrop-blur-sm
      ${(casino.orderRank || index + 1) <= 3 
        ? 'border-2 border-[#8126FF]/60 shadow-[0_0_15px_rgba(129,38,255,0.3)]' 
        : 'border border-[#8126FF]/20'
      } 
      rounded-2xl p-6 mb-4 transition-colors duration-300 group overflow-hidden`}>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8126FF]/5 to-[#8126FF]/10 opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8 relative z-10 w-full h-full">
        {/* Left column with tags and image */}
        <div className="flex flex-col items-center lg:items-start gap-3 flex-shrink-0">
          {/* Tags section */}
          {casino.tags && casino.tags.length > 0 && (
            <div className="flex flex-col gap-1.5 w-64 sm:w-72 lg:w-48">
              {casino.tags.map((tag) => {
                const getTagIcon = (tagId: string) => {
                  switch(tagId) {
                    case TAGS['Free Spins']:
                      return <Sparkles className="w-4 h-4" />;
                    case TAGS['Trusted']:
                      return <Shield className="w-4 h-4" />;
                    case TAGS['Popular']:
                      return <Flame className="w-4 h-4" />;
                    case TAGS['Recommended']:
                      return <ThumbsUp className="w-4 h-4" />;
                    default:
                      return null;
                  }
                };

                const icon = getTagIcon(tag._id);
                if (!icon) return null;

                return (
                  <div
                    key={tag._id}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-[#8126FF]/10 border border-[#8126FF]/30 text-[#F9F5FF] hover:bg-[#8126FF]/20 transition-colors w-full text-center"
                  >
                    {icon}
                    <span className="text-sm font-medium">{tag.title}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Logo with glow effect */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-48 lg:h-48 flex-shrink-0 mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-[#8126FF]/10 rounded-2xl blur-xl animate-pulse"></div>
            <div className="relative h-full w-full bg-[#1D053F]/40 rounded-2xl border border-[#8126FF]/20 p-4 backdrop-blur-sm">
              <Image
                src={casino.imageUrl}
                alt={casino.offerTitle}
                fill
                className="object-contain p-3"
              />
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-6 h-6 border-t border-l border-[#8126FF]/40" />
              <div className="absolute -bottom-px -right-px w-6 h-6 border-b border-r border-[#8126FF]/40" />
            </div>
            
            {/* Rank indicator */}
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#1D053F] border border-[#8126FF]/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-[#F9F5FF] text-lg font-bold">#{casino.orderRank || index + 1}</span>
            </div>
          </div>
        </div>

        {/* Casino info with vertical accent */}
        <div className="flex-grow flex flex-col border-t lg:border-t-0 lg:border-l-2 border-[#8126FF]/20 pt-8 lg:pt-0 lg:pl-8 w-full text-center lg:text-left">
          <div className="space-y-6 flex-grow">
            <h3 className="text-2xl sm:text-3xl text-[#F9F5FF] group-hover:text-[#8126FF] transition-colors font-bold px-4">
              {casino.offerTitle}
            </h3>

            <p className="text-[#F9F5FF]/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 px-4">
              {casino.offerDescription}
            </p>
            
            {/* Offer Text */}
            <div className="text-[#F9F5FF]/80 text-lg px-4">
              <div className="inline-block text-left max-w-2xl mx-auto">
                <div className="[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2">
                  <PortableText value={casino.offerText} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment methods grid */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 px-4">
            {casino.paymentMethods
              .filter(method => method.image?.asset?.url)
              .slice(0, 5)
              .map((method) => (
              <div
                key={method._id}
                className="relative w-16 h-16 sm:w-16 sm:h-16 bg-[#1D053F]/60 rounded-xl p-2 border border-[#8126FF]/20 group/method backdrop-blur-sm"
              >
                <Image
                  src={method.image.asset.url}
                  alt={method.name}
                  fill
                  className="object-contain p-1.5"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#1D053F]/90 opacity-0 group-hover/method:opacity-100 transition-opacity rounded-xl backdrop-blur-sm">
                  <span className="text-sm text-[#F9F5FF] text-center px-1 font-medium">{method.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="flex-shrink-0 w-full lg:w-48 flex flex-col items-stretch justify-end gap-4 mt-8 lg:mt-0 px-4 lg:px-0">
          <div className="flex flex-col items-center mb-6">
            <div className="w-[120px] h-[75px]">
              <GaugeComponent
                id={`gauge-${casino._id}`}
                type="semicircle"
                arc={{
                  colorArray: ['#8126FF'],
                  subArcs: [{
                    limit: 10,
                    color: '#1D053F',
                    showTick: true
                  }],
                  width: 0.2,
                  padding: 0.02,
                  cornerRadius: 1
                }}
                pointer={{
                  type: "arrow",
                  color: '#FFF',
                  length: 10,
                  width: 40,
                  elastic: true
                }}
                value={casino.rating}
                minValue={0}
                maxValue={10}
                labels={{
                  valueLabel: {
                    formatTextValue: value => value.toFixed(1),
                    style: { 
                      fontSize: "80px",
                      fill: "#ffffff",
                    }
                  },
                  tickLabels: {
                    hideMinMax: true,
                    ticks: [],
                    defaultTickValueConfig: {
                      hide: true
                    },
                    defaultTickLineConfig: {
                      hide: true
                    }
                  }
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="w-full">
            <ClaimButton 
              offerUrl={casino.offerUrl}
              offerTitle={casino.offerTitle}
              categorySlug={categorySlug}
              categoryUrls={casino.categoryUrls}
            />
          </div>
          <a
            href={casino.termsConditionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#F9F5FF]/60 hover:text-[#F9F5FF] transition-colors text-center"
          >
            T&Cs Apply
          </a>
        </div>
      </div>
    </div>
  );
}

export default CasinoComponent2;