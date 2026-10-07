import Link from "next/link";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Main Footer */}
      <div className="bg-white text-navy">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
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
              <p className="text-sm text-slate leading-relaxed mb-5">
                As a nationwide brokerage, we make it easy to connect with a dedicated lending expert using our secure online form.
              </p>
              
              <div className="mb-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-navy mb-3">Follow us on</p>
                <div className="flex gap-4">
                  {/* FB */}
                  <a href="#" className="text-slate hover:text-[#13A3B5] transition-colors" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a>
                  {/* Insta */}
                  <a href="#" className="text-slate hover:text-[#13A3B5] transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="#" className="text-slate hover:text-[#13A3B5] transition-colors" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  {/* X */}
                  <a href="#" className="text-slate hover:text-[#13A3B5] transition-colors" aria-label="X (Twitter)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </div>

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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
