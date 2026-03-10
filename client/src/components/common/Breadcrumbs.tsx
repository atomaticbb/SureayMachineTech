/**
 * Breadcrumbs — Engineering Blueprint Index Bar
 * Full-width bg-slate-50 border-b strip, font-mono uppercase
 * variant prop accepted for API compatibility but unused (single style)
 */

import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
  className?: string;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center">
              {i > 0 && (
                <span className="text-slate-300 mx-3 font-mono text-[13px]">›</span>
              )}
              {isLast || !item.href ? (
                <span
                  className={`font-mono text-[13px] tracking-[0.15em] uppercase ${
                    isLast
                      ? "font-black text-[#001f4d]"
                      : "text-slate-400"
                  }`}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href}>
                  <a className="font-mono text-[13px] tracking-[0.15em] uppercase text-slate-400 hover:text-[#001f4d] transition-colors duration-200">
                    {item.label}
                  </a>
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
