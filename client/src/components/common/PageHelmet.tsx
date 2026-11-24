import { useEffect, useState, type ComponentProps } from "react";
import { Helmet } from "react-helmet-async";

export default function PageHelmet(props: ComponentProps<typeof Helmet>) {
  const [mounted, setMounted] = useState(false);
  // Helmet registers during render. Wait for a committed route so a render
  // abandoned by Suspense cannot leave that page's metadata in the registry.
  useEffect(() => setMounted(true), []);
  return mounted ? <Helmet {...props} defer={false} /> : null;
}
