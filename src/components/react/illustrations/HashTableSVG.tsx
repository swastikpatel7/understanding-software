import { useState } from 'react';

interface HashTableSVGProps {
  isPaused?: boolean;
}

const HashTableSVG = ({ isPaused = false }: HashTableSVGProps) => {
  const [hoveredBucket, setHoveredBucket] = useState<number | null>(null);

  const buckets = [
    { index: 0, items: ['apple'] },
    { index: 1, items: [] },
    { index: 2, items: ['cat', 'car'] },
    { index: 3, items: ['dog'] },
    { index: 4, items: [] },
    { index: 5, items: ['fish', 'fox', 'fly'] },
    { index: 6, items: [] },
    { index: 7, items: ['grape'] },
  ];

  return (
    <svg
      viewBox="0 0 400 320"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.6">
        FIG.001
      </text>
      <text x="200" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
        HASH TABLE STRUCTURE
      </text>

      {/* Hash function box */}
      <g transform="translate(30, 60)">
        <rect x="0" y="0" width="80" height="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" rx="2" />
        <text x="40" y="20" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">
          HASH FUNCTION
        </text>
        <text x="40" y="35" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          h(key) = key % 8
        </text>
        
        {/* Input arrow */}
        <path d="M-30 25 L-5 25" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <text x="-50" y="22" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">KEY</text>
        
        {/* Output arrow */}
        <path d="M85 25 L110 25" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <text x="115" y="22" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">INDEX</text>
      </g>

      {/* Bucket array */}
      <g transform="translate(200, 70)">
        <text x="70" y="-5" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          BUCKET ARRAY
        </text>
        
        {buckets.map((bucket, i) => {
          const y = i * 28;
          const isHovered = hoveredBucket === i;
          
          return (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredBucket(i)}
              onMouseLeave={() => setHoveredBucket(null)}
              className="cursor-pointer"
            >
              {/* Index label */}
              <text x="-15" y={y + 18} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
                [{i}]
              </text>
              
              {/* Bucket cell */}
              <rect 
                x="0" 
                y={y} 
                width="40" 
                height="24" 
                fill={isHovered ? 'hsl(var(--primary))' : 'none'}
                fillOpacity={isHovered ? 0.1 : 0}
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
              />
              
              {/* Linked list chain */}
              {bucket.items.length > 0 && (
                <>
                  <line x1="40" y1={y + 12} x2="55" y2={y + 12} stroke="hsl(var(--primary))" strokeWidth="1" />
                  {bucket.items.map((item, j) => {
                    const nodeX = 55 + j * 50;
                    return (
                      <g key={j}>
                        <rect 
                          x={nodeX} 
                          y={y + 2} 
                          width="40" 
                          height="20" 
                          fill={isHovered ? 'hsl(var(--accent))' : 'none'}
                          fillOpacity={isHovered ? 0.2 : 0}
                          stroke="hsl(var(--accent))" 
                          strokeWidth="1" 
                          rx="2"
                        />
                        <text x={nodeX + 20} y={y + 16} textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">
                          {item}
                        </text>
                        {j < bucket.items.length - 1 && (
                          <line x1={nodeX + 40} y1={y + 12} x2={nodeX + 55} y2={y + 12} stroke="hsl(var(--accent))" strokeWidth="1" markerEnd="url(#arrowhead2)" />
                        )}
                        {j === bucket.items.length - 1 && (
                          <text x={nodeX + 48} y={y + 15} fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="monospace">∅</text>
                        )}
                      </g>
                    );
                  })}
                </>
              )}
              
              {bucket.items.length === 0 && (
                <text x="20" y={y + 16} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="monospace" opacity="0.5">
                  null
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* Annotations */}
      <g transform="translate(10, 280)">
        <line x1="0" y1="0" x2="380" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        <text x="0" y="20" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          COLLISION RESOLUTION: SEPARATE CHAINING
        </text>
        <text x="0" y="32" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          TIME COMPLEXITY: O(1) AVERAGE, O(n) WORST
        </text>
      </g>

      {/* Arrow markers */}
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--primary))" />
        </marker>
        <marker id="arrowhead2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="hsl(var(--accent))" />
        </marker>
      </defs>
    </svg>
  );
};

export default HashTableSVG;
