"use client";

import React, { useState, useMemo } from 'react';
import NumericField from './NumericField';
import ResultCard from './ResultCard';
import LoanBalanceChart from './LoanBalanceChart';
import AssumptionsPanel from './AssumptionsPanel';
import { CALC_SETTINGS, formatAUD } from '@/lib/calculators/settings';
import { borrowingPower, generateAmortisationSchedule } from '@/lib/calculators/finance';

export default function BorrowingPowerTab() {
  const [applicantCount, setApplicantCount] = useState<1 | 2>(1);
  const [primaryIncome, setPrimaryIncome] = useState<number>(0);
  const [partnerIncome, setPartnerIncome] = useState<number>(0);
  const [livingExpenses, setLivingExpenses] = useState<number>(CALC_SETTINGS.defaultLivingExpenses.single);
  const [hasCustomExpenses, setHasCustomExpenses] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  // Liabilities (arrays for multiple entries)
  const [creditCards, setCreditCards] = useState<number[]>([]);
  const [existingHomeLoans, setExistingHomeLoans] = useState<number[]>([]);
  const [personalLoans, setPersonalLoans] = useState<number[]>([]);
  const [otherLiabilities, setOtherLiabilities] = useState<number[]>([]);

  // Loan terms
  const [interestRatePercent, setInterestRatePercent] = useState<number>(CALC_SETTINGS.defaultRate * 100);
  const [termYears, setTermYears] = useState<number>(CALC_SETTINGS.defaultTermYears);

  const handleFieldError = (fieldId: string, hasError: boolean) => {
    setFieldErrors((prev) => {
      if (prev[fieldId] === hasError) return prev;
      return { ...prev, [fieldId]: hasError };
    });
  };

  const hasAnyFieldErrors = Object.values(fieldErrors).some(Boolean);

  // Toggle applicant count and auto-adjust default living expenses if user hasn't typed custom
  const handleApplicantCountChange = (count: 1 | 2) => {
    setApplicantCount(count);
    if (!hasCustomExpenses) {
      setLivingExpenses(
        count === 1
          ? CALC_SETTINGS.defaultLivingExpenses.single
          : CALC_SETTINGS.defaultLivingExpenses.joint
      );
    }
  };

  const handleLivingExpensesChange = (val: number) => {
    setHasCustomExpenses(true);
    setLivingExpenses(val);
  };

  const defaultExpensesForHousehold =
    applicantCount === 1
      ? CALC_SETTINGS.defaultLivingExpenses.single
      : CALC_SETTINGS.defaultLivingExpenses.joint;

  const isBelowDefaultExpenses =
    !fieldErrors['living-expenses'] &&
    livingExpenses > 0 &&
    livingExpenses < defaultExpensesForHousehold;

  // Validation: Required fields must be non-empty and valid positive numbers with no input errors
  const isFormValid =
    !hasAnyFieldErrors &&
    primaryIncome > 0 &&
    !isNaN(primaryIncome) &&
    livingExpenses > 0 &&
    !isNaN(livingExpenses);

  // Multiple liability helpers
  const handleAddItem = (setter: React.Dispatch<React.SetStateAction<number[]>>) => {
    setter((prev) => [...prev, 0]);
  };

  const handleUpdateItem = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    value: number
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(0, value);
      return updated;
    });
  };

  const handleRemoveItem = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    prefixKey: string
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[`${prefixKey}-${index}`];
      return next;
    });
  };

  // Execute calculation pure function
  const result = useMemo(() => {
    return borrowingPower({
      applicantCount,
      primaryIncome,
      partnerIncome: applicantCount === 2 ? partnerIncome : 0,
      livingExpenses,
      creditCardLimits: creditCards,
      existingHomeLoans,
      personalLoans,
      otherLiabilities,
      interestRate: interestRatePercent / 100,
      termYears,
    });
  }, [
    applicantCount,
    primaryIncome,
    partnerIncome,
    livingExpenses,
    creditCards,
    existingHomeLoans,
    personalLoans,
    otherLiabilities,
    interestRatePercent,
    termYears,
  ]);

  // Amortisation schedule for SVG chart
  const scheduleData = useMemo(() => {
    if (!result.hasSurplus || result.maxLoanRounded <= 0) return [];
    return generateAmortisationSchedule(
      result.maxLoanRounded,
      interestRatePercent / 100,
      termYears
    );
  }, [result.hasSurplus, result.maxLoanRounded, interestRatePercent, termYears]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          {/* 1. Who is this loan for? */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Who is this loan for?
            </label>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Who is this loan for">
              <button
                type="button"
                role="radio"
                aria-checked={applicantCount === 1}
                onClick={() => handleApplicantCountChange(1)}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all border text-center cursor-pointer ${
                  applicantCount === 1
                    ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                    : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                }`}
              >
                Just me (Single)
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={applicantCount === 2}
                onClick={() => handleApplicantCountChange(2)}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all border text-center cursor-pointer ${
                  applicantCount === 2
                    ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                    : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                }`}
              >
                Me plus one (Joint)
              </button>
            </div>
            <p className="text-xs text-slate mt-1.5">
              Select whether you are applying individually or jointly with a partner or co-borrower.
            </p>
          </div>

          {/* 2. Annual Incomes (Before tax) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumericField
              id="primary-income"
              label="Your annual income"
              value={primaryIncome}
              onChange={setPrimaryIncome}
              onErrorChange={(err) => handleFieldError('primary-income', err)}
              prefix="$"
              isCurrency={true}
              required={true}
              helpText="Base salary before tax, excluding superannuation."
              min={1}
            />

            {applicantCount === 2 && (
              <NumericField
                id="partner-income"
                label="Partner's annual income"
                value={partnerIncome}
                onChange={setPartnerIncome}
                onErrorChange={(err) => handleFieldError('partner-income', err)}
                prefix="$"
                isCurrency={true}
                helpText="Partner's base salary before tax, excluding super."
                min={0}
              />
            )}
          </div>

          {/* 3. Monthly Living Expenses */}
          <div>
            <NumericField
              id="living-expenses"
              label="Monthly living expenses"
              value={livingExpenses}
              onChange={handleLivingExpensesChange}
              onErrorChange={(err) => handleFieldError('living-expenses', err)}
              prefix="$"
              isCurrency={true}
              required={true}
              helpText="Include everything you spend each month, including costs for children or other dependants."
              min={1}
            />
            {isBelowDefaultExpenses && (
              <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
                <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>This is lower than most households spend. Lenders will usually assume more.</span>
              </div>
            )}
          </div>

          {/* 4. Credit or store cards */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-sm font-semibold text-navy block">
                  Credit or store cards
                </label>
                <span className="text-xs text-slate">
                  Enter card credit limits (not current balance). Lenders count 3% of your limit each month.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAddItem(setCreditCards)}
                className="text-xs font-semibold text-teal hover:text-white bg-teal/10 hover:bg-teal border border-teal/30 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 flex items-center gap-1"
              >
                + Add card
              </button>
            </div>

            {creditCards.length === 0 ? (
              <p className="text-xs text-slate italic bg-light-bg p-3 rounded-lg border border-dashed border-border">
                No credit cards added. Click &quot;+ Add card&quot; if you hold any cards.
              </p>
            ) : (
              <div className="space-y-2 mt-2">
                {creditCards.map((limit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-1">
                      <NumericField
                        id={`credit-card-${idx}`}
                        label={`Card ${idx + 1} Limit`}
                        value={limit}
                        onChange={(val) => handleUpdateItem(setCreditCards, idx, val)}
                        onErrorChange={(err) => handleFieldError(`credit-card-${idx}`, err)}
                        prefix="$"
                        isCurrency={true}
                        placeholder="Limit, e.g. 5,000"
                        min={0}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setCreditCards, idx, 'credit-card')}
                      aria-label={`Remove Card ${idx + 1}`}
                      className="mt-6 p-2 text-slate hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Existing home loans */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-sm font-semibold text-navy block">
                  Existing home loans
                </label>
                <span className="text-xs text-slate">
                  Current monthly repayments for any existing mortgage.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAddItem(setExistingHomeLoans)}
                className="text-xs font-semibold text-teal hover:text-white bg-teal/10 hover:bg-teal border border-teal/30 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 flex items-center gap-1"
              >
                + Add mortgage
              </button>
            </div>

            {existingHomeLoans.length === 0 ? (
              <p className="text-xs text-slate italic bg-light-bg p-3 rounded-lg border border-dashed border-border">
                No other mortgages added.
              </p>
            ) : (
              <div className="space-y-2 mt-2">
                {existingHomeLoans.map((payment, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-1">
                      <NumericField
                        id={`home-loan-${idx}`}
                        label={`Mortgage ${idx + 1} Monthly Repayment`}
                        value={payment}
                        onChange={(val) => handleUpdateItem(setExistingHomeLoans, idx, val)}
                        onErrorChange={(err) => handleFieldError(`home-loan-${idx}`, err)}
                        prefix="$"
                        isCurrency={true}
                        suffix="/ month"
                        min={0}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setExistingHomeLoans, idx, 'home-loan')}
                      aria-label={`Remove Mortgage ${idx + 1}`}
                      className="mt-6 p-2 text-slate hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Personal loans and hire purchases */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-sm font-semibold text-navy block">
                  Personal loans &amp; car finance
                </label>
                <span className="text-xs text-slate">
                  Monthly repayments on vehicle loans, personal loans, or hire purchases.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAddItem(setPersonalLoans)}
                className="text-xs font-semibold text-teal hover:text-white bg-teal/10 hover:bg-teal border border-teal/30 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 flex items-center gap-1"
              >
                + Add loan
              </button>
            </div>

            {personalLoans.length === 0 ? (
              <p className="text-xs text-slate italic bg-light-bg p-3 rounded-lg border border-dashed border-border">
                No personal or car loans added.
              </p>
            ) : (
              <div className="space-y-2 mt-2">
                {personalLoans.map((payment, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-1">
                      <NumericField
                        id={`personal-loan-${idx}`}
                        label={`Loan ${idx + 1} Monthly Repayment`}
                        value={payment}
                        onChange={(val) => handleUpdateItem(setPersonalLoans, idx, val)}
                        onErrorChange={(err) => handleFieldError(`personal-loan-${idx}`, err)}
                        prefix="$"
                        isCurrency={true}
                        suffix="/ month"
                        min={0}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setPersonalLoans, idx, 'personal-loan')}
                      aria-label={`Remove Loan ${idx + 1}`}
                      className="mt-6 p-2 text-slate hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. Other liabilities */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-sm font-semibold text-navy block">
                  Other monthly liabilities
                </label>
                <span className="text-xs text-slate">
                  Ongoing commitments like ATO payment plans or overdrafts.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAddItem(setOtherLiabilities)}
                className="text-xs font-semibold text-teal hover:text-white bg-teal/10 hover:bg-teal border border-teal/30 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 flex items-center gap-1"
              >
                + Add liability
              </button>
            </div>

            {otherLiabilities.length === 0 ? (
              <p className="text-xs text-slate italic bg-light-bg p-3 rounded-lg border border-dashed border-border">
                No other ongoing liabilities added.
              </p>
            ) : (
              <div className="space-y-2 mt-2">
                {otherLiabilities.map((payment, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-1">
                      <NumericField
                        id={`other-liability-${idx}`}
                        label={`Liability ${idx + 1} Monthly Repayment`}
                        value={payment}
                        onChange={(val) => handleUpdateItem(setOtherLiabilities, idx, val)}
                        onErrorChange={(err) => handleFieldError(`other-liability-${idx}`, err)}
                        prefix="$"
                        isCurrency={true}
                        suffix="/ month"
                        min={0}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setOtherLiabilities, idx, 'other-liability')}
                      aria-label={`Remove Liability ${idx + 1}`}
                      className="mt-6 p-2 text-slate hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 8 & 9. Interest Rate & Loan Term */}
          <div className="pt-2 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumericField
              id="interest-rate"
              label="Interest rate"
              value={interestRatePercent}
              onChange={setInterestRatePercent}
              onErrorChange={(err) => handleFieldError('interest-rate', err)}
              suffix="%"
              step={0.05}
              min={0.1}
              max={15}
              helpText="Expected annual loan rate."
            />

            <NumericField
              id="loan-term"
              label="Loan term"
              value={termYears}
              onChange={setTermYears}
              onErrorChange={(err) => handleFieldError('loan-term', err)}
              suffix="years"
              step={1}
              min={5}
              max={30}
              helpText="Term in years (standard is 30 years)."
            />
          </div>
        </div>

        {/* Collapsible Assumptions Panel */}
        <AssumptionsPanel />
      </div>

      {/* Right Column: Results Area */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
        <ResultCard
          warningNotice={
            isFormValid ? (
              <div className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 text-teal shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  Lenders usually apply their own minimum living-expense benchmark, which may be higher than the figure you entered. Your actual borrowing power could be lower.
                </span>
              </div>
            ) : undefined
          }
        >
          {!isFormValid ? (
            <div className="py-6 px-1 text-center sm:text-left space-y-3">
              <div className="p-5 bg-light-bg rounded-2xl border border-dashed border-border flex flex-col items-center sm:items-start gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-navy leading-relaxed">
                  Enter your income and living expenses to see an estimate.
                </p>
                <p className="text-xs text-slate">
                  Please provide your before-tax income and monthly living expenses to calculate your borrowing capacity.
                </p>
              </div>
            </div>
          ) : result.hasSurplus && result.maxLoanRounded > 0 ? (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">
                  You could borrow approximately
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                  {formatAUD(result.maxLoanRounded)}
                </div>
              </div>

              <div className="p-4 bg-light-bg rounded-xl border border-border space-y-1">
                <span className="text-xs text-slate block">
                  Estimated monthly repayment (at {interestRatePercent.toFixed(2)}%)
                </span>
                <div className="text-2xl font-bold text-navy">
                  {formatAUD(Math.round(result.monthlyRepayment))}
                  <span className="text-sm font-sans font-normal text-slate ml-1">/ month</span>
                </div>
                <span className="text-[11px] text-slate block">
                  Principal &amp; Interest repayment over {termYears} years.
                </span>
              </div>

              {/* Assessment Breakdown Line */}
              <div className="text-xs text-slate space-y-1.5 pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span>Assessment rate (rate + 3% buffer):</span>
                  <strong className="text-navy">
                    {(result.assessmentRate * 100).toFixed(2)}%
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Net Monthly Income:</span>
                  <strong className="text-navy">
                    {formatAUD(Math.round(result.netMonthlyIncome))} / mo
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Net Monthly Surplus:</span>
                  <strong className="text-navy">
                    {formatAUD(Math.round(result.surplus))} / mo
                  </strong>
                </div>
              </div>

              {/* Loan Balance Amortisation Chart */}
              <LoanBalanceChart data={scheduleData} termYears={termYears} />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">
                  You could borrow approximately
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                  $0
                </div>
              </div>

              <div className="p-4 bg-light-bg rounded-xl border border-border text-sm text-slate leading-relaxed">
                Based on the details you&apos;ve entered, there isn&apos;t enough monthly surplus to support a new loan. Speak to Farid about your options.
              </div>

              <div className="text-xs text-slate space-y-1.5 pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span>Net Monthly Income:</span>
                  <strong className="text-navy">
                    {formatAUD(Math.max(0, Math.round(result.netMonthlyIncome)))} / mo
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Commitments &amp; Expenses:</span>
                  <strong className="text-navy">
                    {formatAUD(Math.round(result.commitments + livingExpenses))} / mo
                  </strong>
                </div>
              </div>
            </div>
          )}
        </ResultCard>
      </div>
    </div>
  );
}
