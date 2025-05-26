import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: { asset: { url: string } };
  bio?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  image?: { asset: { url: string } };
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
    _id, title, slug, publishedAt, excerpt, image
  }
`;

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author: Author = await client.fetch(authorQuery, { slug: params.slug });
  if (!author) return <div className="legal-content max-w-2xl mx-auto py-16">Author not found.</div>;

  // Fetch posts by author
  const posts: BlogPost[] = await client.fetch(postsByAuthorQuery, { authorId: author._id });

  return (
    <div className="legal-content max-w-2xl mx-auto py-16">
      <div className="flex items-center gap-4 mb-8">
        {author.image?.asset?.url && (
          <Image
            src={author.image.asset.url}
            alt={author.name}
            width={64}
            height={64}
            className="rounded-full border-2 border-[#8126FF]"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-[#1D053F]">{author.name}</h1>
          {author.bio && <p className="text-[#1D053F]/70 mt-1">{author.bio}</p>}
        </div>
      </div>
      <h2 className="text-xl font-semibold text-[#8126FF] mb-4">Posts by {author.name}</h2>
      <ul className="space-y-6">
        {posts.length === 0 && <li>No posts yet.</li>}
        {posts.map(post => (
          <li key={post._id} className="border-b border-[#8126FF]/20 pb-4">
            <Link href={`/blogs/${post.slug.current}`} className="text-2xl font-semibold text-[#1D053F] hover:text-[#8126FF] transition">
              {post.title}
            </Link>
            <div className="text-sm text-[#1D053F]/60 mb-1">{new Date(post.publishedAt).toLocaleDateString()}</div>
            <div className="text-[#1D053F]/80 mb-2">{post.excerpt}</div>
            {post.image?.asset?.url && (
              <Image
                src={post.image.asset.url}
                alt={post.title}
                width={320}
                height={180}
                className="rounded-lg mt-2 border border-[#8126FF]/30"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
