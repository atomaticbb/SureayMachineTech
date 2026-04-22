import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { Route, Switch, useLocation, Redirect } from "wouter";
import { lazy, Suspense, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { usePageTracking } from "./hooks/usePageTracking";
import CookieConsent from "./components/CookieConsent";

// ── Lazy page chunks ───────────────────────────────────────────────────────────
const Home = lazy(() => import("./pages/Home"));
const ProductListPage = lazy(() => import("./pages/ProductListPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlasticIndustry = lazy(() => import("./pages/plastic-industry"));
const MetalIndustry = lazy(() => import("./pages/metal-industry"));
const PaperIndustry = lazy(() => import("./pages/paper-industry"));
const NewEnergyIndustry = lazy(() => import("./pages/new-energy-industry"));
const ConvertingIndustry = lazy(() => import("./pages/converting-industry"));
const CustomBlades = lazy(() => import("./pages/custom-blades"));

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
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Sureay Machinery
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
  usePageTracking();
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />

          {/* Products — blade-only architecture */}
          <Route path="/products" component={ProductListPage} />
          <Route path="/products/:id" component={ProductDetail} />

          {/* Industry verticals */}
          <Route path="/plastic-industry" component={PlasticIndustry} />
          <Route path="/metal-industry" component={MetalIndustry} />
          <Route path="/paper-industry" component={PaperIndustry} />
          <Route path="/new-energy-industry" component={NewEnergyIndustry} />
          <Route path="/converting-industry" component={ConvertingIndustry} />
          <Route path="/custom-blades" component={CustomBlades} />

          {/* Static pages */}
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
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
      </Suspense>
    </>
  );
}

// ── App root ───────────────────────────────────────────────────────────────────
function App() {
  return (
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
  );
}

export default App;
