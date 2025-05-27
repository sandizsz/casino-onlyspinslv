import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { BlogPostCard } from '../../components/BlogPostCard';
import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { Metadata } from 'next';

// Social Media Icons
import { FaTwitter, FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';

// This interface is used in the PortableText table component
interface TableRow {
  _key: string;
  _type: string;
  cells: string[];
}

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: { asset: { url: string } };
  bio?: string;
  richText?: Array<{
    _type: string;
    [key: string]: unknown;
  }>;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  metaTitle?: string;
  metaDescription?: string;
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
    _id,
    name,
    slug,
    image {
      asset->
    },
    bio,
    richText[] {
      ...,
      _type == "table" => {
        ...,
        rows[] {
          ...,
          cells
        }
      }
    },
    twitter,
    facebook,
    linkedin,
    tiktok,
    youtube,
    metaTitle,
    metaDescription
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

// Set to 0 during development to see changes immediately, adjust to higher value in production
export const revalidate = 0;

// Metadata generation function for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const author: Author = await client.fetch(authorQuery, { slug: params.slug });
  
  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    };
  }

  // Use custom meta title/description if available, otherwise use defaults
  const title = author.metaTitle || `${author.name} | Balticslots.com`;
  const description = author.metaDescription || author.bio || `${author.name} raksti Balticslots.com`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: author.image?.asset?.url ? [{
        url: author.image.asset.url,
        width: 1200,
        height: 630,
        alt: author.name
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: author.image?.asset?.url ? [author.image.asset.url] : [],
    },
  };
}

// Define PortableText components for rendering rich content
const ptComponents: PortableTextComponents = {
  block: {
    // Default rendering for blocks
    normal: ({children}) => {
      // Replace newlines with <br /> tags
      return <p className="mb-4 whitespace-pre-wrap">{children}</p>;
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6 relative w-full h-64 md:h-96">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Author image'}
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
                            className={`border border-[#8126FF]/20 px-4 py-2 text-[#1D053F] ${rowIndex === 0 ? 'font-medium text-left' : 'text-left'}`}
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {value.caption && (
              <div className="mt-2 text-sm text-[#1D053F]/70 text-center">
                {value.caption}
              </div>
            )}
          </div>
        );
      } catch (error) {
        console.error('Error rendering table:', error);
        return (
          <div className="my-4 p-4 border border-red-300 bg-red-50 text-red-800 rounded">
            Error rendering table
          </div>
        );
      }
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-[#8126FF] hover:underline">
          {children}
        </a>
      );
    },
  },
};

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
                {author.image?.asset?.url && (
                  <div className="mb-4 sm:mb-6 flex justify-center">
                    <Image
                      src={author.image.asset.url}
                      alt={author.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-2 border-[#8126FF]/70 shadow-lg"
                      priority
                    />
                  </div>
                )}
                <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-light leading-tight text-[#F9F5FF]">
                  {author.name}
                </h1>
                {author.bio && (
                  <p className="text-base sm:text-lg md:text-xl text-[#9b98df] max-w-2xl mx-auto leading-relaxed mb-2 sm:mb-4">
                    {author.bio}
                  </p>
                )}
                
                {/* Social Media Icons */}
                <div className="flex justify-center items-center space-x-4 mt-4">
                  {author.twitter && (
                    <Link href={author.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <FaTwitter className="text-[#F9F5FF]/80 hover:text-[#F9F5FF] transition-colors w-5 h-5" />
                    </Link>
                  )}
                  {author.facebook && (
                    <Link href={author.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FaFacebook className="text-[#F9F5FF]/80 hover:text-[#F9F5FF] transition-colors w-5 h-5" />
                    </Link>
                  )}
                  {author.linkedin && (
                    <Link href={author.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <FaLinkedin className="text-[#F9F5FF]/80 hover:text-[#F9F5FF] transition-colors w-5 h-5" />
                    </Link>
                  )}
                  {author.tiktok && (
                    <Link href={author.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                      <FaTiktok className="text-[#F9F5FF]/80 hover:text-[#F9F5FF] transition-colors w-5 h-5" />
                    </Link>
                  )}
                  {author.youtube && (
                    <Link href={author.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <FaYoutube className="text-[#F9F5FF]/80 hover:text-[#F9F5FF] transition-colors w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rich Text Content Section */}
        {author.richText && author.richText.length > 0 && (
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
            <div className="prose prose-lg legal-content max-w-3xl mx-auto text-[#1D053F] prose-p:mb-4">
              <PortableText value={author.richText} components={ptComponents} />
            </div>
          </div>
        )}
        
        {/* Posts List */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        
          {posts.length === 0 ? (
            <div className="text-center py-8 text-[#1D053F]/70">No posts yet.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
