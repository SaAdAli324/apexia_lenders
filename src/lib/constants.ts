// Brand constants for Apexia Lending

export const BRAND = {
  name: "Apexia Lending",
  legalName: "Zawak Private Ltd",
  tagline: "Expert Home Loan. Better Outcomes.",
  email: "info@apexialending.com.au",
  licenceNumber: "ACR XXXXXX", // Placeholder — replace with real ACL/ACR number
  afcaMember: "AFCA Member No. XXXXXX", // Placeholder
  lenderCount: 50,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Loan", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  loans: [
    { label: "First Home Buyer Loan", href: "/services/first-home-buyer" },
    { label: "Refinancing", href: "/services/refinancing" },
    { label: "Debt Consolidation", href: "/services/debt-consolidation" },
    { label: "Investment Property Loan", href: "/services/investment-property" },
    { label: "Fixed & Variable Rates", href: "/services/rates" },
    { label: "Construction Loan", href: "/services/construction" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Credit Guide", href: "/credit-guide" },
  ],
  resources: [
    { label: "Home Loan Guide", href: "/guide" },
    { label: "Calculators", href: "/calculators" },
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
  "Refinancing",
  "Investment Property",
  "Construction Loan",
  "Debt Consolidation",
  "First Home Buyer",
] as const;
