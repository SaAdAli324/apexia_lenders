"use client";

import React, { useState } from 'react';
import { CALC_SETTINGS } from '@/lib/calculators/settings';

export default function AssumptionsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white mt-6 shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="assumptions-content"
        className="w-full flex items-center justify-between px-5 py-3.5 text-left bg-light-bg hover:bg-border/60 transition-colors cursor-pointer"
      >
        <span className="text-sm font-semibold text-navy flex items-center gap-2">
          <svg
            className="w-4 h-4 text-teal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Calculation Assumptions &amp; Simplifications
        </span>
        <span className="text-xs font-medium text-slate flex items-center gap-1.5">
          {isOpen ? 'Hide details' : 'Show details'}
          <svg
            className={`w-4 h-4 text-slate transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div id="assumptions-content" className="p-5 text-xs text-slate space-y-3 bg-white border-t border-border">
          <ul className="space-y-2 list-disc list-outside pl-4 marker:text-teal">
            <li>
              <strong className="text-navy">APRA Serviceability Buffer:</strong> In line with APRA requirements, lenders test affordability at the entered interest rate plus a 3.00% serviceability buffer (confirmed by APRA 28 May 2026).
            </li>
            <li>
              <strong className="text-navy">Credit Card Limits:</strong> 3.00% of the total combined limit on all credit and store cards is counted as an ongoing monthly debt commitment.
            </li>
            <li>
              <strong className="text-navy">Tax Calculations (2026-27):</strong> Based on the 2026-27 Australian resident individual income tax brackets, with a flat 2.00% Medicare levy on all taxable income. (Note: A scheduled cut to the lowest taxed bracket applies from 1 July 2027).
            </li>
            <li>
              <strong className="text-navy">Tax Simplifications:</strong> Calculations model Australian tax residents only, without Low Income Tax Offset (LITO), HECS/HELP repayments, or tax deductions.
            </li>
            <li>
              <strong className="text-navy">Repayment Structure:</strong> Based on principal and interest (P&amp;I) repayments over the selected loan term.
            </li>
            <li>
              <strong className="text-navy">Living Expenses:</strong> Uses the exact living expense figure entered by the user. Note that individual lenders assess applications against the higher of declared expenses or benchmark figures (such as the Household Expenditure Method).
            </li>
          </ul>

          <div className="pt-2 border-t border-border text-[11px] text-slate flex justify-between items-center">
            <span>Rates and APRA regulatory policy verified.</span>
            <span className="font-semibold text-navy">Last updated: {CALC_SETTINGS.lastUpdated}</span>
          </div>
        </div>
      )}
    </div>
  );
}
