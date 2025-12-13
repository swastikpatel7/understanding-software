import { useEffect, useState } from 'react';

interface MemoryAllocationSVGProps {
  isPaused?: boolean;
}

const MemoryAllocationSVG = ({ isPaused = false }: MemoryAllocationSVGProps) => {
  const [allocations, setAllocations] = useState([
    { id: 1, start: 0, size: 3, label: 'arr[]', active: false },
    { id: 2, start: 4, size: 2, label: 'ptr', active: false },
    { id: 3, start: 7, size: 4, label: 'obj', active: false },
  ]);
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setAllocations(prev => {
        const newAllocs = [...prev];
        const randomIndex = Math.floor(Math.random() * newAllocs.length);
        newAllocs[randomIndex] = { ...newAllocs[randomIndex], active: true };
        return newAllocs;
      });

      setTimeout(() => {
        setAllocations(prev => prev.map(a => ({ ...a, active: false })));
      }, 600);
    }, 1200);

    const pointerInterval = setInterval(() => {
      setPointer(prev => (prev + 1) % 12);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(pointerInterval);
    };
  }, [isPaused]);

  const cellWidth = 22;
  const cellHeight = 30;
  const startX = 20;
  const startY = 60;
  const totalCells = 12;

  return (
    <svg
      viewBox="0 0 300 160"
      className="w-full max-w-sm mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="150" y="25" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.7">
        MEMORY ALLOCATION
      </text>

      {/* Address labels */}
      <text x="15" y="50" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
        0x00
      </text>
      <text x="265" y="50" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
        0x0B
      </text>

      {/* Memory cells */}
      {Array.from({ length: totalCells }).map((_, index) => {
        const allocation = allocations.find(a => index >= a.start && index < a.start + a.size);
        const isAllocated = !!allocation;
        const isActive = allocation?.active;

        return (
          <g key={index}>
            <rect
              x={startX + index * cellWidth}
              y={startY}
              width={cellWidth}
              height={cellHeight}
              fill={isActive ? 'hsl(var(--accent))' : isAllocated ? 'hsl(var(--primary))' : 'none'}
              fillOpacity={isActive ? 0.3 : isAllocated ? 0.1 : 0}
              stroke="hsl(var(--primary))"
              strokeWidth={isActive ? 2 : 1}
              className="transition-all duration-200"
            />
            {/* Address number */}
            <text
              x={startX + index * cellWidth + cellWidth / 2}
              y={startY + cellHeight + 12}
              textAnchor="middle"
              fontSize="6"
              fill="hsl(var(--muted-foreground))"
              fontFamily="monospace"
            >
              {index.toString(16).toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Allocation labels */}
      {allocations.map((alloc) => (
        <g key={alloc.id}>
          {/* Bracket */}
          <path
            d={`M${startX + alloc.start * cellWidth + 2} ${startY - 5} 
                L${startX + alloc.start * cellWidth + 2} ${startY - 12}
                L${startX + (alloc.start + alloc.size) * cellWidth - 2} ${startY - 12}
                L${startX + (alloc.start + alloc.size) * cellWidth - 2} ${startY - 5}`}
            fill="none"
            stroke={alloc.active ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
            strokeWidth="1"
            opacity={alloc.active ? 1 : 0.5}
            className="transition-all duration-200"
          />
          <text
            x={startX + (alloc.start + alloc.size / 2) * cellWidth}
            y={startY - 18}
            textAnchor="middle"
            fontSize="7"
            fill={alloc.active ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
            fontFamily="monospace"
            className="transition-all duration-200"
          >
            {alloc.label}
          </text>
        </g>
      ))}

      {/* Pointer indicator */}
      <g className="transition-all duration-200" style={{ transform: `translateX(${pointer * cellWidth}px)` }}>
        <path
          d={`M${startX + cellWidth / 2} ${startY + cellHeight + 25} L${startX + cellWidth / 2} ${startY + cellHeight + 35}`}
          stroke="hsl(var(--accent))"
          strokeWidth="2"
        />
        <polygon
          points={`${startX + cellWidth / 2 - 4},${startY + cellHeight + 25} ${startX + cellWidth / 2 + 4},${startY + cellHeight + 25} ${startX + cellWidth / 2},${startY + cellHeight + 18}`}
          fill="hsl(var(--accent))"
        />
        <text
          x={startX + cellWidth / 2}
          y={startY + cellHeight + 48}
          textAnchor="middle"
          fontSize="6"
          fill="hsl(var(--accent))"
          fontFamily="monospace"
        >
          scan
        </text>
      </g>

      {/* Legend */}
      <g>
        <rect x="100" y="140" width="10" height="10" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="115" y="148" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">allocated</text>
        
        <rect x="165" y="140" width="10" height="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="180" y="148" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">free</text>
      </g>
    </svg>
  );
};

export default MemoryAllocationSVG;
