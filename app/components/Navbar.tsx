import { client } from "@/sanity/lib/client";
import { Category } from "../utils/interface";
import { NavbarClient } from "./NavbarClient";

async function getCategories() {
  const query = `*[_type == "category"] | order(_updatedAt desc) {
    title,
    slug,
    _id
  }`;
  
  // Add revalidation
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

const Navbar = async () => {
  const categories: Category[] = await getCategories();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#C1FF72] to-[#1E2A44] shadow-lg">
      <NavbarClient categories={categories} />
    </header>
  );
};

export default Navbar;