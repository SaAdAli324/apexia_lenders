// Brand constants for Apexia Lending

export const BRAND = {
  name: "Apexia Lending",
  legalName: "Zawak Private Ltd",
  tagline: "Expert Home Loan. Better Outcomes.",
  email: "info@apexialending.com.au",
  creditRepresentativeNumber: "554111",
  australianCreditLicence: "389328",
  licenceDisclosure: "Credit Representative Number 554111 is authorised under Australian Credit Licence 389328",
  licenceNumber: "CRN 554111 / ACL 389328",
  afcaMember: "AFCA Member No. XXXXXX",
  lenderCount: 50,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Loans", href: "/services" },
  { label: "Calculators", href: "/calculators" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const LOAN_NAV_ITEMS = [
  {
    title: "First Home Buyer Loan",
    slug: "first-home-buyer",
    href: "/services/first-home-buyer",
    desc: "Government schemes, grants & competitive low-deposit options.",
    tag: "Govt Schemes",
  },
  {
    title: "Refinancing & Better Rates",
    slug: "refinancing",
    href: "/services/refinancing",
    desc: "Lower monthly repayments, unlock equity, and secure a better rate.",
    tag: "Rate Reduction",
  },
  {
    title: "Investment Property Loan",
    slug: "investment-property",
    href: "/services/investment-property",
    desc: "Tax-effective loan structuring to grow your wealth & property portfolio.",
    tag: "Portfolio Growth",
  },
  {
    title: "Debt Consolidation",
    slug: "debt-consolidation",
    href: "/services/debt-consolidation",
    desc: "Combine multiple high-interest cards & personal loans into one payment.",
    tag: "Single Repayment",
  },
  {
    title: "Construction Loan",
    slug: "construction",
    href: "/services/construction",
    desc: "Progressive drawdown funding tailored to each stage of building.",
    tag: "Progress Drawdown",
  },
  {
    title: "Fixed vs Variable Rates",
    slug: "rates",
    href: "/services/rates",
    desc: "Compare fixed, variable, and split rate strategies across 50+ lenders.",
    tag: "Rate Strategy",
  },
] as const;

export const CALCULATOR_NAV_ITEMS = [
  {
    title: "Borrowing Power Calculator",
    slug: "borrowing-power",
    href: "/calculators#borrowing-power",
    desc: "Estimate how much you can borrow based on income and expenses.",
    tag: "Capacity",
  },
  {
    title: "Mortgage Repayments Calculator",
    slug: "repayments",
    href: "/calculators#repayments",
    desc: "Calculate weekly, fortnightly, or monthly repayments with rate buffer.",
    tag: "Repayments",
  },
  {
    title: "Stamp Duty & Upfront Fees",
    slug: "stamp-duty",
    href: "/calculators#stamp-duty",
    desc: "Estimate state-based property transfer duty & government costs.",
    tag: "Upfront Costs",
  },
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
