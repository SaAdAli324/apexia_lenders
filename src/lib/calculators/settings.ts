export const CALC_SETTINGS = {
  serviceabilityBuffer: 0.03,        // APRA: lenders test at loan rate + 3 percentage points (confirmed by APRA 28 May 2026)
  creditCardMonthlyFactor: 0.03,     // 3% of each card limit counts as a monthly commitment
  taxYearLabel: '2026-27',
  defaultRate: 0.06,                 // editable starting value
  defaultTermYears: 30,              // editable starting value
  defaultLivingExpenses: { single: 2500, joint: 4000 }, // editable placeholders, NOT a lender benchmark
  ctaLabel: 'Speak to Farid',        // change here if the wording needs to change
  ctaHref: '/contact',               // the site's existing contact form
  lastUpdated: 'October 2026',
};

export const DISCLAIMER =
  "This calculator gives an estimate only, based on the information you enter and general assumptions. " +
  "It is not a credit assessment or an offer of credit. Your actual borrowing power depends on your full " +
  "circumstances and each lender's policy.";

export function formatAUD(amount: number, maximumFractionDigits: number = 0): string {
  if (isNaN(amount) || !isFinite(amount)) return '$0';
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits,
  }).format(amount);
}
