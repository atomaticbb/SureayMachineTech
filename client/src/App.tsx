import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import {
  Route,
  Switch,
  useLocation,
  Redirect,
  Router as WouterRouter,
} from "wouter";
import { lazy, Suspense, use, useEffect, useState, type ReactNode } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { usePageTracking } from "./hooks/usePageTracking";
import CookieConsent from "./components/CookieConsent";
import { LangProvider, useLang } from "./contexts/LangContext";
import { parseLangFromPath, DEFAULT_LANG } from "./lib/i18n";
import { preloadLocale } from "@/data/locales";

const importProductListPage = () => import("./pages/ProductListPage");
const importProductDetail = () => import("./pages/ProductDetail");

const initialPath =
  typeof window !== "undefined" ? window.location.pathname : "";
const isProductsEntryPath =
  /^\/(?:(?:en|es|fr|ru|vi|ar)\/)?products(?:\/|$)/.test(initialPath) ||
  /^\/products(?:\/|$)/.test(initialPath);

if (isProductsEntryPath) {
  void importProductListPage();
  if (/^\/(?:(?:en|es|fr|ru|vi|ar)\/)?products\/.+/.test(initialPath) || /^\/products\/.+/.test(initialPath)) {
    void importProductDetail();
  }
}

function lazyWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  key: string
) {
  return lazy(async () => {
    try {
      const mod = await importer();
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(`lazy-retry:${key}`);
      }
      return mod;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isChunkLoadError =
        message.includes("Failed to fetch dynamically imported module") ||
        message.includes("Importing a module script failed");

      if (typeof window !== "undefined" && isChunkLoadError) {
        const retryFlag = `lazy-retry:${key}`;
        const hasRetried = window.sessionStorage.getItem(retryFlag) === "1";

        if (!hasRetried) {
          window.sessionStorage.setItem(retryFlag, "1");
          window.location.reload();
        }
      }

      throw error;
    }
  });
}

// ── Lazy page chunks ───────────────────────────────────────────────────────────
const Home = lazyWithRetry(() => import("./pages/Home"), "home");
const ProductListPage = lazyWithRetry(
  () => importProductListPage(),
  "products"
);
const ProductDetail = lazyWithRetry(
  () => importProductDetail(),
  "product-detail"
);
const CategoryAggregation = lazyWithRetry(
  () => import("./pages/CategoryAggregation"),
  "category-aggregation"
);
const About = lazyWithRetry(() => import("./pages/About"), "about");
const Contact = lazyWithRetry(() => import("./pages/Contact"), "contact");
const News = lazyWithRetry(() => import("./pages/News"), "news");
const NewsDetail = lazyWithRetry(
  () => import("./pages/NewsDetail"),
  "news-detail"
);
const Admin = lazyWithRetry(() => import("./pages/Admin"), "admin");
const AdminLogin = lazyWithRetry(
  () => import("./pages/AdminLogin"),
  "admin-login"
);
const NotFound = lazyWithRetry(() => import("./pages/NotFound"), "not-found");
const PlasticIndustry = lazyWithRetry(
  () => import("./pages/plastic-industry"),
  "plastic-industry"
);
const MetalIndustry = lazyWithRetry(
  () => import("./pages/metal-industry"),
  "metal-industry"
);
const PaperIndustry = lazyWithRetry(
  () => import("./pages/paper-industry"),
  "paper-industry"
);
const NewEnergyIndustry = lazyWithRetry(
  () => import("./pages/new-energy-industry"),
  "new-energy-industry"
);
const ConvertingIndustry = lazyWithRetry(
  () => import("./pages/converting-industry"),
  "converting-industry"
);
const WoodIndustry = lazyWithRetry(
  () => import("./pages/wood-industry"),
  "wood-industry"
);
const CustomBlades = lazyWithRetry(
  () => import("./pages/custom-blades"),
  "custom-blades"
);
const PrivacyPolicy = lazyWithRetry(
  () => import("./pages/PrivacyPolicy"),
  "privacy-policy"
);

// ── Suspense fallback ──────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#001f4d",
        gap: "20px",
        zIndex: 9999,
      }}
    >
      {/* Animated bar stack */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "5px",
          height: "40px",
        }}
      >
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            style={{
              width: "6px",
              backgroundColor: "#e8b84b",
              animation: "sureay-bar 1s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
              borderRadius: 0,
            }}
          />
        ))}
      </div>

      <p
        style={{
          color: "#e8b84b",
          fontFamily: "sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.25em",
          margin: 0,
        }}
      >
        Sureay Blades
      </p>

      <style>{`
        @keyframes sureay-bar {
          0%, 100% { height: 8px;  opacity: 0.4; }
          50%       { height: 36px; opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

// ── Auth guard ─────────────────────────────────────────────────────────────────
// Checks /api/auth/me before rendering a protected page.
// Shows PageLoader while the check is in-flight; redirects to login on failure.
function ProtectedRoute({
  component: Component,
}: {
  component: React.ComponentType;
}) {
  const [status, setStatus] = useState<"loading" | "ok" | "fail">("loading");

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.json())
      .then((d: { authenticated: boolean }) =>
        setStatus(d.authenticated ? "ok" : "fail")
      )
      .catch(() => setStatus("fail"));
  }, []);

  if (status === "loading") return <PageLoader />;
  if (status === "fail") return <Redirect to="/admin/login" />;
  return <Component />;
}

// ── Locale preloader ───────────────────────────────────────────────────────────
// Suspends the route tree until the current language's data chunk is loaded.
// For English (default lang) this is a no-op — English data is always available.
// For other languages it fetches the per-lang chunk (~500 KB) before rendering.
function LocalePreloader({ children }: { children: ReactNode }) {
  const lang = useLang();
  if (lang !== DEFAULT_LANG) {
    use(preloadLocale(lang));
  }
  return <>{children}</>;
}

// ── Scroll restoration ─────────────────────────────────────────────────────────
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

// ── Router ─────────────────────────────────────────────────────────────────────
function Router() {
  const [location] = useLocation();

  useEffect(() => {
    if (location === "/" || location === "/about" || location === "/contact") {
      const warmup = () => {
        void importProductListPage();
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        const id = (window as Window & {
          requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number;
          cancelIdleCallback: (handle: number) => void;
        }).requestIdleCallback(warmup, { timeout: 1500 });
        return () => {
          (window as Window & { cancelIdleCallback: (handle: number) => void }).cancelIdleCallback(id);
        };
      }

      const timer = globalThis.setTimeout(warmup, 1200);
      return () => globalThis.clearTimeout(timer);
    }
    return;
  }, [location]);

  usePageTracking();
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <LocalePreloader>
          <Switch>
          <Route path="/" component={Home} />

          {/* Products — blade-only architecture */}
          <Route path="/products" component={ProductListPage} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/categories/:slug" component={CategoryAggregation} />

          {/* Industry verticals */}
          <Route path="/plastic-industry" component={PlasticIndustry} />
          <Route path="/metal-industry" component={MetalIndustry} />
          <Route path="/paper-industry" component={PaperIndustry} />
          <Route path="/new-energy-industry" component={NewEnergyIndustry} />
          <Route path="/converting-industry" component={ConvertingIndustry} />
          <Route path="/wood-industry" component={WoodIndustry} />
          <Route path="/custom" component={CustomBlades} />

          {/* Static pages */}
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/news" component={News} />
          <Route path="/news/:id" component={NewsDetail} />

          {/* Admin — login page is public; dashboard is protected */}
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin">
            {() => <ProtectedRoute component={Admin} />}
          </Route>

          {/* 404 */}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
          </Switch>
        </LocalePreloader>
      </Suspense>
    </>
  );
}

// ── App root ───────────────────────────────────────────────────────────────────
// Language detection runs once per page load (Puppeteer prerender treats each
// route as a fresh page visit, so SSR-time and client-time detection both use
// window.location.pathname). Admin routes intentionally stay un-prefixed; if
// someone reaches /es/admin the wouter base strips /es and routes to /admin,
// rendering the (English) admin UI.
function App() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const { lang, base } = parseLangFromPath(pathname);

  return (
    <LangProvider lang={lang}>
      <WouterRouter base={base}>
        <HelmetProvider>
          <ErrorBoundary>
            <ThemeProvider defaultTheme="light">
              <TooltipProvider>
                <Toaster />
                <Router />
                <CookieConsent />
              </TooltipProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </HelmetProvider>
      </WouterRouter>
    </LangProvider>
  );
}

export default App;
