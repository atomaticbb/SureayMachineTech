/**
 * Breadcrumbs — reusable nav breadcrumb strip
 * variant='dark'  → light text on dark/image hero background
 * variant='light' → dark text on white/light page background
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

export default function Breadcrumbs({
  items,
  variant = "dark",
  className = "",
}: BreadcrumbsProps) {
  const textBase =
    variant === "dark"
      ? "text-slate-300/80 hover:text-white"
      : "text-slate-500 hover:text-[#003366]";

  const separatorColor =
    variant === "dark" ? "text-slate-500" : "text-slate-400";

  const activeColor =
    variant === "dark" ? "text-[#FF6600]" : "text-slate-700 dark:text-slate-300";

  return (
    <nav
      className={`flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-wider ${className}`}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className={separatorColor}>/</span>}
            {isLast || !item.href ? (
              <span className={isLast ? activeColor : textBase}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href}>
                <a className={`transition-colors hover:underline ${textBase}`}>
                  {item.label}
                </a>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
