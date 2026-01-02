import { useState } from "react";
import type { Supplement } from "@/data/health-data";

interface HealthHeroSVGProps {
  supplements: Supplement[];
  onSupplementClick: (id: string) => void;
  activeSupplementId: string | null;
}

// Biological subsystems that supplements feed into
const SUBSYSTEMS = [
  { id: "mitochondria", label: "MITOCHONDRIA", x: 400, y: 80, description: "Energy Production" },
  { id: "antioxidant", label: "ANTIOXIDANT", x: 650, y: 140, description: "Oxidative Defense" },
  { id: "inflammation", label: "INFLAMMATION", x: 650, y: 280, description: "Immune Modulation" },
  { id: "gut", label: "GUT MICROBIOME", x: 400, y: 340, description: "Nutrient Absorption" },
  { id: "neural", label: "NEURAL HEALTH", x: 150, y: 280, description: "Cognitive Function" },
  { id: "muscle", label: "MUSCLE SYNTHESIS", x: 150, y: 140, description: "Performance & Recovery" },
];

// Mapping supplements to subsystems
const SUPPLEMENT_CONNECTIONS: Record<string, string[]> = {
  "magnesium": ["mitochondria", "muscle", "neural"],
  "multivitamin": ["mitochondria", "antioxidant", "neural"],
  "fish-oil": ["inflammation", "neural", "antioxidant"],
  "longevit": ["mitochondria", "antioxidant", "inflammation"],
  "probiotic": ["gut", "inflammation", "neural"],
  "creatine": ["mitochondria", "muscle", "neural"],
  "nac-glycine": ["antioxidant", "mitochondria", "inflammation"],
};

const HealthHeroSVG = ({ supplements, onSupplementClick, activeSupplementId }: HealthHeroSVGProps) => {
  const [hoveredSubsystem, setHoveredSubsystem] = useState<string | null>(null);
  const [hoveredSupplement, setHoveredSupplement] = useState<string | null>(null);
  
  const centerX = 400;
  const centerY = 210;
  
  // Calculate supplement positions around the center
  const supplementPositions = supplements.map((supp, index) => {
    const angle = (index / supplements.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 260;
    return {
      ...supp,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });

  const getConnectionPath = (fromX: number, fromY: number, toX: number, toY: number) => {
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const offset = 20;
    return `M ${fromX} ${fromY} Q ${midX + offset} ${midY - offset} ${toX} ${toY}`;
  };

  const isConnectionActive = (suppId: string, subsystemId: string) => {
    const connections = SUPPLEMENT_CONNECTIONS[suppId] || [];
    return connections.includes(subsystemId);
  };

  const shouldHighlightConnection = (suppId: string, subsystemId: string) => {
    if (hoveredSupplement === suppId) return isConnectionActive(suppId, subsystemId);
    if (hoveredSubsystem === subsystemId) return isConnectionActive(suppId, subsystemId);
    if (activeSupplementId === suppId) return isConnectionActive(suppId, subsystemId);
    return false;
  };

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox="0 0 800 420"
        className="w-full h-auto"
        role="img"
        aria-label="Health Blueprint: Interactive diagram showing supplements and their connections to biological subsystems"
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="health-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Arrow marker */}
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="hsl(var(--primary))" opacity="0.6" />
          </marker>
        </defs>

        {/* Background grid */}
        <rect width="800" height="420" fill="url(#health-grid)" />

        {/* Connection lines */}
        {supplementPositions.map((supp) => {
          const connections = SUPPLEMENT_CONNECTIONS[supp.id] || [];
          return connections.map((subsystemId) => {
            const subsystem = SUBSYSTEMS.find(s => s.id === subsystemId);
            if (!subsystem) return null;
            
            const isHighlighted = shouldHighlightConnection(supp.id, subsystemId);
            
            return (
              <path
                key={`${supp.id}-${subsystemId}`}
                d={getConnectionPath(supp.x, supp.y, subsystem.x, subsystem.y)}
                fill="none"
                stroke={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={isHighlighted ? "none" : "4 4"}
                opacity={isHighlighted ? 1 : 0.3}
                markerEnd={isHighlighted ? "url(#arrowhead)" : undefined}
                className="transition-all duration-300"
              />
            );
          });
        })}

        {/* Central hub */}
        <circle cx={centerX} cy={centerY} r="50" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x={centerX} y={centerY - 8} textAnchor="middle" className="font-display text-[10px] fill-primary uppercase tracking-wider">
          BIOLOGICAL
        </text>
        <text x={centerX} y={centerY + 8} textAnchor="middle" className="font-display text-[10px] fill-primary uppercase tracking-wider">
          SYSTEMS
        </text>

        {/* Subsystem nodes */}
        {SUBSYSTEMS.map((subsystem) => {
          const isActive = hoveredSubsystem === subsystem.id || 
            (hoveredSupplement && isConnectionActive(hoveredSupplement, subsystem.id)) ||
            (activeSupplementId && isConnectionActive(activeSupplementId, subsystem.id));
          
          return (
            <g
              key={subsystem.id}
              onMouseEnter={() => setHoveredSubsystem(subsystem.id)}
              onMouseLeave={() => setHoveredSubsystem(null)}
              className="cursor-pointer"
            >
              <rect
                x={subsystem.x - 55}
                y={subsystem.y - 20}
                width="110"
                height="40"
                rx="2"
                fill={isActive ? "hsl(var(--primary))" : "hsl(var(--card))"}
                stroke="hsl(var(--primary))"
                strokeWidth={isActive ? 2 : 1}
                className="transition-all duration-300"
                filter={isActive ? "url(#glow)" : undefined}
              />
              <text
                x={subsystem.x}
                y={subsystem.y - 4}
                textAnchor="middle"
                className={`font-display text-[8px] uppercase tracking-wider ${isActive ? "fill-primary-foreground" : "fill-primary"}`}
              >
                {subsystem.label}
              </text>
              <text
                x={subsystem.x}
                y={subsystem.y + 10}
                textAnchor="middle"
                className={`font-mono text-[7px] ${isActive ? "fill-primary-foreground/70" : "fill-muted-foreground"}`}
              >
                {subsystem.description}
              </text>
            </g>
          );
        })}

        {/* Supplement nodes */}
        {supplementPositions.map((supp) => {
          const isActive = activeSupplementId === supp.id || hoveredSupplement === supp.id;
          const gradeOpacity = supp.evidenceGrade === "Strong" ? 1 : supp.evidenceGrade === "Moderate" ? 0.7 : 0.4;
          
          return (
            <g
              key={supp.id}
              onClick={() => onSupplementClick(supp.id)}
              onMouseEnter={() => setHoveredSupplement(supp.id)}
              onMouseLeave={() => setHoveredSupplement(null)}
              className="cursor-pointer"
              role="button"
              aria-label={`${supp.name} - ${supp.evidenceGrade} evidence`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSupplementClick(supp.id);
                }
              }}
            >
              {/* Chip background */}
              <rect
                x={supp.x - 50}
                y={supp.y - 18}
                width="100"
                height="36"
                rx="2"
                fill={isActive ? "hsl(var(--primary))" : "hsl(var(--card))"}
                stroke="hsl(var(--primary))"
                strokeWidth={isActive ? 2 : 1}
                opacity={gradeOpacity}
                className="transition-all duration-300"
                filter={isActive ? "url(#glow)" : undefined}
              />
              
              {/* Chip label */}
              <text
                x={supp.x}
                y={supp.y - 3}
                textAnchor="middle"
                className={`font-display text-[8px] uppercase tracking-wider ${isActive ? "fill-primary-foreground" : "fill-primary"}`}
              >
                {supp.shortName || supp.name.slice(0, 12)}
              </text>
              
              {/* Evidence grade indicator */}
              <text
                x={supp.x}
                y={supp.y + 10}
                textAnchor="middle"
                className={`font-mono text-[7px] ${isActive ? "fill-primary-foreground/70" : "fill-muted-foreground"}`}
              >
                [{supp.evidenceGrade}]
              </text>
            </g>
          );
        })}

        {/* Corner annotations */}
        <text x="10" y="15" className="font-mono text-[8px] fill-muted-foreground">
          HEALTH BLUEPRINT v1.0
        </text>
        <text x="790" y="15" textAnchor="end" className="font-mono text-[8px] fill-muted-foreground">
          {supplements.length} SUPPLEMENTS ANALYZED
        </text>
        <text x="10" y="410" className="font-mono text-[8px] fill-muted-foreground">
          Click supplements to view details
        </text>
        <text x="790" y="410" textAnchor="end" className="font-mono text-[8px] fill-muted-foreground">
          Hover to see connections
        </text>
      </svg>
    </div>
  );
};

export default HealthHeroSVG;
