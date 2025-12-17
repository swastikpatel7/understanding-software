import { useEffect, useRef, useState } from "react";

interface CircuitPatternBackgroundProps {
  className?: string;
  variant?: "hero" | "philosophy" | "stack" | "roadmap";
}

/**
 * Subtle animated circuit pattern background.
 * Creates a technical blueprint feel with animated "data flow" traces.
 */
const CircuitPatternBackground = ({
  className = "",
  variant = "hero"
}: CircuitPatternBackgroundProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return {
          paths: [
            "M0,100 L80,100 L80,50 L200,50",
            "M400,0 L400,80 L300,80 L300,150",
            "M200,200 L200,160 L350,160",
          ],
          nodePositions: [
            { x: 80, y: 100 },
            { x: 200, y: 50 },
            { x: 300, y: 80 },
            { x: 350, y: 160 },
          ],
        };
      case "philosophy":
        return {
          paths: [
            "M0,50 L150,50 L150,100 L250,100",
            "M400,150 L350,150 L350,80 L280,80",
          ],
          nodePositions: [
            { x: 150, y: 50 },
            { x: 250, y: 100 },
            { x: 350, y: 150 },
          ],
        };
      case "stack":
        return {
          paths: [
            "M50,0 L50,100 L120,100",
            "M380,200 L380,120 L300,120 L300,60",
          ],
          nodePositions: [
            { x: 50, y: 100 },
            { x: 120, y: 100 },
            { x: 380, y: 120 },
            { x: 300, y: 60 },
          ],
        };
      case "roadmap":
        return {
          paths: [
            "M0,80 L100,80 L100,140 L220,140",
            "M400,60 L320,60 L320,100",
          ],
          nodePositions: [
            { x: 100, y: 80 },
            { x: 220, y: 140 },
            { x: 320, y: 60 },
          ],
        };
      default:
        return { paths: [], nodePositions: [] };
    }
  };

  const { paths, nodePositions } = getVariantStyles();

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Top-right circuit pattern */}
      <svg
        className="absolute -top-10 -right-10 w-[400px] h-[200px] opacity-[0.04]"
        viewBox="0 0 400 200"
      >
        {paths.map((path, i) => (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className={`text-primary ${isVisible ? "animate-draw-slow" : ""}`}
              style={{
                animationDelay: `${i * 0.5}s`,
                strokeDasharray: isVisible ? undefined : "1000",
                strokeDashoffset: isVisible ? undefined : "1000"
              }}
            />
          </g>
        ))}
        {nodePositions.map((pos, i) => (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r="3"
            className={`fill-primary ${isVisible ? "animate-pulse-subtle" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      {/* Bottom-left circuit pattern */}
      <svg
        className="absolute -bottom-10 -left-10 w-[350px] h-[180px] opacity-[0.03] rotate-180"
        viewBox="0 0 400 200"
      >
        {paths.slice(0, 2).map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={`text-primary ${isVisible ? "animate-draw-slow" : ""}`}
            style={{
              animationDelay: `${i * 0.7 + 1}s`,
              strokeDasharray: isVisible ? undefined : "1000",
              strokeDashoffset: isVisible ? undefined : "1000"
            }}
          />
        ))}
      </svg>

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: variant === "hero"
            ? "radial-gradient(ellipse at 80% 20%, hsl(var(--primary) / 0.02) 0%, transparent 50%)"
            : variant === "stack"
            ? "radial-gradient(ellipse at 20% 50%, hsl(var(--primary) / 0.015) 0%, transparent 40%)"
            : "none"
        }}
      />
    </div>
  );
};

export default CircuitPatternBackground;
