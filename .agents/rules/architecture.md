# Apexia Lending — Architecture Rule

## Golden Rule
**Never stuff an entire page into a single file.** Every page must be composed of small, focused, reusable components. If a component exceeds ~120 lines, break it down further.

## Directory Structure

```
src/
├── app/                          # Next.js App Router — pages & layouts only
│   ├── layout.tsx                # Root layout (wraps Navbar + Footer)
│   ├── page.tsx                  # Homepage (composes section components)
│   ├── globals.css               # Global styles & CSS custom properties
│   ├── services/
│   │   ├── page.tsx              # Services overview page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual service detail page
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── calculators/
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── terms-of-use/
│   │   └── page.tsx
│   └── credit-guide/
│       └── page.tsx
│
├── components/                   # All reusable UI — NEVER put components in app/
│   ├── layout/                   # Structural / layout-level components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx         # Max-width centered wrapper
│   │   └── Section.tsx           # Reusable full-width section with padding
│   │
│   ├── ui/                       # Generic, design-system-level primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   └── SectionHeading.tsx    # Consistent heading + subtitle pattern
│   │
│   ├── sections/                 # Page-level sections (used inside page.tsx files)
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx          # Lender logos marquee
│   │   ├── ServicesGrid.tsx
│   │   ├── HowItWorks.tsx        # Step-by-step process
│   │   ├── CalculatorsPreview.tsx # CTA block linking to /calculators
│   │   ├── Testimonials.tsx
│   │   ├── ContactFormSection.tsx # Section wrapper around the contact form
│   │   ├── AwardBanner.tsx       # Placeholder certification banner
│   │   └── LenderPanel.tsx       # Full lender grid (for services/about)
│   │
│   ├── forms/                    # Form-specific components
│   │   └── ContactForm.tsx       # The actual form logic & fields
│   │
│   ├── calculators/              # Calculator widgets
│   │   ├── BorrowingPowerCalc.tsx
│   │   ├── RepaymentCalc.tsx
│   │   ├── StampDutyCalc.tsx
│   │   └── CalcResultCard.tsx    # Shared result display component
│   │
│   └── icons/                    # Custom SVG icon components
│       └── index.tsx             # Barrel export of all icons
│
├── lib/                          # Utilities, constants, helpers
│   ├── constants.ts              # Brand colors, lender list, service data, etc.
│   ├── calculator-utils.ts       # Pure functions for calculator math
│   └── types.ts                  # Shared TypeScript interfaces & types
│
└── data/                         # Static content / copy
    ├── services.ts               # Service definitions (title, slug, description, icon)
    ├── lenders.ts                # Lender names & logo paths
    └── testimonials.ts           # Testimonial content (placeholder → real later)
```

## Rules

### 1. Page files are composers, not builders
A `page.tsx` file should import and arrange section components. It should contain **almost no JSX of its own** — just a stack of `<Section>` components.

```tsx
// ✅ GOOD — page.tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <CalculatorsPreview />
      <Testimonials />
      <ContactFormSection />
      <AwardBanner />
    </>
  );
}
```

```tsx
// ❌ BAD — page.tsx with 500 lines of inline JSX
export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <h1>...</h1>
        <p>...</p>
        {/* 400 more lines */}
      </section>
    </div>
  );
}
```

### 2. Component file size limit
- **Target:** ≤ 120 lines per component file
- **Hard max:** 200 lines — if you hit this, refactor immediately

### 3. Separation of concerns
| Layer | Responsibility | Location |
|---|---|---|
| Pages | Composition & metadata (SEO) | `src/app/**/page.tsx` |
| Sections | Page-level blocks (hero, services grid, etc.) | `src/components/sections/` |
| UI | Reusable primitives (buttons, cards, inputs) | `src/components/ui/` |
| Layout | Structural wrappers (navbar, footer, container) | `src/components/layout/` |
| Forms | Form logic & validation | `src/components/forms/` |
| Calculators | Calculator widgets & display | `src/components/calculators/` |
| Data | Static content arrays/objects | `src/data/` |
| Lib | Utilities, types, constants | `src/lib/` |

### 4. Import conventions
- Use the `@/` path alias (maps to `src/`)
- Barrel exports (`index.ts`) only for `icons/` — everywhere else, import directly from the file

### 5. Client vs Server components
- Default to **Server Components** (no `"use client"` directive)
- Add `"use client"` only when the component needs: `useState`, `useEffect`, event handlers, browser APIs
- Components that MUST be client: `ContactForm`, all calculators, `Navbar` (mobile menu toggle), `Testimonials` (carousel)

### 6. Styling approach
- Use **Tailwind CSS** for all styling
- Extract repeated patterns into UI components (e.g., `Button`, `Card`) rather than duplicating class strings
- Define brand design tokens in `globals.css` as CSS custom properties and reference them via Tailwind's config

### 7. Data lives outside components
- Service definitions, lender lists, testimonials, and any static content go in `src/data/`
- Calculator math goes in `src/lib/calculator-utils.ts`
- Components import data — they don't define it inline
