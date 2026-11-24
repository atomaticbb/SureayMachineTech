/**
 * Breadcrumbs — Engineering Blueprint Index Bar
 * Full-width bg-slate-50 border-b strip, font-sans
 */

import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "bar" | "embedded";
}

export default function Breadcrumbs({
  items,
  variant = "bar",
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={
        variant === "bar"
          ? "site-section w-full bg-slate-50 border-b border-slate-200"
          : "w-full"
      }
    >
      <div
        className={`flex flex-wrap items-center gap-y-2 font-sans text-[14px] ${variant === "bar" ? "site-content max-w-7xl mx-auto px-6 sm:px-8 py-2" : "pb-2"}`}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex min-w-0 max-w-full items-start">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="mx-2 shrink-0 text-slate-500"
                >
                  ›
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`break-words min-w-0 ${
                    isLast
                      ? "font-medium text-[#001f4d]"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} asChild>
                  <a className="break-words min-w-0 text-muted-foreground hover:text-[#001f4d] transition-colors duration-200">
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
