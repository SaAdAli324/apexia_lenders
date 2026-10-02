export interface Lender {
  name: string;
  slug: string;
  logo?: string;
}

export const lenders: Lender[] = [
  { name: "Commonwealth Bank", slug: "commonwealth-bank", logo: "/lender-logos/1.png" },
  { name: "Westpac", slug: "westpac", logo: "/lender-logos/2.png" },
  { name: "ANZ", slug: "anz", logo: "/lender-logos/3.png" },
  { name: "NAB", slug: "nab", logo: "/lender-logos/6.png" },
  { name: "Macquarie Bank", slug: "macquarie-bank", logo: "/lender-logos/7.png" },
  { name: "St.George", slug: "st-george", logo: "/lender-logos/8.png" },
  // Other lenders without logos for now
  { name: "ING", slug: "ing" },
  { name: "ME Bank", slug: "me-bank" },
  { name: "MyState Bank", slug: "mystate-bank" },
  { name: "ubank", slug: "ubank" },
  { name: "Auswide", slug: "auswide" },
  { name: "Better Choice", slug: "better-choice" },
  { name: "Bankwest", slug: "bankwest" },
  { name: "Suncorp", slug: "suncorp" },
  { name: "Adelaide Bank", slug: "adelaide-bank" },
  { name: "Bank of Melbourne", slug: "bank-of-melbourne" },
];

export const FEATURED_LENDERS = lenders.slice(0, 6);
export const TOTAL_LENDERS = 50;
