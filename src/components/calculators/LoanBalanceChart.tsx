"use client";

import React, { useState } from 'react';
import { formatAUD } from '@/lib/calculators/settings';

interface DataPoint {
  year: number;
  balance: number;
}

interface LoanBalanceChartProps {
  data: DataPoint[];
  termYears: number;
  title?: string;
}

export default function LoanBalanceChart({
  data,
  termYears,
  title = 'Projected Loan Balance Over Time',
}: LoanBalanceChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0 || data[0].balance <= 0) {
    return (
      <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-6 text-center text-sm text-[#51606F]">
        Enter loan details above to view your amortisation balance projection.
      </div>
    );
  }

  const initialBalance = data[0].balance;
  const width = 500;
  const height = 200;
  const padding = { top: 20, right: 24, bottom: 35, left: 55 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Map data to SVG points
  const points = data.map((d, index) => {
    const x = padding.left + (index / (data.length - 1)) * plotWidth;
    const yRatio = initialBalance > 0 ? d.balance / initialBalance : 0;
    const y = padding.top + (1 - yRatio) * plotHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${(padding.top + plotHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padding.top + plotHeight).toFixed(1)} Z`;

  // X axis tick markers (every 5 or 10 years depending on term)
  const step = termYears <= 15 ? 5 : 10;
  const xTicks: number[] = [0];
  for (let y = step; y < termYears; y += step) {
    xTicks.push(y);
  }
  if (!xTicks.includes(termYears)) {
    xTicks.push(termYears);
  }

  // Active hover point
  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
          {title}
        </h4>
        <span className="text-xs text-slate">
          Principal &amp; Interest
        </span>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          role="img"
          aria-label={`Amortisation balance chart showing initial loan of ${formatAUD(initialBalance)} reducing to zero over ${termYears} years`}
        >
          <title>{title}</title>
          <desc>
            Line chart indicating remaining mortgage balance reducing steadily from {formatAUD(initialBalance)} at year 0 to $0 at year {termYears}.
          </desc>

          <defs>
            <linearGradient id="balanceAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#112A46" stopOpacity="0.25" />
              <stop offset="90%" stopColor="#13A3B5" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={width - padding.right}
            y2={padding.top}
            stroke="#E2E8F0"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={padding.top + plotHeight / 2}
            x2={width - padding.right}
            y2={padding.top + plotHeight / 2}
            stroke="#E2E8F0"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={width - padding.right}
            y2={padding.top + plotHeight}
            stroke="#CBD5E1"
            strokeWidth="1"
          />

          {/* Y Axis labels */}
          <text
            x={padding.left - 8}
            y={padding.top + 4}
            textAnchor="end"
            className="text-[10px] fill-slate font-mono"
          >
            {formatAUD(initialBalance)}
          </text>
          <text
            x={padding.left - 8}
            y={padding.top + plotHeight / 2 + 3}
            textAnchor="end"
            className="text-[10px] fill-slate font-mono"
          >
            {formatAUD(Math.round(initialBalance / 2))}
          </text>
          <text
            x={padding.left - 8}
            y={padding.top + plotHeight + 3}
            textAnchor="end"
            className="text-[10px] fill-slate font-mono"
          >
            $0
          </text>

          {/* Area fill */}
          <path d={areaD} fill="url(#balanceAreaGrad)" />

          {/* Line stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#112A46"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X Axis ticks and labels */}
          {xTicks.map((yr) => {
            const xPos = padding.left + (yr / termYears) * plotWidth;
            return (
              <g key={yr}>
                <line
                  x1={xPos}
                  y1={padding.top + plotHeight}
                  x2={xPos}
                  y2={padding.top + plotHeight + 5}
                  stroke="#94A3B8"
                />
                <text
                  x={xPos}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  className="text-[11px] fill-slate font-sans"
                >
                  Yr {yr}
                </text>
              </g>
            );
          })}

          {/* Active hover crosshair and point */}
          {activePoint && (
            <g pointerEvents="none">
              <line
                x1={activePoint.x}
                y1={padding.top}
                x2={activePoint.x}
                y2={padding.top + plotHeight}
                stroke="#13A3B5"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5.5"
                fill="#13A3B5"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Transparent touch/hover overlay zones */}
          {points.map((p, i) => {
            const colWidth = plotWidth / (points.length - 1);
            return (
              <rect
                key={i}
                x={p.x - colWidth / 2}
                y={padding.top}
                width={colWidth}
                height={plotHeight}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                onTouchStart={() => setHoverIndex(i)}
                className="cursor-crosshair"
              />
            );
          })}
        </svg>

        {/* Hover readout tooltip */}
        {activePoint ? (
          <div className="mt-2.5 flex items-center justify-between px-3 py-1.5 bg-light-bg rounded-md border border-border text-xs">
            <span className="text-slate">
              Year <strong className="text-navy">{activePoint.year}</strong> of {termYears}:
            </span>
            <span className="font-semibold text-navy">
              Remaining balance: {formatAUD(activePoint.balance)}
            </span>
          </div>
        ) : (
          <p className="mt-2 text-center text-[11px] text-slate">
            Hover or tap along the curve to inspect remaining loan balance by year.
          </p>
        )}
      </div>
    </div>
  );
}
