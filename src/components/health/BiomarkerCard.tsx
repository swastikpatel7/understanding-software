import type { Biomarker } from "@/data/health-data";

interface BiomarkerCardProps {
  biomarker: Biomarker;
}

const BiomarkerCard = ({ biomarker }: BiomarkerCardProps) => {
  return (
    <div className="border border-border/50 bg-card/30 backdrop-blur-sm p-4">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-sm text-primary uppercase tracking-wide">
          {biomarker.name}
        </h3>
        <span className="px-2 py-0.5 bg-secondary text-secondary-foreground font-mono text-[10px] uppercase tracking-wider">
          {biomarker.cadence}
        </span>
      </div>
      
      <p className="font-body text-sm text-foreground mb-3">
        {biomarker.rationale}
      </p>
      
      <div className="border-t border-border/30 pt-3 mt-3">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
          Optimal Range
        </p>
        <p className="font-mono text-sm text-primary">{biomarker.optimalRange}</p>
      </div>
      
      <div className="mt-3">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
          Related Supplements
        </p>
        <div className="flex flex-wrap gap-1">
          {biomarker.relatedSupplements.map((supp, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary font-mono text-[10px]">
              {supp}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiomarkerCard;
