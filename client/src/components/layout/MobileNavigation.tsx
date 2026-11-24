import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, FileText, Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import Link from "@/components/common/SiteLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getCategories, getMixerCategories } from "@/data/locales";
import { useTranslation } from "@/lib/useTranslation";

const categoryOrder = [
  "slitter-knives",
  "shredder-blades",
  "log-saw-blades",
  "wood-chipper-blades",
  "shear-blades",
  "paper-cutting-knives",
  "other-custom-blades",
];

const rowStyle =
  "flex min-h-14 w-full items-center justify-between gap-3 py-3 text-start text-[18px] font-medium leading-snug tracking-normal text-navy hover:text-action-hover aria-[current=page]:text-action-hover";
const iconButton =
  "flex size-11 shrink-0 items-center justify-center text-navy hover:bg-slate-50";
const headerStyle =
  "flex h-[74px] shrink-0 items-center gap-1.5 px-4 sm:gap-3 sm:px-6 lg:px-10";

function BrandAndQuote({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  return (
    <>
      <Link
        href="/"
        onClick={onNavigate}
        className="me-auto flex min-h-11 shrink-0 items-center gap-2"
        aria-label={`Sureay Machinery · ${t("nav.home")}`}
      >
        <img src="/sureay-logo.svg" alt="" width={38} height={38} />
        <span dir="ltr" className="flex flex-col items-start text-navy">
          <span className="text-[19px] font-bold leading-none tracking-[0.025em]">
            SUREAY
          </span>
          <span className="mt-1 text-[9px] font-semibold leading-none tracking-[0.16em]">
            MACHINERY
          </span>
        </span>
      </Link>
      <Link
        href="/contact"
        onClick={onNavigate}
        className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 border border-slate-300 px-2.5 py-1 text-center text-[14px] font-medium leading-tight text-[#003366] hover:border-navy sm:px-3"
      >
        <FileText
          aria-hidden="true"
          className="hidden size-4 shrink-0 min-[375px]:block"
          strokeWidth={1.6}
        />
        {t("cta.getQuote")}
      </Link>
    </>
  );
}

function MenuLinks({ onNavigate }: { onNavigate: () => void }) {
  const { t, lang } = useTranslation();
  const [path] = useLocation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const groups = [
    {
      id: "blades",
      label: t("nav.industrialBlades"),
      links: [
        { href: "/products", label: t("cta.viewAllProducts") },
        ...[...getCategories(lang)]
          .sort(
            (a, b) =>
              categoryOrder.indexOf(a.slug) - categoryOrder.indexOf(b.slug)
          )
          .map(c => ({
            href: `/categories/${c.slug}`,
            label: c.shortName,
          })),
      ],
    },
    {
      id: "mixer",
      label: t("nav.mixerWearParts"),
      links: [
        { href: "/mixer-wear-parts", label: t("navbar.viewAllMixerParts") },
        ...getMixerCategories(lang).map(c => ({ href: c.link, label: c.name })),
      ],
    },
  ];
  const mainLink = (href: string, label: string) => (
    <li key={href} className="border-b border-slate-200">
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={path === href ? "page" : undefined}
        className={rowStyle}
      >
        {label}
      </Link>
    </li>
  );
  return (
    <nav>
      <ul>
        {mainLink("/", t("nav.home"))}
        {groups.map(group => {
          const open = expanded === group.id;
          const id = `mobile-nav-${group.id}`;
          return (
            <li key={group.id} className="border-b border-slate-200">
              <button
                type="button"
                className={rowStyle}
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setExpanded(open ? null : group.id)}
              >
                {group.label}
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className={`size-[18px] shrink-0 motion-safe:transition-transform ${open ? "rotate-90" : "rtl:rotate-180"}`}
                />
              </button>
              <ul
                hidden={!open}
                id={id}
                className="mb-3 border-s-2 border-slate-200 ps-4"
              >
                {group.links.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={path === item.href ? "page" : undefined}
                      className="flex min-h-11 items-center py-2 pe-1 text-[16px] font-normal leading-snug text-slate-700 hover:text-action-hover"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
        {mainLink("/news", t("nav.news"))}
        {mainLink("/about", t("nav.about"))}
        {mainLink("/contact", t("nav.contact"))}
      </ul>
    </nav>
  );
}

export default function MobileNavigation() {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [path] = useLocation();
  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className={`${headerStyle} xl:hidden`}>
        <BrandAndQuote />
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label={t("navbar.openMenu")}
            className={iconButton}
          >
            <Menu aria-hidden="true" size={23} strokeWidth={1.6} />
          </button>
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10000] bg-white" />
        <Dialog.Content
          dir={lang === "ar" ? "rtl" : "ltr"}
          aria-describedby={undefined}
          className="font-nav fixed inset-0 z-[10001] flex h-dvh flex-col bg-white text-navy"
          onEscapeKeyDown={event => {
            // Let the focused language picker close before the containing menu.
            const target = event.target;
            if (
              target instanceof Element &&
              target
                .closest("[data-current-lang]")
                ?.querySelector('button[aria-expanded="true"]')
            ) {
              event.preventDefault();
            }
          }}
          onOpenAutoFocus={event => {
            event.preventDefault();
            closeButton.current?.focus();
          }}
        >
          <Dialog.Title className="sr-only">
            {t("navbar.openMenu")}
          </Dialog.Title>
          <div
            className={`${headerStyle} box-content border-b border-slate-200`}
          >
            <BrandAndQuote onNavigate={close} />
            <Dialog.Close asChild>
              <button
                ref={closeButton}
                type="button"
                aria-label={t("navbar.closeMenu")}
                className={iconButton}
              >
                <X aria-hidden="true" size={24} strokeWidth={1.6} />
              </button>
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-2 pb-[max(24px,env(safe-area-inset-bottom))] sm:px-6 lg:px-10">
            <MenuLinks onNavigate={close} />
            <div className="mt-4">
              <LanguageSwitcher variant="mobile" onSelect={close} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
