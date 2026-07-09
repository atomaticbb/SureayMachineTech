/*
 * CategoryLinksRow — links from an industry page to the relevant
 * category hub pages (/categories/:slug), additive alongside the
 * direct-to-product links in IndustryToolingMatrix.
 */

import { Link } from "wouter";

interface CategoryLink {
  slug: string;
  name: string;
}

interface Props {
  categories: CategoryLink[];
}

export default function CategoryLinksRow({ categories }: Props) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-white border-b border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <p className="font-bold text-[11px] text-slate-400 tracking-[0.45em] mb-4">
          Browse by Category
        </p>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="border-2 border-slate-200 px-6 py-2.5 text-[11px] font-black tracking-[0.2em] text-slate-500 rounded-none transition-colors duration-200 hover:border-[#001f4d] hover:text-[#001f4d]"
            >
              {cat.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
