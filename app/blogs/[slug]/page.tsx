import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { BlogPostCard } from '../../components/BlogPostCard';

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

interface TableRow {
  _key: string;
  _type: string;
  cells: string[];
}

interface SanityTable {
  _key: string;
  _type: 'table';
  rows: TableRow[];
}

type PortableTextBlock = {
  _key: string;
  _type: 'block';
  children: Array<{
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }>;
  markDefs: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style: string;
};

type ContentBlock = PortableTextBlock | SanityImage | SanityTable;

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  content: ContentBlock[];
  image: SanityImage;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Balticslots',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Balticslots`,
    description: post.metaDescription || post.excerpt,
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      content[] {
        ...,
        _type == "table" => {
          ...,
          rows[] {
            ...,
            cells
          }
        }
      },
      image {
        ...,
        asset->,
        alt
      },
      metaTitle,
      metaDescription,
      excerpt
    }
  `, { slug });
}

async function getRelatedBlogPosts(currentPostId: string): Promise<BlogPost[]> {
  return await client.fetch(`
    *[_type == "blogPost" && _id != $currentPostId] | order(publishedAt desc)[0...6] {
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
  `, { currentPostId });
}

export async function generateStaticParams() {
  const posts = await client.fetch(`
    *[_type == "blogPost"] {
      slug
    }
  `);

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

  // PortableTextComponents is already imported at the top of the file

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6 relative w-full h-64 md:h-96">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog post image'}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
    table: ({ value }) => {
      // Check if we have valid table data
      if (!value || !value.rows || !Array.isArray(value.rows) || value.rows.length === 0) {
        console.error('Invalid table data:', value);
        return (
          <div className="my-4 p-4 border border-red-300 bg-red-50 text-red-800 rounded">
            Table data could not be displayed
          </div>
        );
      }

      try {
        return (
          <div className="my-8 overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {value.rows.map((row: TableRow, rowIndex: number) => {
                  if (!row || !row.cells) {
                    console.error('Invalid row data:', row);
                    return null;
                  }
                  return (
                    <tr key={row._key || rowIndex} className={rowIndex === 0 ? 'bg-[#8126FF]/10' : rowIndex % 2 === 0 ? 'bg-[#F9F5FF]/50' : 'bg-white'}>
                      {row.cells.map((cell: string, cellIndex: number) => {
                        const CellTag = rowIndex === 0 ? 'th' : 'td';
                        return (
                          <CellTag 
                            key={cellIndex}
                            className={`border border-[#8126FF]/20 p-2 ${rowIndex === 0 ? 'text-[#1D053F] font-semibold text-left' : 'text-[#1D053F]/80'}`}
                          >
                            {cell}
                          </CellTag>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      } catch (error) {
        console.error('Error rendering table:', error);
        return (
          <div className="my-4 p-4 border border-red-300 bg-red-50 text-red-800 rounded">
            Error rendering table: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        );
      }
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link 
          href={href} 
          rel={rel} 
          className="text-[#8126FF] hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);
  const relatedPosts = post ? await getRelatedBlogPosts(post._id) : [];

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white text-[#9b98df] p-0 lg:p-4">
      <main className="relative pt-0">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#1D053F] to-[#110226] rounded-t-0 lg:rounded-t-3xl rounded-b-3xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-20 -top-48 -left-24" />
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8126FF] blur-[150px] opacity-10 bottom-0 right-0" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#000025] to-transparent" />
          </div>

          {post.image && (
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(100% 100% at 50.6% 0, rgba(0,0,37,0) 0, #000025 75.59%)',
                }}
              />
              <Image
                src={urlFor(post.image).url()}
                alt={post.image.alt || post.title}
                fill
                className="object-cover opacity-40 -z-10"
                priority
              />
            </div>
          )}

          <div className="relative z-10 container mx-auto min-h-[75vh] content-center px-3 sm:px-4 md:px-6">
            <div className="min-h-[75vh] py-8 sm:py-10 md:py-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20">
              <div className="relative text-center max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-6">
                <div className="text-[#F9F5FF]/70 text-sm mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('lv-LV', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-light leading-tight text-[#F9F5FF]">
                  {post.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 relative">
          <div className="prose prose-lg max-w-none legal-content text-[#1D053F]">
            <PortableText value={post.content} components={ptComponents} />
          </div>
          
          <div className="mt-12 pt-6 border-t border-[#8126FF]/20">
            <Link 
              href="/blogs" 
              className="inline-flex items-center text-[#8126FF] hover:underline"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Skatīt visus rakstus
            </Link>
          </div>
        </div>
        
        {/* Related Blog Posts Carousel */}
        {relatedPosts.length > 0 && (
          <div className="bg-gradient-to-b from-[#F9F5FF] to-white py-12 mt-16">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-light text-[#1D053F] mb-2">Citi raksti</h2>
                <p className="text-[#1D053F]/70 max-w-2xl mx-auto">Izpētiet vairāk rakstu par kazino spēlēm un stratēģijām</p>
              </div>
              
              <div className="relative">
                {/* Posts Grid - Simple version without interactive carousel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-4">
                  {relatedPosts.slice(0, 3).map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
              
            
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
