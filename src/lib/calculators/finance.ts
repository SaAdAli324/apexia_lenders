import { CALC_SETTINGS } from './settings';
import { RESIDENT_TAX_CONFIG_2026_27 } from './tax-config';
import type { TaxBracket } from './tax-config';
import { STAMP_DUTY_DATA, hasTodoVerify } from './stamp-duty-data';
import type { StateStampDutyConfig } from './stamp-duty-data';

/**
 * Standard loan payment per period (e.g. monthly repayment).
 */
export function paymentPerPeriod(
  principal: number,
  annualRate: number,
  years: number,
  periodsPerYear: number = 12
): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / periodsPerYear;
  const n = years * periodsPerYear;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/**
 * Maximum principal loan amount supported by a given periodic repayment.
 */
export function maxLoanForPayment(
  payment: number,
  annualRate: number,
  years: number,
  periodsPerYear: number = 12
): number {
  if (payment <= 0 || years <= 0) return 0;
  const r = annualRate / periodsPerYear;
  const n = years * periodsPerYear;
  if (r === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + r, -n))) / r;
}

/**
 * Australian personal income tax based on progressive tax brackets.
 * Finds the highest bracket where gross > over, and returns base + (gross - over) * rate.
 */
export function incomeTax(
  gross: number,
  brackets: TaxBracket[] = RESIDENT_TAX_CONFIG_2026_27.brackets
): number {
  if (gross <= 0) return 0;

  // Filter brackets where gross > over
  const matching = brackets.filter((b) => gross > b.over);
  if (matching.length === 0) return 0;

  // The highest row where gross > over
  const highest = matching[matching.length - 1];
  return highest.base + (gross - highest.over) * highest.rate;
}

export interface BorrowingPowerApplicant {
  grossIncome: number;
}

export interface BorrowingPowerInputs {
  applicantCount: 1 | 2;
  primaryIncome: number;
  partnerIncome?: number;
  livingExpenses: number;
  creditCardLimits?: number[];
  existingHomeLoans?: number[];
  personalLoans?: number[];
  otherLiabilities?: number[];
  interestRate?: number; // e.g. 0.06
  termYears?: number; // e.g. 30
}

export interface BorrowingPowerResult {
  maxLoan: number;
  maxLoanRounded: number;
  monthlyRepayment: number;
  assessmentRate: number;
  netMonthlyIncome: number;
  surplus: number;
  commitments: number;
  hasSurplus: boolean;
  termYears: number;
  enteredRate: number;
}

/**
 * Borrowing power estimation adhering strictly to APRA 3% buffer rules and 2026-27 tax specs.
 */
export function borrowingPower(inputs: BorrowingPowerInputs): BorrowingPowerResult {
  const enteredRate = inputs.interestRate ?? CALC_SETTINGS.defaultRate;
  const termYears = inputs.termYears ?? CALC_SETTINGS.defaultTermYears;
  const assessmentRate = enteredRate + CALC_SETTINGS.serviceabilityBuffer;

  // Applicant 1 net income
  const gross1 = Math.max(0, inputs.primaryIncome || 0);
  const tax1 = incomeTax(gross1);
  const medicare1 = gross1 * RESIDENT_TAX_CONFIG_2026_27.medicareLevyRate;
  const net1 = gross1 - tax1 - medicare1;

  // Applicant 2 net income (if joint)
  let totalNet = net1;
  if (inputs.applicantCount === 2) {
    const gross2 = Math.max(0, inputs.partnerIncome || 0);
    const tax2 = incomeTax(gross2);
    const medicare2 = gross2 * RESIDENT_TAX_CONFIG_2026_27.medicareLevyRate;
    const net2 = gross2 - tax2 - medicare2;
    totalNet += net2;
  }

  const netMonthlyIncome = totalNet / 12;

  // Liabilities and commitments
  const cardLimitsSum = (inputs.creditCardLimits || []).reduce((acc, val) => acc + Math.max(0, val || 0), 0);
  const existingLoansSum = (inputs.existingHomeLoans || []).reduce((acc, val) => acc + Math.max(0, val || 0), 0);
  const personalLoansSum = (inputs.personalLoans || []).reduce((acc, val) => acc + Math.max(0, val || 0), 0);
  const otherLiabilitiesSum = (inputs.otherLiabilities || []).reduce((acc, val) => acc + Math.max(0, val || 0), 0);

  const commitments =
    existingLoansSum +
    personalLoansSum +
    otherLiabilitiesSum +
    cardLimitsSum * CALC_SETTINGS.creditCardMonthlyFactor;

  const livingExpenses = Math.max(0, inputs.livingExpenses || 0);
  const surplus = netMonthlyIncome - livingExpenses - commitments;

  if (surplus <= 0) {
    return {
      maxLoan: 0,
      maxLoanRounded: 0,
      monthlyRepayment: 0,
      assessmentRate,
      netMonthlyIncome,
      surplus,
      commitments,
      hasSurplus: false,
      termYears,
      enteredRate,
    };
  }

  const maxLoan = maxLoanForPayment(surplus, assessmentRate, termYears, 12);
  const maxLoanRounded = Math.round(maxLoan);
  // Monthly repayment shows at entered rate, not assessment rate
  const monthlyRepayment = paymentPerPeriod(maxLoan, enteredRate, termYears, 12);

  return {
    maxLoan,
    maxLoanRounded,
    monthlyRepayment,
    assessmentRate,
    netMonthlyIncome,
    surplus,
    commitments,
    hasSurplus: true,
    termYears,
    enteredRate,
  };
}

export interface RepaymentInputs {
  loanAmount: number;
  interestRate?: number;
  termYears?: number;
  frequency?: 'monthly' | 'fortnightly' | 'weekly';
}

export interface RateRiseScenario {
  risePercent: number;
  newRate: number;
  monthlyPayment: number;
  extraPerMonth: number;
}

export interface RepaymentResult {
  periodicPayment: number;
  frequency: 'monthly' | 'fortnightly' | 'weekly';
  periodsPerYear: number;
  totalRepaid: number;
  totalInterest: number;
  loanAmount: number;
  interestRate: number;
  termYears: number;
  rateRiseScenarios: RateRiseScenario[];
}

/**
 * Standard principal and interest repayments calculation.
 */
export function repayments(inputs: RepaymentInputs): RepaymentResult {
  const loanAmount = Math.max(0, inputs.loanAmount || 0);
  const interestRate = inputs.interestRate ?? CALC_SETTINGS.defaultRate;
  const termYears = inputs.termYears ?? CALC_SETTINGS.defaultTermYears;
  const frequency = inputs.frequency ?? 'monthly';

  const periodsPerYear = frequency === 'weekly' ? 52 : frequency === 'fortnightly' ? 26 : 12;

  if (loanAmount <= 0 || termYears <= 0) {
    return {
      periodicPayment: 0,
      frequency,
      periodsPerYear,
      totalRepaid: 0,
      totalInterest: 0,
      loanAmount: 0,
      interestRate,
      termYears,
      rateRiseScenarios: [],
    };
  }

  const periodicPayment = paymentPerPeriod(loanAmount, interestRate, termYears, periodsPerYear);
  const totalRepaid = periodicPayment * termYears * periodsPerYear;
  const totalInterest = Math.max(0, totalRepaid - loanAmount);

  // Rate rise scenarios (+1%, +2%, +3% monthly)
  const baseMonthlyPayment = paymentPerPeriod(loanAmount, interestRate, termYears, 12);
  const rateRiseScenarios: RateRiseScenario[] = [1, 2, 3].map((rise) => {
    const newRate = interestRate + rise / 100;
    const newMonthlyPayment = paymentPerPeriod(loanAmount, newRate, termYears, 12);
    return {
      risePercent: rise,
      newRate,
      monthlyPayment: newMonthlyPayment,
      extraPerMonth: Math.max(0, newMonthlyPayment - baseMonthlyPayment),
    };
  });

  return {
    periodicPayment,
    frequency,
    periodsPerYear,
    totalRepaid,
    totalInterest,
    loanAmount,
    interestRate,
    termYears,
    rateRiseScenarios,
  };
}

export interface StampDutyInputs {
  state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
  propertyPrice: number;
  propertyType: 'established' | 'new' | 'land';
  usage: 'primary' | 'investment';
  firstHomeBuyer: boolean;
}

export interface StampDutyResult {
  isComingSoon: boolean;
  message?: string;
  state: string;
  source?: string;
  asAt?: string;
  propertyPrice: number;
  standardDuty: number | null;
  concessionAmount: number | null;
  totalPayable: number | null;
}

/**
 * Stamp duty calculation engine.
 * If data contains 'TODO_VERIFY', safely returns isComingSoon: true and NEVER returns a number.
 */
export function stampDuty(
  inputs: StampDutyInputs,
  dataRecord: Record<string, StateStampDutyConfig> = STAMP_DUTY_DATA
): StampDutyResult {
  const stateConfig = dataRecord[inputs.state];

  // If state record is missing or contains 'TODO_VERIFY', do not calculate numbers!
  if (!stateConfig || hasTodoVerify(stateConfig)) {
    return {
      isComingSoon: true,
      message: `Stamp duty rates for ${inputs.state} are currently being verified against official revenue office data.`,
      state: inputs.state,
      source: stateConfig?.source,
      asAt: stateConfig?.asAt,
      propertyPrice: inputs.propertyPrice,
      standardDuty: null,
      concessionAmount: null,
      totalPayable: null,
    };
  }

  // Pure engine logic for when verified numeric rates are supplied
  const price = Math.max(0, inputs.propertyPrice || 0);
  let standardDuty = 0;

  for (const bracket of stateConfig.standardBrackets) {
    const threshold = bracket.threshold as number;
    const baseDuty = bracket.baseDuty as number;
    const rate = bracket.rate as number;

    if (price > threshold) {
      standardDuty = baseDuty + (price - threshold) * rate;
    }
  }

  let concessionAmount = 0;

  // First home buyer concessions apply only when usage === 'primary'
  if (inputs.firstHomeBuyer && inputs.usage === 'primary' && stateConfig.firstHomeBuyerConcession) {
    const propKey =
      inputs.propertyType === 'land'
        ? 'vacantLand'
        : inputs.propertyType === 'new'
        ? 'newHome'
        : 'establishedHome';

    const fhbRules = stateConfig.firstHomeBuyerConcession[propKey];
    if (fhbRules) {
      const exemptThresh = fhbRules.exemptThreshold as number;
      const concessionThresh = fhbRules.concessionThreshold as number;

      if (price <= exemptThresh) {
        concessionAmount = standardDuty; // 100% discount
      } else if (price < concessionThresh) {
        // Linear taper concession between exemption and concession threshold
        const range = concessionThresh - exemptThresh;
        if (range > 0) {
          const discountRatio = Math.max(0, 1 - (price - exemptThresh) / range);
          concessionAmount = standardDuty * discountRatio;
        }
      }
    }
  }

  // Use investment surcharge rate only if verified data needs it
  const surchargeRate = (stateConfig as { investmentSurchargeRate?: unknown }).investmentSurchargeRate;
  const surcharge =
    inputs.usage === 'investment' && typeof surchargeRate === 'number'
      ? price * surchargeRate
      : 0;

  const totalPayable = Math.max(0, standardDuty + surcharge - concessionAmount);

  return {
    isComingSoon: false,
    state: inputs.state,
    source: stateConfig.source,
    asAt: stateConfig.asAt,
    propertyPrice: price,
    standardDuty: Math.round(standardDuty),
    concessionAmount: Math.round(concessionAmount),
    totalPayable: Math.round(totalPayable),
  };
}

/**
 * Generate amortisation schedule for SVG area chart.
 * Calculates year-by-year remaining balance from Year 0 to Year N.
 */
export function generateAmortisationSchedule(
  principal: number,
  annualRate: number,
  termYears: number
): { year: number; balance: number }[] {
  if (principal <= 0 || termYears <= 0) {
    return [{ year: 0, balance: 0 }];
  }

  const monthlyPayment = paymentPerPeriod(principal, annualRate, termYears, 12);
  const monthlyRate = annualRate / 12;
  const schedule: { year: number; balance: number }[] = [];

  let currentBalance = principal;
  schedule.push({ year: 0, balance: Math.round(currentBalance) });

  for (let year = 1; year <= termYears; year++) {
    for (let month = 1; month <= 12; month++) {
      if (currentBalance <= 0) {
        currentBalance = 0;
        break;
      }
      const interest = currentBalance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      currentBalance = Math.max(0, currentBalance - principalPaid);
    }
    schedule.push({ year, balance: Math.round(currentBalance) });
  }

  return schedule;
}
