"use client";

import React, { useState, useMemo } from 'react';
import NumericField from './NumericField';
import ResultCard from './ResultCard';
import LoanBalanceChart from './LoanBalanceChart';
import { CALC_SETTINGS, formatAUD } from '@/lib/calculators/settings';
import { repayments, generateAmortisationSchedule } from '@/lib/calculators/finance';

export default function RepaymentsTab() {
  const [loanAmount, setLoanAmount] = useState<number>(600000);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(CALC_SETTINGS.defaultRate * 100);
  const [termYears, setTermYears] = useState<number>(CALC_SETTINGS.defaultTermYears);
  const [frequency, setFrequency] = useState<'monthly' | 'fortnightly' | 'weekly'>('monthly');

  const result = useMemo(() => {
    return repayments({
      loanAmount,
      interestRate: interestRatePercent / 100,
      termYears,
      frequency,
    });
  }, [loanAmount, interestRatePercent, termYears, frequency]);

  const scheduleData = useMemo(() => {
    if (loanAmount <= 0) return [];
    return generateAmortisationSchedule(
      loanAmount,
      interestRatePercent / 100,
      termYears
    );
  }, [loanAmount, interestRatePercent, termYears]);

  const frequencyLabel =
    frequency === 'weekly'
      ? 'Weekly repayment'
      : frequency === 'fortnightly'
      ? 'Fortnightly repayment'
      : 'Monthly repayment';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          {/* Loan Amount */}
          <NumericField
            id="repayment-loan-amount"
            label="Loan amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix="$"
            isCurrency={true}
            required={true}
            min={1000}
            step={5000}
            helpText="Enter the total mortgage amount you plan to borrow."
          />

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumericField
              id="repayment-interest-rate"
              label="Interest rate"
              value={interestRatePercent}
              onChange={setInterestRatePercent}
              suffix="%"
              step={0.05}
              min={0.1}
              max={15}
              helpText="Annual percentage interest rate."
            />

            <NumericField
              id="repayment-term-years"
              label="Loan term"
              value={termYears}
              onChange={setTermYears}
              suffix="years"
              step={1}
              min={1}
              max={30}
              helpText="Loan duration in years (1 to 30 years)."
            />
          </div>

          {/* Repayment Frequency */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Repayment frequency
            </label>
            <div
              className="grid grid-cols-3 gap-3"
              role="radiogroup"
              aria-label="Repayment frequency"
            >
              {(['monthly', 'fortnightly', 'weekly'] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  role="radio"
                  aria-checked={frequency === freq}
                  onClick={() => setFrequency(freq)}
                  className={`py-3 px-3 rounded-lg font-semibold text-sm transition-all border text-center capitalize cursor-pointer ${
                    frequency === freq
                      ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                      : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate mt-1.5">
              Principal and interest repayments. Paying more often can slightly reduce the interest you pay.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Results */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
        <ResultCard>
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">
                {frequencyLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                {formatAUD(Math.round(result.periodicPayment))}
                <span className="text-sm font-sans font-normal text-slate ml-1.5">
                  / {frequency === 'weekly' ? 'week' : frequency === 'fortnightly' ? 'fortnight' : 'month'}
                </span>
              </div>
            </div>

            {/* Interest & Total Repaid Breakdown */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-light-bg rounded-xl border border-border">
              <div>
                <span className="text-xs text-slate block">Total interest</span>
                <span className="text-base font-semibold text-navy">
                  {formatAUD(Math.round(result.totalInterest))}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate block">Total repayments</span>
                <span className="text-base font-semibold text-navy">
                  {formatAUD(Math.round(result.totalRepaid))}
                </span>
              </div>
            </div>

            {/* Rate Rise Buffer Breakdown (+1%, +2%, +3%) */}
            <div className="pt-2 border-t border-border space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-navy block">
                If interest rates change (monthly impact)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {result.rateRiseScenarios.map((scenario) => (
                  <div
                    key={scenario.risePercent}
                    className="p-2.5 bg-light-bg rounded-lg border border-border text-center"
                  >
                    <span className="text-[11px] font-semibold text-navy block">
                      +{scenario.risePercent}% ({(scenario.newRate * 100).toFixed(2)}%)
                    </span>
                    <span className="text-xs font-bold text-navy block mt-0.5">
                      {formatAUD(Math.round(scenario.monthlyPayment))}
                    </span>
                    <span className="text-[10px] text-slate block">
                      +{formatAUD(Math.round(scenario.extraPerMonth))}/mo
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Balance Amortisation Chart */}
            <LoanBalanceChart data={scheduleData} termYears={termYears} />
          </div>
        </ResultCard>
      </div>
    </div>
  );
}
