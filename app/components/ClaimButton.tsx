'use client'
import { Button } from "./ui/button"
import Link from "next/link"

interface ClaimButtonProps {
  offerUrl: string;
  offerTitle: string;
  categorySlug?: string;
  categoryUrls?: Array<{
    categoryId: string;
    categorySlug: string;
    url: string;
    urlNumber?: string;
  }>;
}

export default function ClaimButton({ offerUrl, offerTitle, categorySlug, categoryUrls }: ClaimButtonProps) {
  const getFriendlyUrl = () => {
    const baseUrl = `/${offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`;
    if (categorySlug && categoryUrls?.length) {
      const categoryUrl = categoryUrls.find(cu => cu.categorySlug === categorySlug);
      if (categoryUrl?.urlNumber) {
        return `${baseUrl}${categoryUrl.urlNumber}`;
      }
    }
    return baseUrl;
  };

  const getUrl = () => {
    if (categorySlug && categoryUrls?.length) {
      const categoryUrl = categoryUrls.find(cu => cu.categorySlug === categorySlug)?.url;
      if (categoryUrl) return categoryUrl;
    }
    return offerUrl;
  };

  return (
    <Link
      href={getFriendlyUrl()}
      onClick={(e) => {
        e.preventDefault();
        window.open(getUrl(), '_blank');
      }}
    >
      <Button
        className="w-full bg-gradient-to-r from-[#C1FF72] to-[#C1FF72] hover:from-[#C1FF72] hover:to-[#C1FF72] text-black font-bold text-lg px-8 py-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(193,255,114,0.3)] relative overflow-hidden group"
      >
        <span className="relative z-10">Claim Bonus</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </Button>
    </Link>
  );
}