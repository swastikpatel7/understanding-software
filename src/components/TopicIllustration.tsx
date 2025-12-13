import InteractiveSVGWrapper from './illustrations/InteractiveSVGWrapper';
import HashTableSVG from './illustrations/HashTableSVG';
import BinaryTreeSVG from './illustrations/BinaryTreeSVG';
import SortingAlgorithmSVG from './illustrations/SortingAlgorithmSVG';
import MemoryAllocationSVG from './illustrations/MemoryAllocationSVG';
import MemoryLayoutSVG from './illustrations/MemoryLayoutSVG';
import BTreeIndexSVG from './illustrations/BTreeIndexSVG';
import NetworkPacketSVG from './illustrations/NetworkPacketSVG';
import DatabaseSVG from './illustrations/DatabaseSVG';

interface TopicIllustrationProps {
  illustrationKey: string | null;
}

const TopicIllustration = ({ illustrationKey }: TopicIllustrationProps) => {
  const getIllustration = () => {
    switch (illustrationKey) {
      case 'array':
        return <ArrayIllustration />;
      case 'linked-list':
        return <LinkedListIllustration />;
      case 'stack':
        return <StackQueueIllustration />;
      case 'hash-table':
        return <HashTableSVG />;
      case 'binary-tree':
        return <BinaryTreeSVG />;
      case 'bst':
        return <BinaryTreeSVG />;
      case 'heap':
        return <HeapIllustration />;
      case 'graph':
        return <GraphIllustration />;
      default:
        return <DefaultIllustration />;
    }
  };

  return (
    <InteractiveSVGWrapper>
      {getIllustration()}
    </InteractiveSVGWrapper>
  );
};

// Custom SVG Illustrations for each data structure

const ArrayIllustration = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full">
    <defs>
      <linearGradient id="arrayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    
    {/* Title */}
    <text x="400" y="40" textAnchor="middle" className="fill-primary font-mono text-sm uppercase tracking-widest">
      Array Memory Layout
    </text>
    
    {/* Array cells */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i} transform={`translate(${100 + i * 75}, 100)`}>
        <rect 
          x="0" 
          y="0" 
          width="70" 
          height="70" 
          fill="url(#arrayGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          className="transition-all duration-300 hover:fill-primary/30"
        />
        <text x="35" y="45" textAnchor="middle" className="fill-primary font-mono text-lg">
          {[42, 17, 89, 3, 56, 23, 71, 8][i]}
        </text>
        <text x="35" y="-10" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">
          [{i}]
        </text>
      </g>
    ))}
    
    {/* Memory addresses */}
    <text x="100" y="200" className="fill-muted-foreground font-mono text-xs">
      0x1000
    </text>
    <text x="700" y="200" className="fill-muted-foreground font-mono text-xs">
      0x1070
    </text>
    <line x1="100" y1="190" x2="700" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4" />
    
    {/* Annotations */}
    <g transform="translate(400, 260)">
      <text x="0" y="0" textAnchor="middle" className="fill-foreground font-body text-sm">
        Contiguous memory allocation
      </text>
      <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground font-body text-xs">
        O(1) access time • Fixed size • Index-based
      </text>
    </g>
    
    {/* Access arrow */}
    <g transform="translate(325, 300)">
      <path d="M0,0 L0,-50 L70,-50 L70,-80" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <text x="35" y="20" textAnchor="middle" className="fill-primary font-mono text-xs">
        arr[3] → 3
      </text>
    </g>
    
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
      </marker>
    </defs>
  </svg>
);

const LinkedListIllustration = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full">
    <text x="400" y="40" textAnchor="middle" className="fill-primary font-mono text-sm uppercase tracking-widest">
      Singly Linked List
    </text>
    
    {/* Nodes */}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${80 + i * 145}, 120)`}>
        {/* Data section */}
        <rect x="0" y="0" width="70" height="60" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="35" y="35" textAnchor="middle" className="fill-primary font-mono text-lg">
          {['A', 'B', 'C', 'D', 'E'][i]}
        </text>
        
        {/* Next pointer section */}
        <rect x="70" y="0" width="40" height="60" fill="hsl(var(--muted))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="2" />
        {i < 4 && (
          <circle cx="90" cy="30" r="6" fill="hsl(var(--primary))" />
        )}
        {i === 4 && (
          <text x="90" y="35" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">
            ∅
          </text>
        )}
        
        {/* Arrow to next node */}
        {i < 4 && (
          <line x1="110" y1="30" x2="145" y2="30" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
        )}
        
        {/* Labels */}
        <text x="35" y="-15" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">
          data
        </text>
        <text x="90" y="-15" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">
          next
        </text>
      </g>
    ))}
    
    {/* Head pointer */}
    <g transform="translate(80, 220)">
      <text x="0" y="0" className="fill-primary font-mono text-sm">HEAD</text>
      <path d="M30,5 L30,-30 L35,-30" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    </g>
    
    {/* Annotations */}
    <g transform="translate(400, 300)">
      <text x="0" y="0" textAnchor="middle" className="fill-foreground font-body text-sm">
        Non-contiguous memory • Dynamic size
      </text>
      <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground font-body text-xs">
        O(n) access • O(1) insertion/deletion at known position
      </text>
    </g>
  </svg>
);

const StackQueueIllustration = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full">
    {/* Stack */}
    <g transform="translate(150, 50)">
      <text x="70" y="0" textAnchor="middle" className="fill-primary font-mono text-sm uppercase tracking-widest">
        Stack (LIFO)
      </text>
      
      {['Top', 'B', 'C', 'Bottom'].map((item, i) => (
        <g key={i} transform={`translate(0, ${30 + i * 55})`}>
          <rect 
            x="0" 
            y="0" 
            width="140" 
            height="50" 
            fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"}
            fillOpacity={i === 0 ? "0.3" : "0.1"}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <text x="70" y="32" textAnchor="middle" className={`font-mono ${i === 0 ? 'fill-primary' : 'fill-muted-foreground'}`}>
            {['42', '17', '89', '3'][i]}
          </text>
        </g>
      ))}
      
      {/* Push/Pop arrows */}
      <g transform="translate(170, 55)">
        <path d="M0,0 L40,0" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="50" y="5" className="fill-primary font-mono text-xs">push</text>
        <path d="M40,25 L0,25" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="50" y="30" className="fill-primary font-mono text-xs">pop</text>
      </g>
    </g>
    
    {/* Queue */}
    <g transform="translate(450, 120)">
      <text x="150" y="-70" textAnchor="middle" className="fill-primary font-mono text-sm uppercase tracking-widest">
        Queue (FIFO)
      </text>
      
      {[0, 1, 2, 3, 4].map((i) => (
        <rect 
          key={i}
          x={i * 60} 
          y="0" 
          width="55" 
          height="60" 
          fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"}
          fillOpacity={i === 0 ? "0.3" : "0.1"}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
      ))}
      
      {[0, 1, 2, 3, 4].map((i) => (
        <text key={i} x={i * 60 + 27} y="38" textAnchor="middle" className="fill-primary font-mono">
          {['A', 'B', 'C', 'D', 'E'][i]}
        </text>
      ))}
      
      {/* Front/Rear labels */}
      <text x="27" y="-10" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">
        Front
      </text>
      <text x="267" y="-10" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">
        Rear
      </text>
      
      {/* Enqueue/Dequeue arrows */}
      <g transform="translate(0, 80)">
        <path d="M0,0 L-40,0" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="-45" y="5" textAnchor="end" className="fill-primary font-mono text-xs">dequeue</text>
      </g>
      <g transform="translate(300, 80)">
        <path d="M0,0 L40,0" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="45" y="5" className="fill-primary font-mono text-xs">enqueue</text>
      </g>
    </g>
    
    <g transform="translate(400, 350)">
      <text x="0" y="0" textAnchor="middle" className="fill-muted-foreground font-body text-xs">
        Both: O(1) insertion and removal at designated ends
      </text>
    </g>
  </svg>
);

const HeapIllustration = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full">
    <text x="400" y="40" textAnchor="middle" className="fill-primary font-mono text-sm uppercase tracking-widest">
      Max Heap (Binary)
    </text>
    
    {/* Heap nodes */}
    <g transform="translate(400, 100)">
      {/* Level 0 */}
      <circle cx="0" cy="0" r="30" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="0" y="7" textAnchor="middle" className="fill-primary font-mono text-lg">100</text>
      
      {/* Level 1 */}
      <line x1="-20" y1="25" x2="-100" y2="65" stroke="hsl(var(--border))" strokeWidth="2" />
      <line x1="20" y1="25" x2="100" y2="65" stroke="hsl(var(--border))" strokeWidth="2" />
      
      <circle cx="-120" cy="90" r="28" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="-120" y="97" textAnchor="middle" className="fill-primary font-mono">50</text>
      
      <circle cx="120" cy="90" r="28" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="120" y="97" textAnchor="middle" className="fill-primary font-mono">80</text>
      
      {/* Level 2 */}
      <line x1="-135" y1="115" x2="-180" y2="155" stroke="hsl(var(--border))" strokeWidth="2" />
      <line x1="-105" y1="115" x2="-60" y2="155" stroke="hsl(var(--border))" strokeWidth="2" />
      <line x1="105" y1="115" x2="60" y2="155" stroke="hsl(var(--border))" strokeWidth="2" />
      <line x1="135" y1="115" x2="180" y2="155" stroke="hsl(var(--border))" strokeWidth="2" />
      
      {[-200, -60, 60, 200].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="180" r="25" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x={x} y="187" textAnchor="middle" className="fill-muted-foreground font-mono text-sm">
            {[30, 20, 40, 60][i]}
          </text>
        </g>
      ))}
    </g>
    
    {/* Array representation */}
    <g transform="translate(100, 320)">
      <text x="0" y="0" className="fill-muted-foreground font-mono text-xs">Array:</text>
      {[100, 50, 80, 30, 20, 40, 60].map((val, i) => (
        <g key={i} transform={`translate(${60 + i * 70}, -15)`}>
          <rect x="0" y="0" width="60" height="35" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="30" y="23" textAnchor="middle" className="fill-primary font-mono text-sm">{val}</text>
          <text x="30" y="50" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">[{i}]</text>
        </g>
      ))}
    </g>
  </svg>
);

const GraphIllustration = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full">
    <text x="400" y="40" textAnchor="middle" className="fill-primary font-mono text-sm uppercase tracking-widest">
      Graph (Undirected)
    </text>
    
    {/* Edges */}
    <g stroke="hsl(var(--border))" strokeWidth="2">
      <line x1="200" y1="120" x2="350" y2="180" />
      <line x1="200" y1="120" x2="150" y2="250" />
      <line x1="350" y1="180" x2="150" y2="250" />
      <line x1="350" y1="180" x2="500" y2="120" />
      <line x1="350" y1="180" x2="400" y2="300" />
      <line x1="500" y1="120" x2="600" y2="200" />
      <line x1="400" y1="300" x2="600" y2="200" />
      <line x1="150" y1="250" x2="400" y2="300" />
    </g>
    
    {/* Nodes */}
    {[
      { x: 200, y: 120, label: 'A' },
      { x: 350, y: 180, label: 'B' },
      { x: 150, y: 250, label: 'C' },
      { x: 500, y: 120, label: 'D' },
      { x: 600, y: 200, label: 'E' },
      { x: 400, y: 300, label: 'F' },
    ].map((node, i) => (
      <g key={i}>
        <circle 
          cx={node.x} 
          cy={node.y} 
          r="30" 
          fill="hsl(var(--primary))" 
          fillOpacity="0.2" 
          stroke="hsl(var(--primary))" 
          strokeWidth="2"
          className="transition-all duration-300 hover:fill-primary/40"
        />
        <text x={node.x} y={node.y + 7} textAnchor="middle" className="fill-primary font-mono text-lg">
          {node.label}
        </text>
      </g>
    ))}
    
    {/* Annotations */}
    <g transform="translate(400, 370)">
      <text x="0" y="0" textAnchor="middle" className="fill-muted-foreground font-body text-xs">
        Vertices: 6 • Edges: 8 • Applications: Social Networks, Maps, Dependencies
      </text>
    </g>
  </svg>
);

const DefaultIllustration = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full">
    <text x="400" y="200" textAnchor="middle" className="fill-muted-foreground font-mono text-lg">
      Illustration Coming Soon
    </text>
    <circle cx="400" cy="250" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="8" />
  </svg>
);

export default TopicIllustration;
