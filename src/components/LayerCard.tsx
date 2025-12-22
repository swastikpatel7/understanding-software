import { memo } from "react";
import { Link } from "react-router-dom";
import { Layer } from "@/content/layers";

interface LayerCardProps {
  layer: Layer;
  isExpanded?: boolean;
}

// Optimization: Wrapped with React.memo to prevent unnecessary re-renders when the parent
// component updates but the props for this component remain unchanged. This is
// especially beneficial when LayerCard is rendered within a list, improving overall
// rendering performance.
const LayerCard = memo(({ layer, isExpanded = false }: LayerCardProps) => {
  const isAvailable = layer.status === "available";
  const totalTopics = layer.chapters.reduce((sum, ch) => sum + ch.topicCount, 0);

  return (
    <div
      className={`relative border transition-all duration-300 ${
        isAvailable
          ? "border-primary bg-card/30 hover:bg-card/50"
          : "border-border/50 bg-card/10"
      }`}
    >
      {/* Layer number badge - engineering style */}
      <div
        className={`absolute -left-px -top-px w-12 h-12 flex items-center justify-center border-r border-b ${
          isAvailable ? "border-primary bg-primary text-primary-foreground" : "border-border/50 bg-muted/50 text-muted-foreground"
        }`}
      >
        <span className="font-mono text-lg font-medium">{layer.number}</span>
      </div>

      {/* Status indicator */}
      <div className="absolute top-3 right-4">
        {isAvailable ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available
          </span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Coming Soon
          </span>
        )}
      </div>

      <div className="pt-4 pb-6 pl-16 pr-6">
        {/* Title row */}
        <div className="flex items-baseline gap-3 mb-1">
          <h3
            className={`font-display text-lg uppercase tracking-wide ${
              isAvailable ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {layer.title}
          </h3>
        </div>

        {/* Tagline */}
        <p
          className={`font-mono text-xs italic mb-4 ${
            isAvailable ? "text-primary/70" : "text-muted-foreground/70"
          }`}
        >
          "{layer.tagline}"
        </p>

        {/* Description */}
        <p
          className={`font-body text-sm leading-relaxed mb-5 ${
            isAvailable ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {layer.description}
        </p>

        {/* Chapters grid */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Chapters
            </span>
            <div className="h-px flex-1 bg-border/50" />
            <span className="font-mono text-[10px] text-muted-foreground">
              {layer.chapters.length} chapters / {totalTopics} topics
            </span>
          </div>

          <div className={`grid gap-2 ${isExpanded ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
            {layer.chapters.map((chapter) => (
              <div
                key={chapter.slug}
                className={`flex items-center gap-2 px-3 py-2 border ${
                  isAvailable
                    ? "border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                    : "border-border/30 opacity-60"
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    isAvailable ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {chapter.number}
                </span>
                <span
                  className={`font-body text-sm truncate ${
                    isAvailable ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {chapter.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        {isAvailable && (
          <div className="mt-6 flex items-center gap-4">
            <Link
              to={`/layer/${layer.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary font-mono text-xs uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Enter Layer {layer.number}
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Technical decoration - corner markers */}
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-border/30" />
    </div>
  );
});

export default LayerCard;
