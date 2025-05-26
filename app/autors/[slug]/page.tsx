import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPostCard } from '../../components/BlogPostCard';

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: { asset: { url: string } };
  bio?: string;
}

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  image: SanityImage;
}

interface AuthorPageProps {
  params: { slug: string };
}

const authorQuery = groq`
  *[_type == 'author' && slug.current == $slug][0] {
    _id, name, slug, image, bio
  }
`;

const postsByAuthorQuery = groq`
  *[_type == 'blogPost' && references($authorId)] | order(publishedAt desc) {
    _id, 
    title, 
    slug, 
    publishedAt, 
    excerpt, 
    "image": image {
      _type,
      asset->,
      alt
    }
  }
`;

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author: Author = await client.fetch(authorQuery, { slug: params.slug });
  if (!author) return <div className="legal-content max-w-2xl mx-auto py-16">Author not found.</div>;

  // Fetch posts by author
  const posts: BlogPost[] = await client.fetch(postsByAuthorQuery, { authorId: author._id });

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
          
          {author.image?.asset?.url && (
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(100% 100% at 50.6% 0, rgba(0,0,37,0) 0, #000025 75.59%)',
                }}
              />
              <Image
                src={author.image.asset.url}
                alt={author.name}
                fill
                className="object-cover opacity-40 -z-10"
                priority
              />
            </div>
          )}

          <div className="relative z-10 container mx-auto min-h-[75vh] content-center px-3 sm:px-4 md:px-6">
            <div className="min-h-[75vh] py-8 sm:py-10 md:py-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20">
              <div className="relative text-center max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-6">
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-light leading-tight text-[#F9F5FF]">
                  {author.name}
                </h1>
                {author.bio && (
                  <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                    {author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Posts List */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4 md:mt-8">
 
          
          {posts.length === 0 ? (
            <div className="text-center py-8 text-[#1D053F]/70">No posts yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
