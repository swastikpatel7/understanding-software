import { useState, useEffect } from 'react';

interface MemoryLayoutSVGProps {
  isPaused?: boolean;
}

const MemoryLayoutSVG = ({ isPaused = false }: MemoryLayoutSVGProps) => {
  const [stackPointer, setStackPointer] = useState(0);
  const [heapSize, setHeapSize] = useState(2);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setStackPointer(prev => (prev + 1) % 4);
      setHeapSize(prev => prev === 4 ? 2 : prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const sections = [
    { id: 'text', name: 'TEXT SEGMENT', desc: 'Program Code', y: 280, h: 40, color: 'hsl(var(--primary))' },
    { id: 'data', name: 'DATA SEGMENT', desc: 'Global Variables', y: 240, h: 40, color: 'hsl(var(--primary))' },
    { id: 'heap', name: 'HEAP', desc: 'Dynamic Allocation', y: 140, h: 100, color: 'hsl(var(--accent))' },
    { id: 'stack', name: 'STACK', desc: 'Local Variables', y: 60, h: 80, color: 'hsl(var(--accent))' },
  ];

  return (
    <svg
      viewBox="0 0 400 380"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.6">
        FIG.006
      </text>
      <text x="200" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
        PROCESS MEMORY LAYOUT
      </text>

      {/* Memory address labels */}
      <g transform="translate(40, 60)">
        <text x="0" y="0" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">0xFFFF FFFF</text>
        <text x="0" y="260" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">0x0000 0000</text>
      </g>

      {/* Main memory block */}
      <rect x="100" y="60" width="140" height="260" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />

      {/* Stack section with animation */}
      <g 
        onMouseEnter={() => setHoveredSection('stack')}
        onMouseLeave={() => setHoveredSection(null)}
        className="cursor-pointer"
      >
        <rect
          x="100"
          y="60"
          width="140"
          height={20 + stackPointer * 15}
          fill={hoveredSection === 'stack' ? 'hsl(var(--accent))' : 'hsl(var(--accent))'}
          fillOpacity={hoveredSection === 'stack' ? 0.25 : 0.1}
          stroke="hsl(var(--accent))"
          strokeWidth="1"
        />
        {/* Stack frames */}
        {Array.from({ length: stackPointer + 1 }, (_, i) => (
          <g key={i}>
            <rect
              x="105"
              y={65 + i * 15}
              width="130"
              height="12"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="0.5"
              strokeDasharray={i === stackPointer ? "none" : "2 2"}
            />
            <text x="110" y={74 + i * 15} fontSize="6" fill="hsl(var(--accent))" fontFamily="monospace">
              {i === 0 ? 'main()' : i === 1 ? 'func_a()' : i === 2 ? 'func_b()' : 'func_c()'}
            </text>
          </g>
        ))}
        {/* Stack pointer */}
        <line x1="95" y1={60 + 20 + stackPointer * 15} x2="85" y2={60 + 20 + stackPointer * 15} stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="60" y={64 + 20 + stackPointer * 15} fontSize="6" fill="hsl(var(--accent))" fontFamily="monospace">SP</text>
      </g>

      {/* Free space */}
      <g>
        <rect
          x="100"
          y={80 + stackPointer * 15}
          width="140"
          height={160 - stackPointer * 15 - heapSize * 20}
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          opacity="0.3"
        />
        <text x="170" y={150} textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace" opacity="0.5">
          FREE SPACE
        </text>
        {/* Growth arrows */}
        <path d="M170,90 L170,105" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" markerEnd="url(#smallArrow)" opacity="0.5" />
        <text x="180" y="100" fontSize="5" fill="hsl(var(--muted-foreground))" fontFamily="monospace">grows down</text>
        <path d="M170,200 L170,185" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" markerEnd="url(#smallArrow)" opacity="0.5" />
        <text x="180" y="195" fontSize="5" fill="hsl(var(--muted-foreground))" fontFamily="monospace">grows up</text>
      </g>

      {/* Heap section with animation */}
      <g 
        onMouseEnter={() => setHoveredSection('heap')}
        onMouseLeave={() => setHoveredSection(null)}
        className="cursor-pointer"
      >
        <rect
          x="100"
          y={240 - heapSize * 20}
          width="140"
          height={heapSize * 20}
          fill={hoveredSection === 'heap' ? 'hsl(var(--primary))' : 'hsl(var(--primary))'}
          fillOpacity={hoveredSection === 'heap' ? 0.2 : 0.1}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
        {/* Heap blocks */}
        {Array.from({ length: heapSize }, (_, i) => (
          <rect
            key={i}
            x="105"
            y={225 - i * 20}
            width={60 + Math.random() * 60}
            height="15"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* Data segment */}
      <g 
        onMouseEnter={() => setHoveredSection('data')}
        onMouseLeave={() => setHoveredSection(null)}
        className="cursor-pointer"
      >
        <rect
          x="100"
          y="240"
          width="140"
          height="40"
          fill={hoveredSection === 'data' ? 'hsl(var(--primary))' : 'hsl(var(--primary))'}
          fillOpacity={hoveredSection === 'data' ? 0.2 : 0.05}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
        <text x="170" y="258" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontFamily="monospace">.data / .bss</text>
        <text x="170" y="270" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" fontFamily="monospace">initialized / uninitialized</text>
      </g>

      {/* Text segment */}
      <g 
        onMouseEnter={() => setHoveredSection('text')}
        onMouseLeave={() => setHoveredSection(null)}
        className="cursor-pointer"
      >
        <rect
          x="100"
          y="280"
          width="140"
          height="40"
          fill={hoveredSection === 'text' ? 'hsl(var(--primary))' : 'hsl(var(--primary))'}
          fillOpacity={hoveredSection === 'text' ? 0.2 : 0.05}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
        <text x="170" y="298" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontFamily="monospace">.text</text>
        <text x="170" y="310" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" fontFamily="monospace">read-only, executable</text>
      </g>

      {/* Side labels */}
      <g transform="translate(250, 60)">
        <line x1="0" y1="10" x2="20" y2="10" stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="25" y="8" fontSize="7" fill="hsl(var(--accent))" fontFamily="monospace">STACK</text>
        <text x="25" y="18" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">LIFO structure</text>
        <text x="25" y="28" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">Auto managed</text>

        <line x1="0" y1="160" x2="20" y2="160" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="25" y="158" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">HEAP</text>
        <text x="25" y="168" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">malloc()/free()</text>
        <text x="25" y="178" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">Manual managed</text>

        <line x1="0" y1="200" x2="20" y2="200" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="25" y="198" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">DATA</text>
        <text x="25" y="208" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">Global vars</text>

        <line x1="0" y1="240" x2="20" y2="240" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="25" y="238" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">TEXT</text>
        <text x="25" y="248" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">Machine code</text>
      </g>

      {/* Bottom annotation */}
      <g transform="translate(10, 340)">
        <line x1="0" y1="0" x2="380" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        <text x="0" y="18" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          VIRTUAL ADDRESS SPACE • PAGE SIZE: 4KB • ASLR ENABLED
        </text>
        <text x="0" y="30" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          STACK LIMIT: 8MB • HEAP LIMIT: SYSTEM DEPENDENT
        </text>
      </g>

      {/* Markers */}
      <defs>
        <marker id="smallArrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4 Z" fill="hsl(var(--muted-foreground))" />
        </marker>
      </defs>
    </svg>
  );
};

export default MemoryLayoutSVG;
