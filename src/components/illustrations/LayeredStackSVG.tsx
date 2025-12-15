import { useEffect, useState } from 'react';

interface LayeredStackSVGProps {
  isPaused?: boolean;
}

const LayeredStackSVG = ({ isPaused = false }: LayeredStackSVGProps) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [dataFlow, setDataFlow] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    
    let frame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.02;
      setPulsePhase(time);
      setDataFlow((time * 50) % 100);
      frame = requestAnimationFrame(animate);
    };
    
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  const glowIntensity = (Math.sin(pulsePhase) + 1) / 2;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <span className="figure-label absolute -left-6 top-1/2 -translate-y-1/2 writing-mode-vertical text-[10px]">FIG.001</span>
      <svg viewBox="0 0 800 600" className="w-full" style={{ maxHeight: '600px' }}>
        <defs>
          {/* Gradients */}
          <linearGradient id="core-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4 + glowIntensity * 0.3} />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.2 + glowIntensity * 0.2} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
          </linearGradient>
          
          <radialGradient id="neural-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6 + glowIntensity * 0.4} />
            <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </radialGradient>

          <linearGradient id="data-stream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>

          {/* Dot pattern */}
          <pattern id="micro-dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.3" className="fill-primary/15" />
          </pattern>

          {/* Circuit pattern */}
          <pattern id="circuit-lines" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 20 L 15 20 L 20 15 L 20 0" fill="none" className="stroke-primary/10" strokeWidth="0.5" />
            <path d="M 40 20 L 25 20 L 20 25 L 20 40" fill="none" className="stroke-primary/10" strokeWidth="0.5" />
          </pattern>

          {/* Animated dash */}
          <pattern id="flowing-data" width="20" height="4" patternUnits="userSpaceOnUse">
            <rect x={-dataFlow % 20} y="1" width="10" height="2" rx="1" className="fill-primary/60" />
            <rect x={(-dataFlow % 20) + 20} y="1" width="10" height="2" rx="1" className="fill-primary/60" />
          </pattern>
        </defs>

        {/* Background layers */}
        <rect x="50" y="30" width="700" height="540" fill="url(#micro-dots)" />
        <rect x="50" y="30" width="700" height="540" fill="url(#circuit-lines)" />

        {/* ===== OUTER HEXAGONAL FRAME ===== */}
        <g className="stroke-primary/30 stroke-[1]">
          <polygon 
            points="400,50 650,150 650,450 400,550 150,450 150,150" 
            fill="none"
            strokeDasharray="4,8"
          />
          <polygon 
            points="400,80 620,165 620,435 400,520 180,435 180,165" 
            fill="none"
            className="stroke-primary/20"
          />
        </g>

        {/* ===== CENTRAL AGI CORE ===== */}
        <g 
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredPart('core')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          {/* Core glow effect */}
          <circle 
            cx="400" 
            cy="300" 
            r={80 + glowIntensity * 10}
            fill="url(#neural-center)"
            className="transition-all duration-500"
          />
          
          {/* Outer ring */}
          <circle 
            cx="400" 
            cy="300" 
            r="75"
            fill="none"
            className={`stroke-primary stroke-[2] transition-all duration-300 ${
              hoveredPart === 'core' ? 'stroke-[3]' : ''
            }`}
          />
          
          {/* Inner rotating rings */}
          <g style={{ transform: `rotate(${pulsePhase * 20}deg)`, transformOrigin: '400px 300px' }}>
            <circle cx="400" cy="300" r="55" fill="none" className="stroke-primary/60 stroke-[1]" strokeDasharray="8,4" />
          </g>
          <g style={{ transform: `rotate(${-pulsePhase * 15}deg)`, transformOrigin: '400px 300px' }}>
            <circle cx="400" cy="300" r="40" fill="none" className="stroke-primary/40 stroke-[1]" strokeDasharray="4,8" />
          </g>

          {/* Central brain/neural icon */}
          <g className="fill-primary">
            <circle cx="400" cy="300" r="20" className="fill-primary/30" />
            {/* Neural nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 400 + Math.cos(rad) * 12;
              const y = 300 + Math.sin(rad) * 12;
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r={3 + glowIntensity * 1.5} 
                  className="fill-primary"
                  style={{ opacity: 0.5 + (Math.sin(pulsePhase + i) + 1) / 4 }}
                />
              );
            })}
            {/* Core center */}
            <circle cx="400" cy="300" r="6" className="fill-primary" />
          </g>

          {/* AGI label */}
          <text x="400" y="395" textAnchor="middle" className="fill-primary font-mono text-[11px] uppercase tracking-[0.3em]">
            AGI CORE
          </text>
        </g>

        {/* ===== PROCESSING CLUSTERS ===== */}
        {[
          { x: 200, y: 200, label: 'REASONING', sublabel: 'Logic Engine' },
          { x: 600, y: 200, label: 'LEARNING', sublabel: 'Neural Plasticity' },
          { x: 200, y: 400, label: 'MEMORY', sublabel: 'Knowledge Graph' },
          { x: 600, y: 400, label: 'PERCEPTION', sublabel: 'Sensory Input' },
        ].map((cluster, idx) => (
          <g 
            key={idx}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredPart(`cluster-${idx}`)}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Cluster container */}
            <rect 
              x={cluster.x - 60} 
              y={cluster.y - 40} 
              width="120" 
              height="80" 
              rx="4"
              className={`fill-background stroke-primary transition-all duration-300 ${
                hoveredPart === `cluster-${idx}` ? 'stroke-[2] fill-primary/5' : 'stroke-[1]'
              }`}
            />
            
            {/* Processing units grid */}
            <g className="stroke-primary/30 stroke-[0.5]">
              {[0, 1, 2, 3].map((row) => (
                [0, 1, 2, 3, 4].map((col) => (
                  <rect 
                    key={`${row}-${col}`}
                    x={cluster.x - 50 + col * 22} 
                    y={cluster.y - 28 + row * 14} 
                    width="18" 
                    height="10" 
                    rx="1"
                    className="fill-primary/10"
                    style={{ 
                      opacity: 0.3 + (Math.sin(pulsePhase + row + col + idx) + 1) / 3 
                    }}
                  />
                ))
              ))}
            </g>

            {/* Cluster label */}
            <text 
              x={cluster.x} 
              y={cluster.y + 55} 
              textAnchor="middle" 
              className="fill-primary font-mono text-[9px] uppercase tracking-wider"
            >
              {cluster.label}
            </text>
            <text 
              x={cluster.x} 
              y={cluster.y + 66} 
              textAnchor="middle" 
              className="fill-primary/50 font-mono text-[7px]"
            >
              {cluster.sublabel}
            </text>
          </g>
        ))}

        {/* ===== DATA PATHWAYS ===== */}
        <g className="stroke-primary/40 stroke-[2]">
          {/* Connections from clusters to core */}
          <line x1="260" y1="200" x2="330" y2="260" strokeDasharray="4,4" />
          <line x1="540" y1="200" x2="470" y2="260" strokeDasharray="4,4" />
          <line x1="260" y1="400" x2="330" y2="340" strokeDasharray="4,4" />
          <line x1="540" y1="400" x2="470" y2="340" strokeDasharray="4,4" />
          
          {/* Animated data pulses */}
          {[0, 1, 2, 3].map((i) => {
            const paths = [
              { x1: 260, y1: 200, x2: 330, y2: 260 },
              { x1: 540, y1: 200, x2: 470, y2: 260 },
              { x1: 260, y1: 400, x2: 330, y2: 340 },
              { x1: 540, y1: 400, x2: 470, y2: 340 },
            ];
            const p = paths[i];
            const t = ((pulsePhase * 0.5 + i * 0.25) % 1);
            const px = p.x1 + (p.x2 - p.x1) * t;
            const py = p.y1 + (p.y2 - p.y1) * t;
            return (
              <circle 
                key={i}
                cx={px} 
                cy={py} 
                r="4"
                className="fill-primary"
                style={{ opacity: 0.8 }}
              />
            );
          })}
        </g>

        {/* ===== OUTER PROCESSING NODES ===== */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 400 + Math.cos(rad) * 220;
          const y = 300 + Math.sin(rad) * 180;
          return (
            <g key={i}>
              <circle 
                cx={x} 
                cy={y} 
                r="8"
                className="fill-background stroke-primary stroke-[1]"
              />
              <circle 
                cx={x} 
                cy={y} 
                r="4"
                className="fill-primary"
                style={{ opacity: 0.4 + (Math.sin(pulsePhase * 2 + i) + 1) / 4 }}
              />
              {/* Connection to center */}
              <line 
                x1={x} 
                y1={y} 
                x2={400 + Math.cos(rad) * 80} 
                y2={300 + Math.sin(rad) * 80}
                className="stroke-primary/20 stroke-[0.5]"
                strokeDasharray="2,4"
              />
            </g>
          );
        })}

        {/* ===== ANNOTATIONS ===== */}
        <g className="fill-primary font-mono text-[8px]">
          {/* Left annotations */}
          <g>
            <line x1="80" y1="150" x2="145" y2="150" className="stroke-primary/40 stroke-[0.5]" strokeDasharray="2,2" />
            <text x="75" y="145" textAnchor="end" className="uppercase">Neural Pathway</text>
            <text x="75" y="156" textAnchor="end" className="fill-primary/50 text-[6px]">Bidirectional Data Flow</text>
          </g>
          
          <g>
            <line x1="80" y1="300" x2="145" y2="300" className="stroke-primary/40 stroke-[0.5]" strokeDasharray="2,2" />
            <text x="75" y="295" textAnchor="end" className="uppercase">Quantum Core</text>
            <text x="75" y="306" textAnchor="end" className="fill-primary/50 text-[6px]">10^15 Operations/sec</text>
          </g>

          <g>
            <line x1="80" y1="450" x2="145" y2="450" className="stroke-primary/40 stroke-[0.5]" strokeDasharray="2,2" />
            <text x="75" y="445" textAnchor="end" className="uppercase">Knowledge Base</text>
            <text x="75" y="456" textAnchor="end" className="fill-primary/50 text-[6px]">Petabyte Storage</text>
          </g>

          {/* Right annotations */}
          <g>
            <line x1="720" y1="150" x2="655" y2="150" className="stroke-primary/40 stroke-[0.5]" strokeDasharray="2,2" />
            <text x="725" y="145" className="uppercase">Compute Cluster</text>
            <text x="725" y="156" className="fill-primary/50 text-[6px]">Distributed Processing</text>
          </g>

          <g>
            <line x1="720" y1="300" x2="655" y2="300" className="stroke-primary/40 stroke-[0.5]" strokeDasharray="2,2" />
            <text x="725" y="295" className="uppercase">Active Threads</text>
            <text x="725" y="306" className="fill-primary/50 text-[6px]">1.2M Concurrent</text>
          </g>

          <g>
            <line x1="720" y1="450" x2="655" y2="450" className="stroke-primary/40 stroke-[0.5]" strokeDasharray="2,2" />
            <text x="725" y="445" className="uppercase">I/O Bandwidth</text>
            <text x="725" y="456" className="fill-primary/50 text-[6px]">100 Tb/s</text>
          </g>
        </g>

        {/* ===== BOTTOM SPECS BAR ===== */}
        <g className="fill-primary/60 font-mono text-[7px]">
          <line x1="100" y1="560" x2="700" y2="560" className="stroke-primary/20 stroke-[0.5]" />
          <text x="120" y="575">MODEL: AGI-7.0</text>
          <text x="250" y="575">CORES: 1,024,000</text>
          <text x="400" y="575">MEMORY: 16 PB</text>
          <text x="530" y="575">POWER: 50 MW</text>
          <text x="650" y="575">STATUS: ACTIVE</text>
        </g>

        {/* ===== MAIN TITLE ===== */}
        <text x="400" y="585" textAnchor="middle" className="fill-primary font-mono text-[12px] uppercase tracking-[0.4em]">
          Artificial General Intelligence Architecture
        </text>

        {/* Corner markers */}
        <g className="stroke-primary/30 stroke-[1]">
          <path d="M 60 50 L 60 70 M 60 50 L 80 50" />
          <path d="M 740 50 L 740 70 M 740 50 L 720 50" />
          <path d="M 60 550 L 60 530 M 60 550 L 80 550" />
          <path d="M 740 550 L 740 530 M 740 550 L 720 550" />
        </g>

        {/* Side labels */}
        <text x="45" y="300" className="fill-primary/40 font-mono text-[8px] uppercase" style={{ writingMode: 'vertical-rl' }} transform="rotate(180, 45, 300)">
          [ SUPERCOMPUTER SYSTEM ]
        </text>
        <text x="755" y="300" className="fill-primary/40 font-mono text-[8px] uppercase" style={{ writingMode: 'vertical-rl' }}>
          [ NEURAL ARCHITECTURE ]
        </text>
      </svg>
    </div>
  );
};

export default LayeredStackSVG;
