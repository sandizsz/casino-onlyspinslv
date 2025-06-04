import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { BlogPostCard } from '../components/BlogPostCard';

export const metadata: Metadata = {
  title: 'Blogs | Balticslots',
  description: 'Lasiet mūsu jaunākos bloga ierakstus par kazino spēlēm, stratēģijām un daudz ko citu.',
};  

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  image: SanityImage;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      image {
        ...,
        asset->,
        alt
      }
    }
  `);
}

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="bg-white text-[#9b98df] p-0 lg:p-4">
      <main className="relative pt-0">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#1D053F] to-[#110226] rounded-t-0 lg:rounded-t-3xl rounded-b-3xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24" />
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#000025] to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto min-h-[50vh] sm:min-h-[60vh] md:min-h-[75vh] content-center px-3 sm:px-4 md:px-6">
            <div className="min-h-[50vh] sm:min-h-[60vh] md:min-h-[75vh] py-6 sm:py-8 md:py-12 flex flex-col justify-end items-center pb-8 sm:pb-12 md:pb-20">
              <div className="relative text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6 mb-3 sm:mb-5 md:mb-8 px-2 sm:px-4 md:px-6">
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-light leading-tight text-[#F9F5FF] uppercase">
                  Mūsu Blogs
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                  Jaunākās ziņas, ceļveži un ieskati par kazino spēlēm un stratēģijām
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
          
          {blogPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#1D053F] text-lg">Bloga ieraksti nav atrasti. Pārbaudiet vēlāk!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
