import Link from "next/link";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
}

export default function Card({
  icon,
  title,
  description,
  href,
  linkText = "Learn more",
}: CardProps) {
  return (
    <div className="group bg-transparent p-4 flex flex-col items-center text-center transition-all duration-300">
      {icon && (
        <div className="flex items-center justify-center text-navy mb-5 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      )}
      <h3 className="text-base sm:text-lg font-bold text-navy mb-3 px-2 leading-snug whitespace-pre-line">{title}</h3>
      <p className="text-slate text-[11px] leading-relaxed mb-6">{description}</p>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center text-navy font-bold text-sm hover:text-navy-light transition-colors group-hover:gap-2 gap-1 mt-auto"
        >
          {linkText}
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      )}
    </div>
  );
}
