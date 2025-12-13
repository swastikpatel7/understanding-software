import { useState } from 'react';

interface DiskStorageSVGProps {
  isPaused?: boolean;
}

const DiskStorageSVG = ({ isPaused = false }: DiskStorageSVGProps) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 400 380"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.6">
        FIG.004
      </text>
      <text x="200" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
        HARD DISK DRIVE - EXPLODED VIEW
      </text>

      {/* Top cover */}
      <g 
        onMouseEnter={() => setHoveredPart('cover')}
        onMouseLeave={() => setHoveredPart(null)}
        className="cursor-pointer"
      >
        <path
          d="M100,55 L280,55 L300,75 L300,95 L80,95 L80,75 Z"
          fill={hoveredPart === 'cover' ? 'hsl(var(--primary))' : 'none'}
          fillOpacity={hoveredPart === 'cover' ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
        <text x="320" y="80" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">TOP COVER</text>
        <line x1="300" y1="75" x2="315" y2="75" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* Platters */}
      <g 
        onMouseEnter={() => setHoveredPart('platter')}
        onMouseLeave={() => setHoveredPart(null)}
        className="cursor-pointer"
      >
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse
              cx="190"
              cy={125 + i * 25}
              rx="90"
              ry="20"
              fill={hoveredPart === 'platter' ? 'hsl(var(--accent))' : 'none'}
              fillOpacity={hoveredPart === 'platter' ? 0.1 : 0}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
            />
            {/* Center spindle hole */}
            <ellipse
              cx="190"
              cy={125 + i * 25}
              rx="15"
              ry="4"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
            />
            {/* Track lines */}
            {[30, 50, 70].map((r, j) => (
              <ellipse
                key={j}
                cx="190"
                cy={125 + i * 25}
                rx={r}
                ry={r * 0.22}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.3"
                opacity="0.4"
              />
            ))}
          </g>
        ))}
        <text x="320" y="145" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">MAGNETIC PLATTERS</text>
        <line x1="280" y1="140" x2="315" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* Spindle */}
      <g 
        onMouseEnter={() => setHoveredPart('spindle')}
        onMouseLeave={() => setHoveredPart(null)}
        className="cursor-pointer"
      >
        <rect
          x="182"
          y="105"
          width="16"
          height="80"
          fill={hoveredPart === 'spindle' ? 'hsl(var(--primary))' : 'none'}
          fillOpacity={hoveredPart === 'spindle' ? 0.15 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
        <text x="60" y="145" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">SPINDLE MOTOR</text>
        <line x1="95" y1="145" x2="182" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* Read/Write head assembly */}
      <g 
        onMouseEnter={() => setHoveredPart('head')}
        onMouseLeave={() => setHoveredPart(null)}
        className="cursor-pointer"
      >
        {/* Actuator arm */}
        <path
          d="M290,200 L250,130 L255,125 L300,195 Z"
          fill={hoveredPart === 'head' ? 'hsl(var(--accent))' : 'none'}
          fillOpacity={hoveredPart === 'head' ? 0.2 : 0}
          stroke="hsl(var(--accent))"
          strokeWidth="1"
        />
        {/* Head */}
        <rect
          x="245"
          y="122"
          width="15"
          height="8"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          rx="1"
        />
        <text x="320" y="130" fontSize="7" fill="hsl(var(--accent))" fontFamily="monospace">READ/WRITE HEAD</text>
        <line x1="260" y1="126" x2="315" y2="128" stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="2 2" />
        
        {/* Actuator */}
        <circle
          cx="295"
          cy="200"
          r="12"
          fill={hoveredPart === 'head' ? 'hsl(var(--accent))' : 'none'}
          fillOpacity={hoveredPart === 'head' ? 0.1 : 0}
          stroke="hsl(var(--accent))"
          strokeWidth="1"
        />
        <text x="320" y="205" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">VOICE COIL</text>
        <text x="320" y="213" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">ACTUATOR</text>
        <line x1="307" y1="200" x2="315" y2="200" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* Base plate */}
      <g 
        onMouseEnter={() => setHoveredPart('base')}
        onMouseLeave={() => setHoveredPart(null)}
        className="cursor-pointer"
      >
        <path
          d="M80,220 L80,240 L100,260 L280,260 L300,240 L300,220 L280,230 L100,230 Z"
          fill={hoveredPart === 'base' ? 'hsl(var(--primary))' : 'none'}
          fillOpacity={hoveredPart === 'base' ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
        <text x="60" y="250" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">BASE PLATE</text>
        <line x1="80" y1="245" x2="75" y2="245" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* PCB */}
      <g 
        onMouseEnter={() => setHoveredPart('pcb')}
        onMouseLeave={() => setHoveredPart(null)}
        className="cursor-pointer"
      >
        <rect
          x="90"
          y="275"
          width="200"
          height="40"
          fill={hoveredPart === 'pcb' ? 'hsl(var(--primary))' : 'none'}
          fillOpacity={hoveredPart === 'pcb' ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          rx="2"
        />
        {/* PCB components */}
        <rect x="100" y="282" width="25" height="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" rx="1" />
        <rect x="130" y="285" width="15" height="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <rect x="150" y="282" width="30" height="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" rx="1" />
        <circle cx="200" cy="288" r="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <rect x="215" y="283" width="20" height="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <rect x="240" y="285" width="40" height="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" rx="1" />
        
        <text x="320" y="295" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">CONTROLLER PCB</text>
        <line x1="290" y1="295" x2="315" y2="295" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* SATA connector */}
      <g>
        <rect x="95" y="300" width="30" height="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <text x="60" y="308" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">SATA</text>
      </g>

      {/* Bottom annotations */}
      <g transform="translate(10, 335)">
        <line x1="0" y1="0" x2="380" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        <text x="0" y="18" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          CAPACITY: 2TB • RPM: 7200 • CACHE: 256MB • INTERFACE: SATA III
        </text>
        <text x="0" y="30" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          SEEK TIME: 8ms • TRANSFER RATE: 200 MB/s • MTBF: 1,000,000 hrs
        </text>
      </g>
    </svg>
  );
};

export default DiskStorageSVG;
