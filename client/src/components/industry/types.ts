// ─── Shared types for all industry pages ────────────────────────────────────

export interface HeroImage {
  src: string;
  alt: string;
}

export interface IndustryHeroData {
  breadcrumb: string;
  h1: string;
  h2: string;
  body1: string;
  body2: string;
  ctaHref: string;
  gallery: HeroImage[];
}

export interface IndustryProduct {
  category: string;
  name:     string;
  image:    string;
  href:     string;
  isFlagship: boolean;
  desc?:    string; // optional card body copy
}

/** A single cell in the 4-column spec dashboard */
export interface IndustrySpec {
  label:      string;  // e.g. "Edge Tolerance"
  mainValue:  string;  // e.g. "±0.002" or "Tungsten\nCarbide"
  unit?:      string;  // e.g. "mm" — omit for text-only cells
  subtext:    string;  // e.g. "100% CMM Verified"
  isTextual?: boolean; // renders mainValue at text-2xl in two lines
}

export interface IndustryNarrative {
  challengeTitle: string;
  challengeBody:  string;
  solutionTitle:  string;
  solutionBody:   string;
  highlightToken?: string; // bolded token inside solutionBody, e.g. "(+30% Uptime)"
}

export interface OemStep {
  step:             string; // "01" … "04"
  name:             string;
  desc:             string;
  phaseKey:         string;
  protocolVersion:  string;
  technicalTitle:   string;
  coords:           string;
}

export interface IndustryMaterial {
  name:     string;
  abrasion: string;
  grade:    string;
  image:    string;
}

// ─── Shared style tokens ─────────────────────────────────────────────────────
export const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace",
};

export const SPRING_MECHANICAL = {
  type:      "spring" as const,
  stiffness: 500,
  damping:   50,
};
