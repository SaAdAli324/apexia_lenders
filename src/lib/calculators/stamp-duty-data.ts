// Official state and territory stamp duty (transfer duty) data definitions.
// Sourced directly from official Australian State & Territory Revenue Offices (2025/2026 financial year).

export type NumericValue = number | 'TODO_VERIFY';

export interface DutyBracket {
  threshold: NumericValue;
  baseDuty: NumericValue;
  rate: NumericValue;
}

export interface FirstHomeConcession {
  exemptThreshold: NumericValue;
  concessionThreshold: NumericValue;
}

export interface StateStampDutyConfig {
  state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
  name: string;
  source: string;
  asAt: string;
  standardBrackets: DutyBracket[];
  investmentBrackets?: DutyBracket[];
  firstHomeBuyerConcession: {
    establishedHome: FirstHomeConcession;
    newHome: FirstHomeConcession;
    vacantLand: FirstHomeConcession;
  };
}

export const STAMP_DUTY_DATA: Record<string, StateStampDutyConfig> = {
  NSW: {
    state: 'NSW',
    name: 'New South Wales',
    source: 'https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.0125 },
      { threshold: 17000, baseDuty: 212, rate: 0.015 },
      { threshold: 37000, baseDuty: 512, rate: 0.0175 },
      { threshold: 99000, baseDuty: 1597, rate: 0.035 },
      { threshold: 372000, baseDuty: 11152, rate: 0.045 },
      { threshold: 1240000, baseDuty: 50212, rate: 0.055 },
      { threshold: 3721000, baseDuty: 186667, rate: 0.07 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 800000, concessionThreshold: 1000000 },
      newHome: { exemptThreshold: 800000, concessionThreshold: 1000000 },
      vacantLand: { exemptThreshold: 350000, concessionThreshold: 450000 },
    },
  },
  VIC: {
    state: 'VIC',
    name: 'Victoria',
    source: 'https://www.sro.vic.gov.au/land-transfer-duty',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.014 },
      { threshold: 25000, baseDuty: 350, rate: 0.024 },
      { threshold: 130000, baseDuty: 2870, rate: 0.05 },
      { threshold: 440000, baseDuty: 18370, rate: 0.06 },
      { threshold: 550000, baseDuty: 28070, rate: 0.06 },
      { threshold: 960000, baseDuty: 52800, rate: 0.055 },
      { threshold: 2000000, baseDuty: 110000, rate: 0.065 },
    ],
    investmentBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.014 },
      { threshold: 25000, baseDuty: 350, rate: 0.024 },
      { threshold: 130000, baseDuty: 2870, rate: 0.06 },
      { threshold: 960000, baseDuty: 52800, rate: 0.055 },
      { threshold: 2000000, baseDuty: 110000, rate: 0.065 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 600000, concessionThreshold: 750000 },
      newHome: { exemptThreshold: 600000, concessionThreshold: 750000 },
      vacantLand: { exemptThreshold: 600000, concessionThreshold: 750000 },
    },
  },
  QLD: {
    state: 'QLD',
    name: 'Queensland',
    source: 'https://qro.qld.gov.au/duties/transfer-duty/',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.01 },
      { threshold: 350000, baseDuty: 3500, rate: 0.035 },
      { threshold: 540000, baseDuty: 10150, rate: 0.045 },
      { threshold: 1000000, baseDuty: 30850, rate: 0.0575 },
    ],
    investmentBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.015 },
      { threshold: 5000, baseDuty: 0, rate: 0.015 },
      { threshold: 75000, baseDuty: 1050, rate: 0.035 },
      { threshold: 540000, baseDuty: 17325, rate: 0.045 },
      { threshold: 1000000, baseDuty: 38025, rate: 0.0575 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 700000, concessionThreshold: 800000 },
      newHome: { exemptThreshold: 10000000, concessionThreshold: 10000000 },
      vacantLand: { exemptThreshold: 350000, concessionThreshold: 500000 },
    },
  },
  WA: {
    state: 'WA',
    name: 'Western Australia',
    source: 'https://www.wa.gov.au/organisation/department-of-finance/duties-transfer-duty',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.019 },
      { threshold: 120000, baseDuty: 2280, rate: 0.0285 },
      { threshold: 150000, baseDuty: 3135, rate: 0.038 },
      { threshold: 360000, baseDuty: 11115, rate: 0.0475 },
      { threshold: 725000, baseDuty: 28453, rate: 0.0515 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 500000, concessionThreshold: 700000 },
      newHome: { exemptThreshold: 500000, concessionThreshold: 700000 },
      vacantLand: { exemptThreshold: 350000, concessionThreshold: 450000 },
    },
  },
  SA: {
    state: 'SA',
    name: 'South Australia',
    source: 'https://www.revenuesa.sa.gov.au/stampduty',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.01 },
      { threshold: 12000, baseDuty: 120, rate: 0.02 },
      { threshold: 30000, baseDuty: 480, rate: 0.03 },
      { threshold: 50000, baseDuty: 1080, rate: 0.035 },
      { threshold: 100000, baseDuty: 2830, rate: 0.04 },
      { threshold: 200000, baseDuty: 6830, rate: 0.0425 },
      { threshold: 250000, baseDuty: 8955, rate: 0.0475 },
      { threshold: 300000, baseDuty: 11330, rate: 0.05 },
      { threshold: 500000, baseDuty: 21330, rate: 0.055 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 0, concessionThreshold: 0 },
      newHome: { exemptThreshold: 10000000, concessionThreshold: 10000000 },
      vacantLand: { exemptThreshold: 10000000, concessionThreshold: 10000000 },
    },
  },
  TAS: {
    state: 'TAS',
    name: 'Tasmania',
    source: 'https://www.sro.tas.gov.au/property-transfer-duty',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 50, rate: 0 },
      { threshold: 3000, baseDuty: 50, rate: 0.0175 },
      { threshold: 25000, baseDuty: 435, rate: 0.0225 },
      { threshold: 75000, baseDuty: 1560, rate: 0.035 },
      { threshold: 200000, baseDuty: 5935, rate: 0.04 },
      { threshold: 375000, baseDuty: 12935, rate: 0.0425 },
      { threshold: 725000, baseDuty: 27810, rate: 0.045 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 750000, concessionThreshold: 750000 },
      newHome: { exemptThreshold: 750000, concessionThreshold: 750000 },
      vacantLand: { exemptThreshold: 400000, concessionThreshold: 400000 },
    },
  },
  ACT: {
    state: 'ACT',
    name: 'Australian Capital Territory',
    source: 'https://www.revenue.act.gov.au/duties/conveyance-duty',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.0028 },
      { threshold: 260000, baseDuty: 728, rate: 0.022 },
      { threshold: 300000, baseDuty: 1608, rate: 0.034 },
      { threshold: 500000, baseDuty: 8408, rate: 0.0432 },
      { threshold: 750000, baseDuty: 19208, rate: 0.059 },
      { threshold: 1000000, baseDuty: 33958, rate: 0.064 },
      { threshold: 1455000, baseDuty: 63078, rate: 0.0454 },
    ],
    investmentBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.012 },
      { threshold: 200000, baseDuty: 2400, rate: 0.022 },
      { threshold: 300000, baseDuty: 4600, rate: 0.034 },
      { threshold: 500000, baseDuty: 11400, rate: 0.0432 },
      { threshold: 750000, baseDuty: 22200, rate: 0.059 },
      { threshold: 1000000, baseDuty: 36950, rate: 0.064 },
      { threshold: 1455000, baseDuty: 66070, rate: 0.0454 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 1000000, concessionThreshold: 1000000 },
      newHome: { exemptThreshold: 1000000, concessionThreshold: 1000000 },
      vacantLand: { exemptThreshold: 1000000, concessionThreshold: 1000000 },
    },
  },
  NT: {
    state: 'NT',
    name: 'Northern Territory',
    source: 'https://treasury.nt.gov.au/dtf/territory-revenue-office/stamp-duty',
    asAt: '2025-2026',
    standardBrackets: [
      { threshold: 0, baseDuty: 0, rate: 0.015 },
      { threshold: 525000, baseDuty: 25987, rate: 0.0495 },
      { threshold: 3000000, baseDuty: 148500, rate: 0.0575 },
      { threshold: 5000000, baseDuty: 287500, rate: 0.0595 },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 0, concessionThreshold: 0 },
      newHome: { exemptThreshold: 650000, concessionThreshold: 650000 },
      vacantLand: { exemptThreshold: 350000, concessionThreshold: 350000 },
    },
  },
};

/**
 * Recursively inspects data to verify if any 'TODO_VERIFY' placeholder remains.
 */
export function hasTodoVerify(value: unknown): boolean {
  if (value === 'TODO_VERIFY') return true;
  if (value === null || typeof value !== 'object') return false;
  if (Array.isArray(value)) {
    return value.some((item) => hasTodoVerify(item));
  }
  return Object.values(value).some((val) => hasTodoVerify(val));
}

export function isStampDutyDataVerified(data: Record<string, StateStampDutyConfig> = STAMP_DUTY_DATA): boolean {
  return !hasTodoVerify(data);
}
