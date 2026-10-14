// Official state and territory stamp duty (transfer duty) data definitions.
// CRITICAL: Do not invent or estimate rates. Every numeric field is marked with 'TODO_VERIFY'
// until official figures are verified directly from state revenue office publications.

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
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
    },
  },
  VIC: {
    state: 'VIC',
    name: 'Victoria',
    source: 'https://www.sro.vic.gov.au/land-transfer-duty',
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
    },
  },
  QLD: {
    state: 'QLD',
    name: 'Queensland',
    source: 'https://qro.qld.gov.au/duties/transfer-duty/',
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
    },
  },
  WA: {
    state: 'WA',
    name: 'Western Australia',
    source: 'https://www.wa.gov.au/organisation/department-of-finance/duties-transfer-duty',
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
    },
  },
  SA: {
    state: 'SA',
    name: 'South Australia',
    source: 'https://www.revenuesa.sa.gov.au/stampduty',
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
    },
  },
  TAS: {
    state: 'TAS',
    name: 'Tasmania',
    source: 'https://www.sro.tas.gov.au/property-transfer-duty',
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
    },
  },
  ACT: {
    state: 'ACT',
    name: 'Australian Capital Territory',
    source: 'https://www.revenue.act.gov.au/duties/conveyance-duty',
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
    },
  },
  NT: {
    state: 'NT',
    name: 'Northern Territory',
    source: 'https://treasury.nt.gov.au/dtf/territory-revenue-office/stamp-duty',
    asAt: 'October 2026',
    standardBrackets: [
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
      { threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' },
    ],
    firstHomeBuyerConcession: {
      establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
      vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
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
