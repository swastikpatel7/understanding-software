import { useEffect, useState } from "react";

/**
 * Technical viewport corner marks - L-bracket decorations
 * inspired by engineering blueprints and technical schematics.
 * Adds a subtle "viewing window" frame effect.
 */
const ViewportCornerMarks = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {/* Top Left Corner */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary/20">
          <path
            d="M1 23V1H23"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </svg>
        <span className="absolute top-6 left-0 font-mono text-[8px] text-primary/30 tracking-widest">
          FIG.001
        </span>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary/20">
          <path
            d="M23 23V1H1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </svg>
        <span className="absolute top-6 right-0 font-mono text-[8px] text-primary/30 tracking-widest">
          {scrollProgress.toFixed(0)}%
        </span>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary/20">
          <path
            d="M1 1V23H23"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </svg>
        <span className="absolute -top-4 left-0 font-mono text-[8px] text-primary/30 tracking-widest">
          REV.A
        </span>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary/20">
          <path
            d="M23 1V23H1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </svg>
        <span className="absolute -top-4 right-0 font-mono text-[8px] text-primary/30 tracking-widest">
          2025
        </span>
      </div>

      {/* Subtle vertical scale on left edge */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-2 h-px bg-primary/15" />
              <span className="font-mono text-[7px] text-primary/20">{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle horizontal scale on bottom edge */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex items-center gap-12">
          {["A", "B", "C", "D", "E"].map((letter) => (
            <div key={letter} className="flex flex-col items-center gap-1">
              <div className="h-2 w-px bg-primary/15" />
              <span className="font-mono text-[7px] text-primary/20">{letter}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewportCornerMarks;
