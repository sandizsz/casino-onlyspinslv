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
  className?: string;
}

export default function ClaimButton({ offerUrl, offerTitle, categorySlug, categoryUrls, className }: ClaimButtonProps) {
  const getUrl = () => {
    if (categorySlug && categoryUrls?.length) {
      const categoryUrl = categoryUrls.find(cu => cu.categorySlug === categorySlug)?.url;
      if (categoryUrl) return categoryUrl;
    }
    return offerUrl;
  };

  // Generate the short link path similar to the right column CTA
  const getShortLinkPath = () => {
    if (categorySlug && categoryUrls?.length) {
      const urlNumber = categoryUrls.find(cu => cu.categorySlug === categorySlug)?.urlNumber || '';
      return `/${offerTitle.toLowerCase().replace(/\s+/g, '')}-offer${urlNumber}`;
    }
    return `/${offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`;
  };

  return (
    <Link
      href={getShortLinkPath()}
      onClick={(e) => {
        e.preventDefault();
        window.open(getUrl(), '_blank');
      }}
    >
      <Button
        className={`w-full bg-[#000025] hover:bg-[#000040] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors duration-300 relative overflow-hidden ${className || ''}`}
      >
        <span className="relative z-10">Reģistrēties</span>
      </Button>
    </Link>
  );
}