"use client";

import React, { useState, useMemo } from 'react';
import NumericField from './NumericField';
import ResultCard from './ResultCard';
import { formatAUD } from '@/lib/calculators/settings';
import { STAMP_DUTY_DATA } from '@/lib/calculators/stamp-duty-data';
import { stampDuty } from '@/lib/calculators/finance';

const AUSTRALIAN_STATES_LIST = [
  { code: 'NSW', label: 'New South Wales' },
  { code: 'VIC', label: 'Victoria' },
  { code: 'QLD', label: 'Queensland' },
  { code: 'WA', label: 'Western Australia' },
  { code: 'SA', label: 'South Australia' },
  { code: 'TAS', label: 'Tasmania' },
  { code: 'ACT', label: 'Australian Capital Territory' },
  { code: 'NT', label: 'Northern Territory' },
] as const;

type StateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

export default function StampDutyTab() {
  const [state, setState] = useState<StateCode>('NSW');
  const [propertyPrice, setPropertyPrice] = useState<number>(750000);
  const [propertyType, setPropertyType] = useState<'established' | 'new' | 'land'>('established');
  const [usage, setUsage] = useState<'primary' | 'investment'>('primary');
  const [firstHomeBuyer, setFirstHomeBuyer] = useState<boolean>(false);

  const result = useMemo(() => {
    return stampDuty({
      state,
      propertyPrice,
      propertyType,
      usage,
      firstHomeBuyer,
    });
  }, [state, propertyPrice, propertyType, usage, firstHomeBuyer]);

  const currentStateInfo = STAMP_DUTY_DATA[state];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          {/* State / Territory */}
          <div>
            <label htmlFor="stamp-duty-state" className="block text-sm font-semibold text-navy mb-2">
              State or territory
            </label>
            <select
              id="stamp-duty-state"
              value={state}
              onChange={(e) => setState(e.target.value as StateCode)}
              className="w-full bg-white text-navy text-base rounded-lg border border-border py-2.5 px-3.5 outline-none font-medium hover:border-teal/60 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors"
            >
              {AUSTRALIAN_STATES_LIST.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.label} ({st.code})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate mt-1.5">
              Select the Australian state or territory where the property is located.
            </p>
          </div>

          {/* Property Price */}
          <NumericField
            id="stamp-duty-price"
            label="Property price"
            value={propertyPrice}
            onChange={setPropertyPrice}
            prefix="$"
            isCurrency={true}
            required={true}
            min={1000}
            step={10000}
            helpText="Agreed purchase price or contract value."
          />

          {/* What are you buying? */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              What are you buying?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="What are you buying">
              {[
                { key: 'established' as const, label: 'Established home' },
                { key: 'new' as const, label: 'New / Off-the-plan' },
                { key: 'land' as const, label: 'Vacant land' },
              ].map((pt) => (
                <button
                  key={pt.key}
                  type="button"
                  role="radio"
                  aria-checked={propertyType === pt.key}
                  onClick={() => setPropertyType(pt.key)}
                  className={`py-3 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all border text-center cursor-pointer ${
                    propertyType === pt.key
                      ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                      : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate mt-1.5">
              Concessions and exemptions vary depending on property construction status.
            </p>
          </div>

          {/* Will you live in it or is it an investment? */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Will you live in it or is it an investment?
            </label>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Property usage">
              <button
                type="button"
                role="radio"
                aria-checked={usage === 'primary'}
                onClick={() => setUsage('primary')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all border text-center cursor-pointer ${
                  usage === 'primary'
                    ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                    : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                }`}
              >
                Live in it (Home)
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={usage === 'investment'}
                onClick={() => {
                  setUsage('investment');
                  setFirstHomeBuyer(false); // FHB concessions generally require owner-occupancy
                }}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all border text-center cursor-pointer ${
                  usage === 'investment'
                    ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                    : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                }`}
              >
                Investment
              </button>
            </div>
          </div>

          {/* Are you a first home buyer? */}
          {usage === 'primary' && (
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Are you a first home buyer?
              </label>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="First home buyer status">
                <button
                  type="button"
                  role="radio"
                  aria-checked={firstHomeBuyer}
                  onClick={() => setFirstHomeBuyer(true)}
                  className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all border text-center cursor-pointer ${
                    firstHomeBuyer
                      ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                      : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                  }`}
                >
                  Yes, first home buyer
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={!firstHomeBuyer}
                  onClick={() => setFirstHomeBuyer(false)}
                  className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all border text-center cursor-pointer ${
                    !firstHomeBuyer
                      ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-light'
                      : 'bg-white text-navy border-border hover:border-teal hover:text-teal'
                  }`}
                >
                  No, have owned before
                </button>
              </div>
              <p className="text-xs text-slate mt-1.5">
                First home buyers may qualify for full or partial duty exemptions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Results */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
        <ResultCard
          warningNotice={
            <div>
              Duty only. Registration and transfer fees and any foreign buyer surcharge are not included.
            </div>
          }
        >
          {result.isComingSoon ? (
            /* Coming Soon State: NEVER displays a number while TODO_VERIFY placeholders exist */
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal/10 text-teal border border-teal/20">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
                Official Rate Verification in Progress
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">
                  Estimated Stamp Duty ({state})
                </span>
                <div className="text-3xl font-bold text-navy">
                  Coming soon
                </div>
              </div>

              <div className="p-4 bg-light-bg rounded-xl border border-border space-y-2 text-xs text-slate leading-relaxed">
                <p>
                  To ensure complete accuracy, stamp duty rates and statutory concessions for{' '}
                  <strong className="text-navy">{currentStateInfo?.name || state}</strong> are currently undergoing verified review against official revenue office publications.
                </p>
                <p>
                  Speak to Farid about your upfront costs for a personalised calculation.
                </p>
              </div>

              <div className="text-[11px] text-slate pt-2 border-t border-border space-y-1">
                <div className="flex justify-between">
                  <span>Official Revenue Authority:</span>
                  <a
                    href={currentStateInfo?.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal hover:underline"
                  >
                    Official Portal ↗
                  </a>
                </div>
                {process.env.NODE_ENV !== 'production' && (
                  <div className="flex justify-between">
                    <span>Verification Status:</span>
                    <span className="font-semibold text-teal">Scheduled for verification</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Verified Output (Active once developer replaces TODO_VERIFY markers) */
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate block mb-1">
                  Estimated Government Stamp Duty
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                  {formatAUD(result.totalPayable ?? 0)}
                </div>
              </div>

              <div className="p-4 bg-light-bg rounded-xl border border-border space-y-2 text-xs text-slate">
                <div className="flex justify-between">
                  <span>Standard Transfer Duty:</span>
                  <strong className="text-navy">{formatAUD(result.standardDuty ?? 0)}</strong>
                </div>
                {(result.concessionAmount ?? 0) > 0 && (
                  <div className="flex justify-between text-teal">
                    <span>First Home Concession Applied:</span>
                    <strong>-{formatAUD(result.concessionAmount ?? 0)}</strong>
                  </div>
                )}
                <div className="pt-2 border-t border-border flex justify-between font-semibold text-sm text-navy">
                  <span>Total Payable:</span>
                  <span>{formatAUD(result.totalPayable ?? 0)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate pt-2 border-t border-border">
                Rates as at {result.asAt}
              </div>
            </div>
          )}
        </ResultCard>
      </div>
    </div>
  );
}
