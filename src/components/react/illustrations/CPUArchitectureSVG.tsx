import { useState, useEffect } from 'react';

interface CPUArchitectureSVGProps {
  isPaused?: boolean;
}

const CPUArchitectureSVG = ({ isPaused = false }: CPUArchitectureSVGProps) => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [dataFlow, setDataFlow] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDataFlow(prev => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const components = [
    { id: 'alu', label: 'ALU', x: 80, y: 100, w: 70, h: 50 },
    { id: 'cu', label: 'CONTROL\nUNIT', x: 80, y: 170, w: 70, h: 50 },
    { id: 'registers', label: 'REGISTERS', x: 170, y: 100, w: 70, h: 50 },
    { id: 'cache', label: 'L1 CACHE', x: 170, y: 170, w: 70, h: 50 },
  ];

  return (
    <svg
      viewBox="0 0 380 340"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="190" y="20" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.6">
        FIG.002
      </text>
      <text x="190" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
        CPU ARCHITECTURE
      </text>

      {/* CPU Die outline */}
      <rect x="50" y="70" width="220" height="180" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" rx="4" />
      <text x="160" y="62" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
        PROCESSOR DIE
      </text>

      {/* CPU Components */}
      {components.map((comp) => {
        const isActive = activeComponent === comp.id;
        return (
          <g
            key={comp.id}
            onMouseEnter={() => setActiveComponent(comp.id)}
            onMouseLeave={() => setActiveComponent(null)}
            className="cursor-pointer"
          >
            <rect
              x={comp.x}
              y={comp.y}
              width={comp.w}
              height={comp.h}
              fill={isActive ? 'hsl(var(--primary))' : 'none'}
              fillOpacity={isActive ? 0.15 : 0}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              rx="2"
            />
            {comp.label.split('\n').map((line, i) => (
              <text
                key={i}
                x={comp.x + comp.w / 2}
                y={comp.y + comp.h / 2 + (i - 0.5) * 10 + 4}
                textAnchor="middle"
                fontSize="8"
                fill="hsl(var(--primary))"
                fontFamily="monospace"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Data bus connections */}
      <g opacity={dataFlow === 0 ? 1 : 0.3} className="transition-opacity duration-300">
        <line x1="150" y1="125" x2="170" y2="125" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="160" cy="125" r="2" fill="hsl(var(--accent))" />
      </g>
      <g opacity={dataFlow === 1 ? 1 : 0.3} className="transition-opacity duration-300">
        <line x1="205" y1="150" x2="205" y2="170" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="205" cy="160" r="2" fill="hsl(var(--accent))" />
      </g>
      <g opacity={dataFlow === 2 ? 1 : 0.3} className="transition-opacity duration-300">
        <line x1="150" y1="195" x2="170" y2="195" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="160" cy="195" r="2" fill="hsl(var(--accent))" />
      </g>
      <g opacity={dataFlow === 3 ? 1 : 0.3} className="transition-opacity duration-300">
        <line x1="115" y1="150" x2="115" y2="170" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="115" cy="160" r="2" fill="hsl(var(--accent))" />
      </g>

      {/* External connections */}
      {/* System Bus */}
      <line x1="270" y1="160" x2="320" y2="160" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <rect x="320" y="130" width="50" height="60" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" rx="2" />
      <text x="345" y="155" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">SYSTEM</text>
      <text x="345" y="165" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">BUS</text>

      {/* Pin annotations */}
      <g transform="translate(50, 250)">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <rect key={i} x={i * 20} y="0" width="12" height="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.5" />
        ))}
        <text x="110" y="35" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          I/O PINS
        </text>
      </g>

      {/* Labels with lines */}
      <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2">
        <line x1="80" y1="90" x2="30" y2="60" />
        <text x="10" y="58" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">ARITHMETIC</text>
        <text x="10" y="66" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">LOGIC UNIT</text>

        <line x1="240" y1="115" x2="280" y2="85" />
        <text x="282" y="83" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">GENERAL PURPOSE</text>
        <text x="282" y="91" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">REGISTERS (x16)</text>

        <line x1="240" y1="195" x2="280" y2="220" />
        <text x="282" y="218" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">64KB L1 CACHE</text>
        <text x="282" y="226" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">SRAM MEMORY</text>
      </g>

      {/* Bottom annotations */}
      <g transform="translate(10, 300)">
        <line x1="0" y1="0" x2="360" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        <text x="0" y="18" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          CLOCK SPEED: 3.5 GHz • PROCESS NODE: 7nm • TDP: 65W
        </text>
        <text x="0" y="30" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          INSTRUCTION SET: x86-64 • PIPELINE: 19-STAGE
        </text>
      </g>
    </svg>
  );
};

export default CPUArchitectureSVG;
