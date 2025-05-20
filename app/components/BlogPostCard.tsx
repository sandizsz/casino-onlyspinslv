import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface BlogPostCardProps {
  post: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    publishedAt: string;
    excerpt: string;
    image: any;
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link 
      href={`/blogs/${post.slug.current}`} 
      key={post._id}
      className="group"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 w-full">
          {post.image && (
            <Image
              src={urlFor(post.image).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-sm text-[#8126FF]/70 mb-2">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h2 className="text-xl font-semibold text-[#1D053F] mb-2 group-hover:text-[#8126FF] transition-colors">
            {post.title}
          </h2>
          <p className="text-[#1D053F]/70 text-sm flex-1">
            {post.excerpt}
          </p>
          <div className="mt-4 text-[#8126FF] font-medium text-sm flex items-center">
            Read more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
