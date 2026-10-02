export default function AwardBanner() {
  return (
    <section className="py-16 bg-light-bg border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Placeholder — real award/certification asset to be supplied by client */}
        <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-8 py-6 shadow-sm border border-border">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.848m0 0a6.023 6.023 0 01-2.77-.848" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-navy">
              Award-Winning Mortgage Brokerage
            </p>
            <p className="text-xs text-slate mt-1">
              Proudly serving Australian homeowners with expert guidance and
              competitive rates from 50+ lenders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
