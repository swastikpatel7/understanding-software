interface SectionDividerProps {
  variant?: "default" | "gradient" | "technical";
  label?: string;
}

const SectionDivider = ({ variant = "default", label }: SectionDividerProps) => {
  return (
    <div className="w-full py-8 overflow-hidden relative" aria-hidden="true">
      {/* Main divider line */}
      <div className="relative container mx-auto px-8 md:px-16">
        <svg
          className="w-full h-4"
          viewBox="0 0 1200 16"
          preserveAspectRatio="none"
        >
          {/* Left terminus */}
          <g className="text-primary/30">
            <rect x="0" y="6" width="2" height="4" fill="currentColor" />
            <rect x="4" y="7" width="1" height="2" fill="currentColor" />
          </g>

          {/* Animated dashed line with varying opacity */}
          {Array.from({ length: 58 }).map((_, i) => {
            const isCenter = i >= 27 && i <= 31;
            const distanceFromCenter = Math.abs(i - 29);
            const opacity = isCenter ? 0 : Math.min(1, distanceFromCenter / 10);

            return (
              <rect
                key={i}
                x={20 + i * 20}
                y="7"
                width="12"
                height="2"
                className="fill-primary animate-pulse-subtle"
                style={{
                  animationDelay: `${i * 0.03}s`,
                  opacity: variant === "gradient" ? opacity * 0.6 + 0.2 : 0.4
                }}
              />
            );
          })}

          {/* Right terminus */}
          <g className="text-primary/30">
            <rect x="1194" y="7" width="1" height="2" fill="currentColor" />
            <rect x="1198" y="6" width="2" height="4" fill="currentColor" />
          </g>

          {/* Center node (if technical variant) */}
          {variant === "technical" && (
            <g className="text-primary/40">
              <circle cx="600" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="600" cy="8" r="1" fill="currentColor" className="animate-pulse-subtle" />
            </g>
          )}
        </svg>

        {/* Optional center label */}
        {label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background px-3 font-mono text-[9px] text-primary/40 tracking-[0.3em] uppercase">
              {label}
            </span>
          </div>
        )}

        {/* Subtle corner marks at ends */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 -translate-x-2">
          <svg width="8" height="8" className="text-primary/15">
            <path d="M0 8 L0 0 L8 0" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 translate-x-2">
          <svg width="8" height="8" className="text-primary/15">
            <path d="M0 0 L8 0 L8 8" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Subtle gradient fade effect */}
      {variant === "gradient" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.02) 50%, transparent 100%)"
          }}
        />
      )}
    </div>
  );
};

export default SectionDivider;
