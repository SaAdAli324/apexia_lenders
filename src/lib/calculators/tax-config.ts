// Australian personal income tax brackets labelled by financial year.
// Note: Rates change every 1 July. A further cut to the first taxed bracket is scheduled from 1 July 2027.

export interface TaxBracket {
  over: number;
  base: number;
  rate: number;
}

export interface TaxYearConfig {
  yearLabel: string;
  effectiveFrom: string;
  brackets: TaxBracket[];
  medicareLevyRate: number;
  simplifications: string[];
}

export const RESIDENT_TAX_CONFIG_2026_27: TaxYearConfig = {
  yearLabel: '2026-27',
  effectiveFrom: '2026-07-01',
  medicareLevyRate: 0.02,
  brackets: [
    { over: 0, base: 0, rate: 0 },
    { over: 18200, base: 0, rate: 0.15 },
    { over: 45000, base: 4020, rate: 0.30 },
    { over: 135000, base: 31020, rate: 0.37 },
    { over: 190000, base: 51370, rate: 0.45 },
  ],
  simplifications: [
    'Australian tax residents only',
    'Flat 2% Medicare levy on all taxable income',
    'No Low Income Tax Offset (LITO) or other tax offsets modelled',
    'No HECS/HELP higher education debt repayments included',
    'No deductions applied (taxable income equals gross salary)',
  ],
};
