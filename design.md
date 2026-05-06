---
name: Industrial Precision
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414751'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#717782'
  outline-variant: '#c0c7d2'
  surface-tint: '#0061a3'
  primary: '#004f86'
  on-primary: '#ffffff'
  primary-container: '#0068ad'
  on-primary-container: '#d1e4ff'
  inverse-primary: '#9dcaff'
  secondary: '#316191'
  on-secondary: '#ffffff'
  secondary-container: '#9ac7fd'
  on-secondary-container: '#205382'
  tertiary: '#434e55'
  on-tertiary: '#ffffff'
  tertiary-container: '#5b666e'
  on-tertiary-container: '#d9e4ed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#9dcaff'
  on-primary-fixed: '#001d36'
  on-primary-fixed-variant: '#00497c'
  secondary-fixed: '#d1e4ff'
  secondary-fixed-dim: '#9ecaff'
  on-secondary-fixed: '#001d36'
  on-secondary-fixed-variant: '#124978'
  tertiary-fixed: '#d9e4ed'
  tertiary-fixed-dim: '#bdc8d1'
  on-tertiary-fixed: '#121d23'
  on-tertiary-fixed-variant: '#3e484f'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0em
  body-lg:
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-md:
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built upon the principles of industrial precision, speed, and reliability. It targets professional engineers, product designers, and procurement specialists who require technical clarity and efficiency. The aesthetic is **Corporate / Modern**, leaning into a clean, manufacturing-inspired interface that balances utility with a high-end service feel.

The visual narrative avoids unnecessary decoration, focusing instead on structural integrity, clear information hierarchy, and a sense of "machined" perfection. High-contrast elements are used strategically to guide the user through complex workflows, while generous whitespace ensures that technical data remains legible and approachable.

## Colors

The color palette is anchored by a deep **Professional Blue**, signaling trust and established authority. The system utilizes a monochromatic approach to secondary actions, utilizing a darker, more muted navy to maintain a rigorous and formal tone across the interface.

- **Primary (#0068AD):** Used for navigation, headers, and standard interactive elements.
- **Secondary (#184D7C):** A deep navy blue used for secondary actions, supporting buttons, and professional calls-to-action.
- **Tertiary (#EBF6FF):** A light blue tint used for subtle background containers and highlighting active states in lists.
- **Neutral (#F8F9FA):** A cool gray that provides a clean canvas for content, preventing the UI from feeling sterile.
- **Text & Accents:** Pure black (#000000) is used for maximum legibility in technical specifications, while pure white (#FFFFFF) is used for primary cards and surface layers.

## Typography

The design system utilizes **Work Sans** across all levels to maintain a professional and grounded appearance. As a geometric sans-serif, it echoes the precision of CAD drawings and technical blueprints.

Headlines should be bold and impactful, using tighter letter-spacing to create a sense of density and importance. Body text prioritizes readability with a comfortable line height (1.6), ensuring that long-form technical guides or material specifications are easy to digest. Small labels and "meta" information utilize a medium weight and slight tracking to remain legible even at reduced scales.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for desktop environments to maintain a controlled, professional structure. The content is housed within a 1280px maximum container, centered on the screen.

A 12-column grid is used with 24px gutters to allow for complex data layouts, such as side-by-side technical specs and 3D viewer panels. Spacing follows a strict 8px base unit (the "Precision Scale"). Vertical rhythm is maintained through "stack" units, where 16px is the default for related elements and 32px is used to separate distinct content sections.

## Elevation & Depth

To maintain a clean, industrial look, this design system avoids heavy shadows. Depth is primarily communicated through **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Tiers:** Backgrounds use the Neutral Gray (#F8F9FA). Primary content areas use White (#FFFFFF) to appear "raised."
- **Borders:** Instead of shadows, use 1px borders in a soft gray (#DEE2E6) to define card boundaries and input fields.
- **Active State Elevation:** Only the most critical interactive components (like primary cards or floating action buttons) may use a subtle, highly diffused "Ambient Shadow" (0px 4px 20px rgba(0,0,0,0.05)) to indicate interactivity upon hover.

## Shapes

The shape language is **Soft**, utilizing a 0.25rem (4px) base radius. This minimal rounding retains a precise, engineered feel—reminiscent of machined metal edges—while feeling modern and approachable. 

- **Small Components:** Checkboxes and small buttons use the 4px radius.
- **Large Components:** Cards and modals use the `rounded-lg` (8px) radius to provide a slightly softer frame for high-density content.
- **Interactive Elements:** Input fields must remain consistent with the 4px radius to reinforce the structural, grid-based aesthetic.

## Components

### Buttons
- **Primary:** Solid #0068AD background with White text. Bold, rectangular with a 4px radius.
- **CTA (Supporting):** Solid #184D7C with White text. Used for professional submissions and "Next" steps.
- **Secondary:** Outlined in #0068AD with 1px thickness.

### Input Fields
Inputs are defined by 1px light gray borders and a 4px radius. On focus, the border thickens to 2px and changes to the Primary Blue. Use #F8F9FA for the background of disabled inputs to indicate a "locked" state.

### Cards
Cards are white with a 1px soft gray border. They do not use shadows by default. Card headers should use a Tertiary (#EBF6FF) background to clearly delineate the title area from the body content.

### Chips & Status Indicators
Status indicators (e.g., "In Production," "Shipped") use a pill shape with 100px radius, featuring high-contrast text on a very pale version of the status color.

### Data Tables
Tables are central to the industrial workflow. Use a "Zebra Stripe" pattern with #F8F9FA on even rows. Headers must be #000000 with white text and uppercase labels for a rigorous, technical appearance.

### Progress Steppers
For multi-step configuration, use a horizontal stepper with Primary Blue for completed steps and Secondary Deep Blue (#184D7C) for the active step, ensuring a formal and precise user journey.