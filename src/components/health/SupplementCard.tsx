import { ChevronDown, ExternalLink } from "lucide-react";
import type { Supplement } from "@/data/health-data";

interface SupplementCardProps {
  supplement: Supplement;
  isExpanded: boolean;
  onClick: () => void;
}

const SupplementCard = ({ supplement, isExpanded, onClick }: SupplementCardProps) => {
  const gradeColor = {
    Strong: "bg-primary/20 text-primary border-primary/30",
    Moderate: "bg-secondary text-secondary-foreground border-secondary",
    Weak: "bg-muted text-muted-foreground border-muted",
    "None/Insufficient": "bg-destructive/10 text-destructive border-destructive/30",
  }[supplement.evidenceGrade] || "bg-muted text-muted-foreground border-muted";

  return (
    <div
      className={`border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:border-primary/50 ${
        isExpanded ? "ring-1 ring-primary/30" : ""
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm text-primary uppercase tracking-wide truncate">
              {supplement.name}
            </h3>
            <p className="font-mono text-[10px] text-muted-foreground">
              {supplement.brand}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider border ${gradeColor}`}>
              {supplement.evidenceGrade}
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </div>
        </div>
        
        <p className="font-body text-sm text-muted-foreground line-clamp-2">
          {supplement.keyMechanism}
        </p>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase">Dose</p>
            <p className="font-mono text-xs text-foreground">{supplement.userDose}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase">Status</p>
            <p className={`font-mono text-xs ${
              supplement.doseStatus === "meets" ? "text-primary" :
              supplement.doseStatus === "exceeds" ? "text-primary" :
              "text-muted-foreground"
            }`}>
              {supplement.doseStatus === "meets" ? "✓ Optimal" :
               supplement.doseStatus === "exceeds" ? "↑ High" :
               "↓ Below optimal"}
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border/30 p-4 space-y-4 animate-fade-in">
          {/* Ingredients */}
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
              Active Ingredients
            </p>
            <div className="space-y-1">
              {supplement.ingredients.map((ing, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="font-body text-sm text-foreground">{ing.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence-backed range */}
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
              Evidence-Backed Range
            </p>
            <p className="font-mono text-sm text-foreground">{supplement.evidenceRange}</p>
          </div>

          {/* Benefits */}
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
              Primary Benefits
            </p>
            <div className="flex flex-wrap gap-1">
              {supplement.benefits.map((benefit, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary font-mono text-[10px] uppercase">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Risks */}
          {supplement.risks.length > 0 && (
            <div>
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                Safety Considerations
              </p>
              <ul className="space-y-1">
                {supplement.risks.map((risk, idx) => (
                  <li key={idx} className="font-body text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Source Link */}
          {supplement.sourceUrl && (
            <a
              href={supplement.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
            >
              View Product <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default SupplementCard;
