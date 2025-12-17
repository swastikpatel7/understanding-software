import { useEffect, useState } from "react";

interface FloatingGridOverlayProps {
  className?: string;
}

/**
 * A subtle isometric grid overlay that adds depth
 * and technical precision to sections.
 */
const FloatingGridOverlay = ({ className = "" }: FloatingGridOverlayProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle perspective grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="perspective-grid"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <line
              x1="0"
              y1="25"
              x2="100"
              y2="25"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            <line
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            <line
              x1="0"
              y1="75"
              x2="100"
              y2="75"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            {/* Vertical lines */}
            <line
              x1="25"
              y1="0"
              x2="25"
              y2="100"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="100"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            <line
              x1="75"
              y1="0"
              x2="75"
              y2="100"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#perspective-grid)" />
      </svg>

      {/* Dynamic highlight that follows cursor */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full transition-all duration-[2000ms] ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(var(--primary) / 0.015) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default FloatingGridOverlay;
