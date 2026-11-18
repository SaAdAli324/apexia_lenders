import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  incomeTax,
  paymentPerPeriod,
  maxLoanForPayment,
  borrowingPower,
  repayments,
  stampDuty,
  generateAmortisationSchedule,
} from '../src/lib/calculators/finance';
import {
  STAMP_DUTY_DATA,
  hasTodoVerify,
  isStampDutyDataVerified,
} from '../src/lib/calculators/stamp-duty-data';
import type { StateStampDutyConfig } from '../src/lib/calculators/stamp-duty-data';
import { CALC_SETTINGS, DISCLAIMER } from '../src/lib/calculators/settings';
import { RESIDENT_TAX_CONFIG_2026_27 } from '../src/lib/calculators/tax-config';

// Helper for ±$2 tolerance as specified in brief
function isCloseTo(actual: number, expected: number, tolerance = 2): boolean {
  return Math.abs(actual - expected) <= tolerance;
}

describe('Finance Core Formulas (Section 9)', () => {
  it('incomeTax(100000) returns 20,520 (and Medicare 2,000)', () => {
    const tax = incomeTax(100000);
    const medicare = 100000 * RESIDENT_TAX_CONFIG_2026_27.medicareLevyRate;
    assert.strictEqual(tax, 20520);
    assert.strictEqual(medicare, 2000);
  });

  it('paymentPerPeriod(600000, 0.06, 30) returns ≈ 3,597.30', () => {
    const payment = paymentPerPeriod(600000, 0.06, 30);
    assert.ok(
      isCloseTo(payment, 3597.30, 0.05),
      `Expected ≈ 3597.30, got ${payment}`
    );
  });

  it('maxLoanForPayment(3983, 0.08, 30) returns ≈ 542,817', () => {
    const maxLoan = maxLoanForPayment(3983, 0.08, 30);
    assert.ok(
      isCloseTo(maxLoan, 542817, 2),
      `Expected ≈ 542817, got ${maxLoan}`
    );
  });

  it('paymentPerPeriod(542817, 0.05, 30) returns ≈ 2,913.96', () => {
    const payment = paymentPerPeriod(542817, 0.05, 30);
    assert.ok(
      isCloseTo(payment, 2913.96, 0.05),
      `Expected ≈ 2913.96, got ${payment}`
    );
  });
});

describe('Full Borrowing Power Cases (Section 9)', () => {
  it('Case A: single, income $100,000, living expenses $2,500, no debts', () => {
    const result = borrowingPower({
      applicantCount: 1,
      primaryIncome: 100000,
      livingExpenses: 2500,
      creditCardLimits: [],
      existingHomeLoans: [],
      personalLoans: [],
      otherLiabilities: [],
      interestRate: 0.06,
      termYears: 30,
    });

    assert.ok(
      isCloseTo(result.netMonthlyIncome, 6456.67, 0.05),
      `Net monthly: expected 6456.67, got ${result.netMonthlyIncome}`
    );
    assert.ok(
      isCloseTo(result.surplus, 3956.67, 0.05),
      `Surplus: expected 3956.67, got ${result.surplus}`
    );
    assert.ok(
      isCloseTo(result.maxLoan, 491742, 2),
      `Max loan: expected ≈ 491742, got ${result.maxLoan}`
    );
    assert.ok(
      isCloseTo(result.monthlyRepayment, 2948.24, 0.05),
      `Monthly repayment: expected ≈ 2948.24, got ${result.monthlyRepayment}`
    );
    assert.strictEqual(result.hasSurplus, true);
  });

  it('Case B: joint, incomes $100k & $80k, expenses $4,000, card limit $10,000, other repayments $500', () => {
    const result = borrowingPower({
      applicantCount: 2,
      primaryIncome: 100000,
      partnerIncome: 80000,
      livingExpenses: 4000,
      creditCardLimits: [10000],
      otherLiabilities: [500],
      interestRate: 0.06,
      termYears: 30,
    });

    assert.ok(
      isCloseTo(result.netMonthlyIncome, 11780.00, 0.05),
      `Net monthly: expected 11780.00, got ${result.netMonthlyIncome}`
    );
    assert.ok(
      isCloseTo(result.commitments, 800, 0.01),
      `Commitments: expected 800, got ${result.commitments}`
    );
    assert.ok(
      isCloseTo(result.surplus, 6980.00, 0.05),
      `Surplus: expected 6980.00, got ${result.surplus}`
    );
    assert.ok(
      isCloseTo(result.maxLoan, 867487, 2),
      `Max loan: expected ≈ 867487, got ${result.maxLoan}`
    );
    assert.ok(
      isCloseTo(result.monthlyRepayment, 5201.03, 0.05),
      `Monthly repayment: expected ≈ 5201.03, got ${result.monthlyRepayment}`
    );
    assert.strictEqual(result.hasSurplus, true);
  });

  it('Case C: surplus <= 0 returns max loan 0, monthly repayment 0, and no negative numbers', () => {
    const result = borrowingPower({
      applicantCount: 1,
      primaryIncome: 45000,
      livingExpenses: 4000, // living expenses exceed net income
      creditCardLimits: [5000],
      interestRate: 0.06,
      termYears: 30,
    });

    assert.strictEqual(result.maxLoan, 0);
    assert.strictEqual(result.maxLoanRounded, 0);
    assert.strictEqual(result.monthlyRepayment, 0);
    assert.strictEqual(result.hasSurplus, false);
    assert.ok(result.surplus <= 0);
  });
});

describe('Repayments Calculator Logic', () => {
  it('calculates monthly repayment, total interest and total repaid', () => {
    const result = repayments({
      loanAmount: 600000,
      interestRate: 0.06,
      termYears: 30,
      frequency: 'monthly',
    });

    assert.ok(isCloseTo(result.periodicPayment, 3597.30, 0.05));
    assert.ok(isCloseTo(result.totalRepaid, 3597.30 * 360, 20));
    assert.ok(result.totalInterest > 0);
    assert.strictEqual(result.rateRiseScenarios.length, 3);
  });

  it('supports fortnightly and weekly frequency', () => {
    const fortnightly = repayments({
      loanAmount: 600000,
      interestRate: 0.06,
      termYears: 30,
      frequency: 'fortnightly',
    });
    assert.strictEqual(fortnightly.periodsPerYear, 26);
    assert.ok(fortnightly.periodicPayment > 0);

    const weekly = repayments({
      loanAmount: 600000,
      interestRate: 0.06,
      termYears: 30,
      frequency: 'weekly',
    });
    assert.strictEqual(weekly.periodsPerYear, 52);
    assert.ok(weekly.periodicPayment > 0);
  });
});

describe('Amortisation Schedule Chart Generator', () => {
  it('generates 31 balance points for a 30-year loan declining to zero', () => {
    const schedule = generateAmortisationSchedule(500000, 0.06, 30);
    assert.strictEqual(schedule.length, 31);
    assert.strictEqual(schedule[0].year, 0);
    assert.strictEqual(schedule[0].balance, 500000);
    assert.strictEqual(schedule[30].year, 30);
    assert.strictEqual(schedule[30].balance, 0);
  });
});

describe('Stamp Duty Engine and Verification Status (Section 7)', () => {
  it('confirms official STAMP_DUTY_DATA is verified with zero placeholders', () => {
    const hasPlaceholders = hasTodoVerify(STAMP_DUTY_DATA);
    assert.strictEqual(hasPlaceholders, false);
    assert.strictEqual(isStampDutyDataVerified(STAMP_DUTY_DATA), true);
  });

  it('returns isComingSoon: true when unverified mock placeholder data is supplied', () => {
    const unverifiedMock: Record<string, StateStampDutyConfig> = {
      NSW: {
        state: 'NSW',
        name: 'New South Wales',
        source: 'https://www.revenue.nsw.gov.au',
        asAt: '2026',
        standardBrackets: [{ threshold: 'TODO_VERIFY', baseDuty: 'TODO_VERIFY', rate: 'TODO_VERIFY' }],
        firstHomeBuyerConcession: {
          establishedHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
          newHome: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
          vacantLand: { exemptThreshold: 'TODO_VERIFY', concessionThreshold: 'TODO_VERIFY' },
        },
      },
    };

    const result = stampDuty(
      {
        state: 'NSW',
        propertyPrice: 850000,
        propertyType: 'established',
        usage: 'primary',
        firstHomeBuyer: false,
      },
      unverifiedMock
    );

    assert.strictEqual(result.isComingSoon, true);
    assert.strictEqual(result.totalPayable, null);
    assert.strictEqual(result.standardDuty, null);
    assert.strictEqual(result.concessionAmount, null);
  });

  it('calculates live duty accurately from verified STAMP_DUTY_DATA', () => {
    const result = stampDuty({
      state: 'NSW',
      propertyPrice: 850000,
      propertyType: 'established',
      usage: 'primary',
      firstHomeBuyer: false,
    });

    assert.strictEqual(result.isComingSoon, false);
    assert.ok(result.totalPayable! > 0);
    assert.strictEqual(result.totalPayable, result.standardDuty);
  });

  it('calculates duty accurately when verified data fixture is supplied', () => {
    const verifiedMockFixture: Record<string, StateStampDutyConfig> = {
      NSW: {
        state: 'NSW',
        name: 'New South Wales',
        source: 'https://www.revenue.nsw.gov.au',
        asAt: 'October 2026',
        standardBrackets: [
          { threshold: 0, baseDuty: 0, rate: 0.0125 },
          { threshold: 17000, baseDuty: 212, rate: 0.015 },
          { threshold: 36000, baseDuty: 497, rate: 0.02 },
          { threshold: 97000, baseDuty: 1717, rate: 0.035 },
          { threshold: 364000, baseDuty: 11062, rate: 0.045 },
          { threshold: 1212000, baseDuty: 49222, rate: 0.055 },
        ],
        firstHomeBuyerConcession: {
          establishedHome: { exemptThreshold: 800000, concessionThreshold: 1000000 },
          newHome: { exemptThreshold: 800000, concessionThreshold: 1000000 },
          vacantLand: { exemptThreshold: 350000, concessionThreshold: 450000 },
        },
      },
    };

    const verifiedResult = stampDuty(
      {
        state: 'NSW',
        propertyPrice: 600000,
        propertyType: 'established',
        usage: 'primary',
        firstHomeBuyer: true,
      },
      verifiedMockFixture
    );

    assert.strictEqual(verifiedResult.isComingSoon, false);
    // Under 800k first home buyer exemption: duty payable is 0
    assert.strictEqual(verifiedResult.totalPayable, 0);
    assert.ok(verifiedResult.standardDuty! > 0);
    assert.strictEqual(verifiedResult.concessionAmount, verifiedResult.standardDuty);

    // When usage === 'investment', first home buyer concessions must NOT apply
    const investmentResult = stampDuty(
      {
        state: 'NSW',
        propertyPrice: 600000,
        propertyType: 'established',
        usage: 'investment',
        firstHomeBuyer: true,
      },
      verifiedMockFixture
    );
    assert.strictEqual(investmentResult.isComingSoon, false);
    assert.strictEqual(investmentResult.concessionAmount, 0);
    assert.strictEqual(investmentResult.totalPayable, investmentResult.standardDuty);
  });
});

describe('Settings and Disclaimers (Section 4)', () => {
  it('contains approved disclaimer verbatim', () => {
    assert.strictEqual(
      DISCLAIMER,
      "This calculator gives an estimate only, based on the information you enter and general assumptions. " +
      "It is not a credit assessment or an offer of credit. Your actual borrowing power depends on your full " +
      "circumstances and each lender's policy."
    );
  });

  it('contains required APRA buffer of 3% and card factor of 3%', () => {
    assert.strictEqual(CALC_SETTINGS.serviceabilityBuffer, 0.03);
    assert.strictEqual(CALC_SETTINGS.creditCardMonthlyFactor, 0.03);
  });
});
