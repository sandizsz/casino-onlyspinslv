
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
    <div className="bg-white text-[#9b98df] p-0 lg:p-4">
      <main className="relative pt-0">
        {/* Hero Section */}
        <AnimatedSection className="relative overflow-hidden bg-[#000025] rounded-t-0 lg:rounded-t-3xl rounded-b-3xl">
          {/* Animated Blobs */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* First flame blob */}
            <div className="absolute top-[35%] left-[15%] w-[40%] h-[60%] bg-[#3930ff]/40 blur-[70px] animate-blob-flame FancyBlob_animateOpacity__6GgAA"></div>
            {/* Second flame blob - positioned top right */}
            <div className="absolute top-[5%] right-[10%] w-[35%] h-[50%] bg-[#3930ff]/45 blur-[80px] animate-blob-flame-delayed"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto min-h-[60vh] content-center px-3 sm:px-4 md:px-6">
            <div className="min-h-[60vh] py-8 sm:py-10 md:py-12 flex flex-col justify-center items-center pt-16 sm:pt-20">
              {/* Main Content */}
              <div className="relative text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 mb-3 sm:mb-4 md:mb-8 px-2 sm:px-4 md:px-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#F9F5FF]">
              {category.title}  
                </h1>
                {category.description && (
                  <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                    {category.description}
                  </p>
                )}
              </div>

             
               {/* Scroll Indicator - Hidden on mobile, visible on larger screens */}
               <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="relative w-5 h-8 rounded-full p-[1.5px] backdrop-blur-sm overflow-hidden">
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]"></div>
                  {/* Inner content with background */}
                  <div className="absolute inset-[1px] rounded-full bg-[#1D053F]/80 flex items-start justify-center p-1.5">
                    <div className="w-1 h-2.5 bg-[linear-gradient(91.63deg,#773DFF,#362FFF)] rounded-full animate-scroll"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
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
      </main>
    </div>
  );
}
