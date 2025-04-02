import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

// Import page data
import { blackjackData } from '../../data/pages/blackjack';
import { rouletteData } from '../../data/pages/roulette';
import { baccaratData } from '../../data/pages/baccarat';
import { sicboData } from "../../data/pages/sicbo";
import { slotsData } from '../../data/pages/onlineslots';
import { kenoData } from '../../data/pages/keno';
import { crapsData } from '../../data/pages/craps';
import { privacyPolicyData, disclaimerData, termsConditionsData, cookiePolicyData } from '../../data/pages/legal';
import { casinoGuidesData, gamblingAdviceData, paymentMethodsData } from '../../data/pages/guides';

// Combine all static page data
const staticPages = [
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

export async function GET() {
  // Base URL of your website
  const baseUrl = 'https://balticslots.lv';
  
  // Define types for Sanity items
  interface CasinoItem {
    slug: string;
  }

  interface CategoryItem {
    slug: string;
  }

  // Get dynamic content from Sanity
  const casinoQuery = `*[_type == "casino"] {
    "slug": _id
  }`;
  
  const categoryQuery = `*[_type == "category"] {
    "slug": slug.current
  }`;
  
  // Fetch data from Sanity
  const casinos: CasinoItem[] = await client.fetch(casinoQuery);
  const categories: CategoryItem[] = await client.fetch(categoryQuery);
  
  // Start building the XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage
  xml += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`;
  
  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });
  
  // Add category pages
  xml += `  <url>
    <loc>${baseUrl}/kategorija</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  
  categories.forEach((category: CategoryItem) => {
    xml += `  <url>
    <loc>${baseUrl}/kategorija/${category.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });
  
  // Add casino pages
  casinos.forEach((casino: CasinoItem) => {
    xml += `  <url>
    <loc>${baseUrl}/${casino.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
  });
  
  // Close XML
  xml += '</urlset>';
  
  // Return XML with proper content type
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
