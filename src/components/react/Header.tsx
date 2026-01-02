import { useState } from "react";
import { AVAILABLE_LAYERS } from "@/content/layers";

interface HeaderProps {
  currentPath?: string;
}

const Header = ({ currentPath = "/" }: HeaderProps) => {
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const availableLayers = AVAILABLE_LAYERS;
  const isLayerRoute = currentPath.startsWith("/layer");

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/" && !isLayerRoute;
    }
    return currentPath.startsWith(path);
  };

  return (
    <header className="relative z-10 px-8 md:px-16 pt-12 pb-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <a href="/" className="inline-block">
            <h1 className="text-2xl md:text-4xl font-display text-primary tracking-wider">
              CODE BLUEPRINT
            </h1>
          </a>
          <p className="max-w-xl text-sm md:text-base text-muted-foreground font-body italic">
            An engineering blueprint—from transistors to transformers.
          </p>
        </div>

        <nav className="flex items-center gap-6 md:justify-end">
          <a
            href="/"
            className={[
              "font-mono text-xs uppercase tracking-widest transition-colors",
              isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary",
            ].join(" ")}
          >
            Home
          </a>

          {/* Layers dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLayersOpen(!isLayersOpen)}
              onBlur={() => setTimeout(() => setIsLayersOpen(false), 150)}
              className={[
                "font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-1",
                isLayerRoute ? "text-primary" : "text-muted-foreground hover:text-primary",
              ].join(" ")}
            >
              Layers
              <svg
                className={`w-3 h-3 transition-transform ${isLayersOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLayersOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-border shadow-lg">
                <div className="py-2">
                  <p className="px-4 py-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Available
                  </p>
                  {availableLayers.map((layer) => (
                    <a
                      key={layer.slug}
                      href={`/layer/${layer.slug}`}
                      className="block px-4 py-2 hover:bg-primary/5 transition-colors"
                    >
                      <span className="font-mono text-xs text-primary">{layer.number}.</span>
                      <span className="font-body text-sm ml-2">{layer.title}</span>
                    </a>
                  ))}
                  <div className="border-t border-border my-2" />
                  <p className="px-4 py-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Coming Soon
                  </p>
                  <p className="px-4 py-2 font-mono text-xs text-muted-foreground">
                    8 more layers in development
                  </p>
                </div>
              </div>
            )}
          </div>

          <a
            href="/health"
            className={[
              "font-mono text-xs uppercase tracking-widest transition-colors",
              isActive("/health") ? "text-primary" : "text-muted-foreground hover:text-primary",
            ].join(" ")}
          >
            Health
          </a>

          <a
            href="/about"
            className={[
              "font-mono text-xs uppercase tracking-widest transition-colors",
              isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-primary",
            ].join(" ")}
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
