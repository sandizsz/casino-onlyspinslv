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
        className={`w-full bg-[#8126FF] hover:bg-[#9126FF] text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors duration-300 relative overflow-hidden ${className || ''}`}
      >
        <span className="relative z-10">Reģistrēties</span>
      </Button>
    </Link>
  );
}