import { useState } from 'react';

interface BTreeIndexSVGProps {
  isPaused?: boolean;
}

const BTreeIndexSVG = ({ isPaused = false }: BTreeIndexSVGProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchPath, setSearchPath] = useState<string[]>([]);

  const handleNodeHover = (nodeId: string, path: string[]) => {
    setHoveredNode(nodeId);
    setSearchPath(path);
  };

  return (
    <svg
      viewBox="0 0 420 360"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="210" y="20" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.6">
        FIG.007
      </text>
      <text x="210" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
        B+ TREE INDEX STRUCTURE
      </text>

      {/* Root node */}
      <g 
        onMouseEnter={() => handleNodeHover('root', ['root'])}
        onMouseLeave={() => { setHoveredNode(null); setSearchPath([]); }}
        className="cursor-pointer"
      >
        <rect
          x="155"
          y="55"
          width="110"
          height="30"
          fill={searchPath.includes('root') ? 'hsl(var(--accent))' : 'none'}
          fillOpacity={searchPath.includes('root') ? 0.15 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth={hoveredNode === 'root' ? 2 : 1}
          rx="2"
        />
        <line x1="185" y1="55" x2="185" y2="85" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="235" y1="55" x2="235" y2="85" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <text x="170" y="73" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontFamily="monospace">30</text>
        <text x="210" y="73" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontFamily="monospace">60</text>
        <text x="250" y="73" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontFamily="monospace">•</text>
      </g>
      <text x="280" y="73" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">ROOT</text>

      {/* Connecting lines to internal nodes */}
      <line x1="170" y1="85" x2="80" y2="115" stroke={searchPath.includes('int1') ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} strokeWidth={searchPath.includes('int1') ? 1.5 : 0.5} />
      <line x1="210" y1="85" x2="210" y2="115" stroke={searchPath.includes('int2') ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} strokeWidth={searchPath.includes('int2') ? 1.5 : 0.5} />
      <line x1="250" y1="85" x2="340" y2="115" stroke={searchPath.includes('int3') ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} strokeWidth={searchPath.includes('int3') ? 1.5 : 0.5} />

      {/* Internal nodes */}
      {[
        { id: 'int1', x: 30, keys: ['10', '20'], path: ['root', 'int1'] },
        { id: 'int2', x: 160, keys: ['40', '50'], path: ['root', 'int2'] },
        { id: 'int3', x: 290, keys: ['70', '80'], path: ['root', 'int3'] },
      ].map((node) => (
        <g 
          key={node.id}
          onMouseEnter={() => handleNodeHover(node.id, node.path)}
          onMouseLeave={() => { setHoveredNode(null); setSearchPath([]); }}
          className="cursor-pointer"
        >
          <rect
            x={node.x}
            y="115"
            width="100"
            height="26"
            fill={searchPath.includes(node.id) ? 'hsl(var(--accent))' : 'none'}
            fillOpacity={searchPath.includes(node.id) ? 0.15 : 0}
            stroke="hsl(var(--primary))"
            strokeWidth={hoveredNode === node.id ? 2 : 1}
            rx="2"
          />
          <line x1={node.x + 33} y1="115" x2={node.x + 33} y2="141" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1={node.x + 66} y1="115" x2={node.x + 66} y2="141" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <text x={node.x + 16} y="131" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">{node.keys[0]}</text>
          <text x={node.x + 50} y="131" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">{node.keys[1]}</text>
          <text x={node.x + 83} y="131" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">•</text>
        </g>
      ))}
      <text x="400" y="131" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">INTERNAL</text>

      {/* Connecting lines to leaf nodes */}
      {/* From int1 */}
      <line x1="46" y1="141" x2="25" y2="175" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      <line x1="80" y1="141" x2="80" y2="175" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      <line x1="113" y1="141" x2="135" y2="175" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      
      {/* From int2 */}
      <line x1="176" y1="141" x2="190" y2="175" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      <line x1="210" y1="141" x2="245" y2="175" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      
      {/* From int3 */}
      <line x1="306" y1="141" x2="300" y2="175" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      <line x1="340" y1="141" x2="355" y2="175" stroke="hsl(var(--primary))" strokeWidth="0.5" />

      {/* Leaf nodes */}
      {[
        { id: 'leaf1', x: 5, values: ['5', '8'] },
        { id: 'leaf2', x: 60, values: ['12', '18'] },
        { id: 'leaf3', x: 115, values: ['22', '27'] },
        { id: 'leaf4', x: 170, values: ['35', '38'] },
        { id: 'leaf5', x: 225, values: ['45', '55'] },
        { id: 'leaf6', x: 280, values: ['65', '68'] },
        { id: 'leaf7', x: 335, values: ['75', '85'] },
      ].map((leaf, i, arr) => (
        <g key={leaf.id}>
          <rect
            x={leaf.x}
            y="175"
            width="50"
            height="40"
            fill={hoveredNode === leaf.id ? 'hsl(var(--accent))' : 'none'}
            fillOpacity={hoveredNode === leaf.id ? 0.15 : 0}
            stroke="hsl(var(--accent))"
            strokeWidth={hoveredNode === leaf.id ? 2 : 1}
            rx="2"
            onMouseEnter={() => setHoveredNode(leaf.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          />
          <text x={leaf.x + 25} y="190" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontFamily="monospace">{leaf.values[0]}</text>
          <text x={leaf.x + 25} y="205" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontFamily="monospace">{leaf.values[1]}</text>
          
          {/* Linked list pointer */}
          {i < arr.length - 1 && (
            <line x1={leaf.x + 50} y1="195" x2={arr[i + 1].x} y2="195" stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="2 2" />
          )}
        </g>
      ))}
      <text x="400" y="195" fontSize="6" fill="hsl(var(--accent))" fontFamily="monospace">LEAF</text>

      {/* Data pointers */}
      <g transform="translate(5, 225)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <line x1={i * 55 + 25} y1="0" x2={i * 55 + 25} y2="15" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
            <rect x={i * 55} y="18" width="50" height="20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" rx="1" />
            <text x={i * 55 + 25} y="31" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" fontFamily="monospace">DATA ROW</text>
          </g>
        ))}
      </g>
      <text x="400" y="258" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">DATA</text>

      {/* Legend */}
      <g transform="translate(20, 280)">
        <line x1="0" y1="0" x2="380" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        
        <text x="0" y="20" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          ORDER: 3 (max 2 keys per node)
        </text>
        <text x="0" y="32" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          HEIGHT: 3 • TOTAL KEYS: 14 • FAN-OUT: 3
        </text>
        
        <g transform="translate(0, 45)">
          <text x="0" y="0" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
            SEARCH COMPLEXITY
          </text>
          <text x="0" y="12" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
            O(log n) - follows single path from root to leaf
          </text>
        </g>
        
        <g transform="translate(200, 45)">
          <text x="0" y="0" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
            RANGE QUERIES
          </text>
          <text x="0" y="12" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
            O(log n + k) - linked leaf nodes enable sequential scan
          </text>
        </g>
      </g>
    </svg>
  );
};

export default BTreeIndexSVG;
