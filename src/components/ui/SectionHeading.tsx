interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const textColor = light ? "text-white" : "text-navy";
  const subtitleColor = light ? "text-white/70" : "text-slate";

  return (
    <div className={`max-w-3xl mb-12 ${alignment}`}>
      {eyebrow && (
        <p className={`font-bold text-xs tracking-[0.2em] uppercase mb-3 ${light ? 'text-white' : 'text-navy'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-fluid-h2 font-bold ${textColor} mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-fluid-body ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
