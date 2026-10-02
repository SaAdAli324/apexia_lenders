// Brand constants for Apexia Lending

export const BRAND = {
  name: "Apexia Lending",
  legalName: "Zawak Private Ltd",
  tagline: "Expert Home Loans. Better Outcomes.",
  email: "info@apexialending.com.au",
  licenceNumber: "ACR XXXXXX", // Placeholder — replace with real ACL/ACR number
  afcaMember: "AFCA Member No. XXXXXX", // Placeholder
  lenderCount: 50,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Loans", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  loans: [
    { label: "First Home Buyer Loans", href: "/services/first-home-buyer" },
    { label: "Refinancing", href: "/services/refinancing" },
    { label: "Debt Consolidation", href: "/services/debt-consolidation" },
    { label: "Investment Property Loans", href: "/services/investment-property" },
    { label: "Fixed & Variable Rates", href: "/services/rates" },
    { label: "Offset & Redraw", href: "/services/offset" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact" },
  ],
  resources: [
    { label: "Home Loan Guide", href: "/guide" },
    { label: "Calculators", href: "/calculators" },
    { label: "Blog", href: "/blog" },
    { label: "News & Insights", href: "/news" },
  ],
} as const;

export const AUSTRALIAN_STATES = [
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT",
] as const;

export const LOAN_TYPES = [
  "Home Loan",
  "Refinancing",
  "Investment Property",
  "Construction Loan",
  "Debt Consolidation",
  "Personal Loan",
  "First Home Buyer",
  "Conveyancing",
] as const;
