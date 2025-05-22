import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Calendar } from 'lucide-react';

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

interface BlogPostCardProps {
  post: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    publishedAt: string;
    excerpt: string;
    image: SanityImage;
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link 
      href={`/blogs/${post.slug.current}`} 
      key={post._id}
      className="group block h-full"
    >
      <div className="relative h-full bg-gradient-to-br from-[#1D053F] to-[#000025] rounded-2xl overflow-hidden shadow-lg">
        {/* Image with overlay gradient */}
        <div className="relative h-32 sm:h-44 w-full overflow-hidden">
          {post.image ? (
            <>
              <Image
                src={urlFor(post.image).url()}
                alt={post.image.alt || post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D053F] to-transparent opacity-60"></div>
            </>
          ) : (
            <div className="w-full h-full bg-[#8126FF]/20 flex items-center justify-center">
              <span className="text-[#F9F5FF]/50 text-lg">No image</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col">
          {/* Date moved inside the content box */}
          <p className="text-xs text-[#F9F5FF]/90 bg-[#F9F5FF]/10 px-3 py-1.5 rounded-full w-fit mb-3 flex items-center justify-center">
            <Calendar className="w-3 h-3 mr-1.5 text-[#8126FF]" />
            {new Date(post.publishedAt).toLocaleDateString('lv-LV', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
          
          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-[#F9F5FF] mb-1 sm:mb-2 break-words">
            {post.title}
          </h2>
          <p className="text-[#F9F5FF]/70 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-4">
            {post.excerpt}
          </p>
          
          {/* Read more link - more subtle version */}
          <div className="mt-auto flex items-center">
            <span className="text-[#F9F5FF]/90 hover:text-[#F9F5FF] text-sm font-medium flex items-center transition-colors duration-300  pb-0.5">
              Lasīt vairāk
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
