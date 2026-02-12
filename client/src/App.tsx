import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import MachineListPage from "./pages/MachineListPage";
import MachineDetail from "./pages/MachineDetail";
import MoldListPage from "./pages/MoldListPage";
import BladeListPage from "./pages/BladeListPage";
import Custom from "./pages/Custom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Applications from "./pages/Applications";
import Blogs from "./pages/Blogs";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/products"} component={Products} />
        {/* Category routes - must come before slug route */}
        <Route path={"/products/machinery"} component={MachineListPage} />
        <Route path={"/products/machinery/:id"} component={MachineDetail} />
        <Route path={"/products/molds"} component={MoldListPage} />
        <Route path={"/products/blades"} component={BladeListPage} />
        {/* Product detail route - must come after category routes */}
        <Route path={"/products/:slug"} component={ProductDetail} />
        <Route path={"/custom"} component={Custom} />
        <Route path={"/about"} component={About} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/applications"} component={Applications} />
        <Route path={"/blogs"} component={Blogs} />
        <Route path={"/admin"} component={Admin} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
