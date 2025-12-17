interface GeometricAccentsProps {
  variant?: 'corners' | 'grid' | 'diagonal' | 'hexagon' | 'circuit';
  className?: string;
}

export default function GeometricAccents({
  variant = 'corners',
  className = '',
}: GeometricAccentsProps) {
  const variants: Record<string, JSX.Element> = {
    corners: (
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Top-left corner bracket */}
        <path
          d="M0 15 L0 0 L15 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/10"
        />
        {/* Top-right corner bracket */}
        <path
          d="M100 15 L100 0 L85 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/10"
        />
        {/* Bottom-left corner bracket */}
        <path
          d="M0 85 L0 100 L15 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/10"
        />
        {/* Bottom-right corner bracket */}
        <path
          d="M100 85 L100 100 L85 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/10"
        />

        {/* Inner registration marks */}
        <circle cx="50" cy="5" r="0.5" className="fill-primary/10" />
        <circle cx="50" cy="95" r="0.5" className="fill-primary/10" />
        <circle cx="5" cy="50" r="0.5" className="fill-primary/10" />
        <circle cx="95" cy="50" r="0.5" className="fill-primary/10" />
      </svg>
    ),

    diagonal: (
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="diagonal-lines"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="20"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
      </svg>
    ),

    hexagon: (
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="hexagons"
            patternUnits="userSpaceOnUse"
            width="50"
            height="43.4"
          >
            <path
              d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    ),

    grid: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.015]">
        <defs>
          <pattern
            id="tech-grid"
            patternUnits="userSpaceOnUse"
            width="40"
            height="40"
          >
            <path
              d="M40 0 L0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            <circle cx="0" cy="0" r="1" className="fill-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>
    ),

    circuit: (
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Circuit traces */}
        <path
          d="M0 50 H30 V80 H60 V50 H100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <path
          d="M100 50 H140 V100 H170 V70 H200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <path
          d="M50 150 H80 V120 H120 V150 H150"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />

        {/* Junction nodes */}
        <circle cx="30" cy="50" r="2" className="fill-primary/30" />
        <circle cx="60" cy="80" r="2" className="fill-primary/30" />
        <circle cx="100" cy="50" r="2" className="fill-primary/30" />
        <circle cx="140" cy="100" r="2" className="fill-primary/30" />
        <circle cx="80" cy="120" r="2" className="fill-primary/30" />
        <circle cx="120" cy="150" r="2" className="fill-primary/30" />
      </svg>
    ),
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {variants[variant]}
    </div>
  );
}
