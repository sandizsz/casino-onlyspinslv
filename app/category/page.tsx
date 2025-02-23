import { client } from "@/sanity/lib/client";
import Link from "next/link";
import AnimatedSection from "../components/AnimatedSection";

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

async function getCategories() {
  const query = `*[_type == "category"] {
    _id,
    title,
    slug
  }`;

  const data = await client.fetch(query);
  return data as Category[];
}

export const revalidate = 60;

export default async function CategoryPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <AnimatedSection className="w-full py-20 bg-gradient-to-b from-[#1E2A44] to-[#0D1117] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold text-center text-[#C1FF72] [text-shadow:_0_0_30px_#C1FF72] mb-12">
            Casino Categories
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C1FF72] to-[#C1FF72] opacity-50 blur-lg group-hover:opacity-70 transition-opacity duration-300 rounded-lg"></div>
                <div className="relative p-6 bg-[#1E2A44]/90 rounded-lg border border-[#C1FF72] shadow-[0_0_20px_rgba(193,255,114,0.3)] group-hover:shadow-[0_0_30px_rgba(193,255,114,0.5)] transition-all duration-300">
                  <h2 className="text-2xl font-['Rajdhani'] font-bold text-[#C1FF72] group-hover:[text-shadow:_0_0_30px_#C1FF72] transition-all duration-300">
                    {category.title}
                  </h2>
                  <div className="mt-4 text-[#C0C0C0] group-hover:text-white transition-colors duration-300">
                    Click to explore casinos in this category
                  </div>
                </div>
              </Link>
            ))}

            {categories?.length === 0 && (
              <div className="col-span-full text-center p-12 bg-[#1E2A44]/50 rounded-lg border border-[#C1FF72] shadow-[0_0_20px_rgba(193,255,114,0.3)]">
                <p className="text-xl font-['Rajdhani'] text-[#C0C0C0]">
                  No categories available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}