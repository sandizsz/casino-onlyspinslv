import { client } from "@/sanity/lib/client";
import CasinoComponent2 from "@/app/components/CasinoComponent2";
import AnimatedSection from "@/app/components/AnimatedSection";
import { Casino } from '@/app/utils/interface';

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCasinosByCategory(slug: string) {
  const query = `*[_type == "casino" && references(*[_type == "category" && slug.current == "${slug}"]._id)] | order(orderRank) {
    _id,
    offerTitle,
    offerUrl,
    offerDescription,
    offerText,
    rating,
    "imageUrl": casinoImage.asset->url,
    termsConditionsUrl,
    freeSpins,
    license,
    minDeposit,
    "categoryUrls": categoryUrls[] {
      "categoryId": category->_id,
      "categorySlug": category->slug.current,
      url,
      urlNumber
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    paymentMethods[]-> {
      _id,
      name,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      }
    }
  }`;
  const data = await client.fetch(query);
  return data as Casino[];
}

async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == "${slug}"][0] {
    _id,
    title,
    description,
    slug
  }`;

  const data = await client.fetch(query);
  return data as Category;
}

// Set to 0 during development to see changes immediately, adjust to higher value in production
export const revalidate = 0;

export default async function CategoryPage({ params }: PageProps) {
  const parameters = await params;
  const slug = parameters.slug;
  const category = await getCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center">
        <p className="text-white">Category not found</p>
      </div>
    );
  }

  const casinos: Casino[] = await getCasinosByCategory(slug);
  
  return (
    <div className="min-h-screen">
      <AnimatedSection className="bg-gradient-to-b from-[#1D053F] to-[#110226] w-full relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full py-8 md:py-12 flex flex-col justify-center items-center">
            {/* Main Content */}
            <div className="relative text-center w-full max-w-4xl mx-auto space-y-4 mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-[#F9F5FF]">
                <span className="bg-clip-text text-transparent bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">{category.title}</span>
              </h1>
              {category.description && (
                <p className="text-lg text-[#F9F5FF]/70 max-w-4xl mx-auto leading-relaxed mb-2 sm:mb-4">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          
          <div className="space-y-4">
            <div className="grid md:grid-cols-1">
              {casinos?.map((casino, index) => (
                <div key={casino._id} className="md:col-span-1">
                  <AnimatedSection>
                    <CasinoComponent2 
                      casino={casino} 
                      index={index} 
                      categorySlug={slug}  // Pass the category slug
                    />
                  </AnimatedSection>
                </div>
              ))}
            </div>
            {(!casinos || casinos.length === 0) && (
              <div className="text-center p-12 rounded-xl border border-[#8126FF]/20 bg-gradient-to-r from-[#1D053F] to-[#2D0B5A] shadow-[0_0_20px_rgba(129,38,255,0.3)]">
                <p className="text-xl text-[#F9F5FF]/70">
                  No casinos found in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
