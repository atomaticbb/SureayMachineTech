import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation, Redirect } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BladeListPage from "./pages/BladeListPage";
import BladeDetail from "./pages/BladeDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News       from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Admin from "./pages/Admin";
import { usePageTracking } from "./hooks/usePageTracking";
import CookieConsent from "./components/CookieConsent";
import PlasticIndustry from "./pages/plastic-industry";
import MetalIndustry   from "./pages/metal-industry";
import PaperIndustry   from "./pages/paper-industry";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  usePageTracking();
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />

        {/* Products — blade-only architecture */}
        <Route path="/products">
          <Redirect to="/products/blades" />
        </Route>
        <Route path="/products/blades" component={BladeListPage} />
        <Route path="/products/blades/:id" component={BladeDetail} />

        {/* Industry verticals */}
        <Route path="/industry/plastics-recycling" component={PlasticIndustry} />
        <Route path="/industry/metal-processing"   component={MetalIndustry}   />
        <Route path="/industry/paper-tissue"       component={PaperIndustry}   />

        {/* Static pages */}
        <Route path="/about"   component={About}   />
        <Route path="/contact" component={Contact} />
        <Route path="/news"      component={News}       />
        <Route path="/news/:id"  component={NewsDetail} />
        <Route path="/admin"   component={Admin}   />

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

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
