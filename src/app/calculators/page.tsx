"use client";

import React, { useState, useEffect } from 'react';
import BorrowingPowerTab from '@/components/calculators/BorrowingPowerTab';
import RepaymentsTab from '@/components/calculators/RepaymentsTab';
import StampDutyTab from '@/components/calculators/StampDutyTab';

type CalculatorTabId = 'borrowing-power' | 'repayments' | 'stamp-duty';

interface TabDefinition {
  id: CalculatorTabId;
  label: string;
  sublabel: string;
}

const TABS: TabDefinition[] = [
  {
    id: 'borrowing-power',
    label: 'Borrowing Power',
    sublabel: 'How much can I borrow?',
  },
  {
    id: 'repayments',
    label: 'Repayments',
    sublabel: 'What will I pay?',
  },
  {
    id: 'stamp-duty',
    label: 'Stamp Duty',
    sublabel: 'What are the upfront costs?',
  },
];

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<CalculatorTabId>('borrowing-power');

  // Sync tab with URL hash on mount and hashchange
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '') as CalculatorTabId;
      if (hash === 'borrowing-power' || hash === 'repayments' || hash === 'stamp-duty') {
        setActiveTab(hash);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const handleSelectTab = (tabId: CalculatorTabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tabId}`);
    }
  };

  return (
    <div className="bg-light-bg min-h-screen py-10 sm:py-14 lg:py-18">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header intro */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal/10 text-teal mb-3">
            <span>Online Finance Estimators</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Calculate your mortgage numbers.
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate leading-relaxed">
            Estimate your borrowing capacity, loan repayments, and state government duties in seconds. All calculations run privately in your browser with zero data stored.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div
            role="tablist"
            aria-label="Mortgage Calculators"
            className="flex flex-col sm:flex-row bg-white p-1.5 rounded-xl border border-border shadow-xs gap-1 sm:gap-2"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex-1 text-left sm:text-center py-3 px-4 rounded-lg transition-all cursor-pointer flex flex-col justify-center items-start sm:items-center ${
                    isActive
                      ? 'bg-teal text-white shadow-sm hover:bg-teal-light'
                      : 'text-navy hover:text-teal hover:bg-teal/5'
                  }`}
                >
                  <span className="font-semibold text-sm sm:text-base tracking-tight">
                    {tab.label}
                  </span>
                  <span
                    className={`text-xs mt-0.5 ${
                      isActive ? 'text-white/90' : 'text-slate'
                    }`}
                  >
                    {tab.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panels */}
        <main className="w-full">
          <div
            id="panel-borrowing-power"
            role="tabpanel"
            aria-labelledby="tab-borrowing-power"
            hidden={activeTab !== 'borrowing-power'}
          >
            {activeTab === 'borrowing-power' && <BorrowingPowerTab />}
          </div>

          <div
            id="panel-repayments"
            role="tabpanel"
            aria-labelledby="tab-repayments"
            hidden={activeTab !== 'repayments'}
          >
            {activeTab === 'repayments' && <RepaymentsTab />}
          </div>

          <div
            id="panel-stamp-duty"
            role="tabpanel"
            aria-labelledby="tab-stamp-duty"
            hidden={activeTab !== 'stamp-duty'}
          >
            {activeTab === 'stamp-duty' && <StampDutyTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
