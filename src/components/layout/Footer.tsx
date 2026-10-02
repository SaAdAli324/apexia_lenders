import Link from "next/link";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Main Footer */}
      <div className="bg-white text-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-7 xl:grid-cols-5 gap-8 lg:gap-4 xl:gap-10">
            {/* Brand Column */}
            <div className="col-span-1 min-[375px]:col-span-2 lg:col-span-2 xl:col-span-1 lg:pr-8 xl:pr-0">
              <Link href="/" className="inline-block mb-3">
                <img src="/logo.png" alt="Apexia Logo" className="h-10 md:h-12 w-auto -ml-3" />
              </Link>
              <p className="text-slate text-sm leading-relaxed pr-4">
                {BRAND.legalName} is a leading mortgage brokerage in Australia. We compare home loans, with better rates and exceptional service.
              </p>
              <div className="mt-4 text-xs text-slate-light">
                <p>Australian Credit Licence: 521 559</p>
                <p>Credit Representative Number: 522 559</p>
              </div>
            </div>

            {/* Loans Column */}
            <div className="lg:mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-4">
                LOANS
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.loans.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="lg:mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-4">
                COMPANY
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="lg:mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-4">
                RESOURCES
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-2 xl:col-span-1 lg:mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-4">
                GET IN TOUCH
              </h4>
              <p className="text-sm text-slate leading-relaxed mb-6">
                We are a fully online brokerage. Use our secure online form to get in touch with a lending expert.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-bold rounded hover:bg-navy-light transition-colors"
              >
                Send a Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60 text-center md:text-left">
              © {new Date().getFullYear()} {BRAND.legalName} trading as {BRAND.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-xs text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="text-xs text-white/60 hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link href="/complaints-policy" className="text-xs text-white/60 hover:text-white transition-colors">
                Complaints Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
