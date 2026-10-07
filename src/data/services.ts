export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: string; // emoji or icon identifier
}

export const services: Service[] = [
  {
    title: "First Home Buyer Loans",
    slug: "first-home-buyer",
    description:
      "Navigate your first home purchase with expert guidance and access to exclusive first home buyer grants, government schemes, and the lowest rates available.",
    icon: "🏠",
  },
  {
    title: "Refinancing & Better Rates",
    slug: "refinancing",
    description:
      "Already have a home loan? Let us review your current rate and switch you to a better deal that could save you thousands each year on your repayments.",
    icon: "📉",
  },
  {
    title: "Debt\nConsolidation",
    slug: "debt-consolidation",
    description:
      "Simplify your finances by combining multiple debts into one manageable loan with a lower interest rate. Take control and reduce your overall repayments.",
    icon: "💳",
  },
  {
    title: "Investment Property Loans",
    slug: "investment-property",
    description:
      "Build your property portfolio with competitive investment loan options. We help you find the right loan structure to maximise your returns.",
    icon: "📊",
  },
  {
    title: "Construction & Building Loans",
    slug: "construction",
    description:
      "Planning to build your dream home? We specialise in construction loans with progress payment structures tailored to your building timeline.",
    icon: "🏗️",
  },
  {
    title: "First Home Buyer Support",
    slug: "first-home-buyer-support",
    description:
      "Access government guarantee schemes, grants, and first home buyer concessions. We guide you through every step of the process to get you into your first home faster.",
    icon: "🔑",
  },
];
