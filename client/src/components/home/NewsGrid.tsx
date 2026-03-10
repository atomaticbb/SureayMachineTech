import { Link } from "wouter";
import { ARTICLES } from "@/data/homeData";

export default function NewsGrid() {
  return (
    <section className="bg-white border-t border-slate-200 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-12">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
            Knowledge Hub
          </p>
          <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05]">
            News &amp; Articles
          </h2>
          <div className="w-14 h-[3px] bg-slate-300 mt-6" />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {ARTICLES.map((article) => (
            <Link href={article.href} key={article.title}>
              <div className="group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden rounded-xl mb-5 bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-black text-xl text-slate-700 tracking-tight leading-[1.05] mb-3 group-hover:text-[#003366] transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {article.excerpt}
                </p>
                <span className="text-sm font-bold text-[#003366] group-hover:text-[#004488] transition-colors duration-200">
                  Read more »
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
