"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { CALC_SETTINGS, DISCLAIMER } from '@/lib/calculators/settings';

interface ResultCardProps {
  children: ReactNode;
  warningNotice?: ReactNode;
  showCta?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function ResultCard({
  children,
  warningNotice,
  showCta = true,
  ctaLabel = CALC_SETTINGS.ctaLabel,
  ctaHref = CALC_SETTINGS.ctaHref,
}: ResultCardProps) {
  return (
    <div
      aria-live="polite"
      className="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between"
    >
      <div className="space-y-6">
        {children}

        {warningNotice && (
          <div className="bg-light-bg border-l-4 border-teal p-4 rounded-r-lg text-xs text-slate leading-relaxed">
            {warningNotice}
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-border space-y-5">
        {showCta && (
          <Link
            href={ctaHref}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal hover:bg-teal-light text-white font-semibold text-base rounded-lg transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
          >
            {ctaLabel}
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        )}

        {/* Verbatim client-approved disclaimer */}
        <p className="text-[11px] leading-relaxed text-slate text-justify sm:text-left">
          {DISCLAIMER}
        </p>
      </div>
    </div>
  );
}
