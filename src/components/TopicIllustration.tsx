import InteractiveSVGWrapper from './illustrations/InteractiveSVGWrapper';

interface TopicIllustrationProps {
  illustrationKey: string | null;
  variant?: 'main' | 'inline';
}

// Get all illustrations for a topic (main + inline variants)
export const getTopicIllustrations = (illustrationKey: string | null) => {
  switch (illustrationKey) {
    case 'array':
      return {
        main: <ArrayMemoryLayout />,
        inline: [
          { component: <ArrayIndexAccess />, title: 'Index-Based Access' },
          { component: <ArrayInsertOperation />, title: 'Insertion Operation' },
          { component: <DynamicArrayResize />, title: 'Dynamic Resizing' },
        ]
      };
    case 'linked-list':
      return {
        main: <LinkedListStructure />,
        inline: [
          { component: <LinkedListNode />, title: 'Node Structure' },
          { component: <LinkedListTraversal />, title: 'Traversal' },
          { component: <LinkedListInsertion />, title: 'Insertion' },
        ]
      };
    case 'stack':
      return {
        main: <StackQueueComparison />,
        inline: [
          { component: <StackOperations />, title: 'Stack Operations' },
          { component: <QueueOperations />, title: 'Queue Operations' },
          { component: <DequeStructure />, title: 'Double-Ended Queue' },
        ]
      };
    case 'hash-table':
      return {
        main: <HashTableOverview />,
        inline: [
          { component: <HashFunction />, title: 'Hash Function' },
          { component: <CollisionHandling />, title: 'Collision Handling' },
          { component: <HashTableLookup />, title: 'Lookup Process' },
        ]
      };
    case 'binary-tree':
    case 'bst':
      return {
        main: <BinaryTreeStructure />,
        inline: [
          { component: <TreeNode />, title: 'Node Structure' },
          { component: <TreeTraversal />, title: 'Tree Traversal' },
          { component: <BSTSearch />, title: 'Binary Search' },
        ]
      };
    case 'heap':
      return {
        main: <HeapStructure />,
        inline: [
          { component: <HeapProperty />, title: 'Heap Property' },
          { component: <HeapifyOperation />, title: 'Heapify' },
          { component: <PriorityQueueUsage />, title: 'Priority Queue' },
        ]
      };
    case 'graph':
      return {
        main: <GraphOverview />,
        inline: [
          { component: <AdjacencyMatrix />, title: 'Adjacency Matrix' },
          { component: <AdjacencyList />, title: 'Adjacency List' },
          { component: <GraphTraversal />, title: 'Graph Traversal' },
        ]
      };
    default:
      return {
        main: <DefaultIllustration />,
        inline: []
      };
  }
};

const TopicIllustration = ({ illustrationKey, variant = 'main' }: TopicIllustrationProps) => {
  const illustrations = getTopicIllustrations(illustrationKey);
  
  return (
    <InteractiveSVGWrapper>
      {illustrations.main}
    </InteractiveSVGWrapper>
  );
};

// ===== ARRAY ILLUSTRATIONS =====

const ArrayMemoryLayout = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <text x="200" y="20" textAnchor="middle" className="fill-primary font-mono text-xs uppercase tracking-widest">
      Contiguous Memory
    </text>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i} transform={`translate(${45 + i * 55}, 50)`}>
        <rect x="0" y="0" width="50" height="50" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="25" y="32" textAnchor="middle" className="fill-primary font-mono text-sm">{[42, 17, 89, 3, 56, 23][i]}</text>
        <text x="25" y="-8" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">[{i}]</text>
      </g>
    ))}
    <line x1="45" y1="120" x2="375" y2="120" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3" />
    <text x="45" y="140" className="fill-muted-foreground font-mono text-xs">0x1000</text>
    <text x="375" y="140" textAnchor="end" className="fill-muted-foreground font-mono text-xs">0x1018</text>
    <text x="200" y="170" textAnchor="middle" className="fill-foreground/70 font-body text-xs">O(1) random access</text>
  </svg>
);

const ArrayIndexAccess = () => (
  <svg viewBox="0 0 260 160" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Direct Access</text>
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${20 + i * 45}, 35)`}>
        <rect x="0" y="0" width="40" height="35" fill={i === 2 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i === 2 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="20" y="24" textAnchor="middle" className="fill-primary font-mono text-sm">{['A', 'B', 'C', 'D', 'E'][i]}</text>
      </g>
    ))}
    <path d="M110,95 L110,75" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arr)" />
    <text x="110" y="115" textAnchor="middle" className="fill-primary font-mono text-xs">arr[2]</text>
    <text x="130" y="145" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Constant time O(1)</text>
    <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" /></marker></defs>
  </svg>
);

const ArrayInsertOperation = () => (
  <svg viewBox="0 0 260 160" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Insertion</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${25 + i * 50}, 40)`}>
        <rect x="0" y="0" width="40" height="30" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="20" y="20" textAnchor="middle" className="fill-primary font-mono text-sm">{['A', 'B', 'D', 'E'][i]}</text>
        {i >= 1 && <path d={`M42,15 L55,15`} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2" markerEnd="url(#arr)" />}
      </g>
    ))}
    <g transform="translate(115, 90)">
      <rect x="0" y="0" width="30" height="25" fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="15" y="17" textAnchor="middle" className="fill-primary font-mono text-sm">C</text>
      <path d="M15,-5 L15,-20" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    </g>
    <text x="130" y="145" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Requires shifting: O(n)</text>
  </svg>
);

const DynamicArrayResize = () => (
  <svg viewBox="0 0 260 160" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Dynamic Resize</text>
    <g transform="translate(20, 35)">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 28} y="0" width="25" height="25" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      ))}
      <text x="56" y="50" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">capacity: 4</text>
    </g>
    <path d="M140,47 L160,47" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <g transform="translate(170, 35)">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={(i % 4) * 18} y={Math.floor(i / 4) * 20} width="16" height="18" fill={i < 4 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i < 4 ? "0.2" : "0.05"} stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray={i >= 4 ? "2" : "0"} />
      ))}
      <text x="36" y="65" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">capacity: 8</text>
    </g>
    <text x="130" y="145" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Amortized O(1) append</text>
  </svg>
);

// ===== LINKED LIST ILLUSTRATIONS =====

const LinkedListStructure = () => (
  <svg viewBox="0 0 400 180" className="w-full h-full">
    <text x="200" y="20" textAnchor="middle" className="fill-primary font-mono text-xs uppercase tracking-widest">Linked List</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${40 + i * 90}, 50)`}>
        <rect x="0" y="0" width="50" height="40" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <rect x="50" y="0" width="25" height="40" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="25" y="27" textAnchor="middle" className="fill-primary font-mono">{['A', 'B', 'C', 'D'][i]}</text>
        {i < 3 ? <circle cx="62" cy="20" r="4" fill="hsl(var(--primary))" /> : <text x="62" y="25" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">∅</text>}
        {i < 3 && <line x1="75" y1="20" x2="90" y2="20" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />}
      </g>
    ))}
    <text x="55" y="110" className="fill-primary font-mono text-xs">HEAD</text>
    <path d="M55,115 L55,95" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <text x="200" y="150" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Non-contiguous • Dynamic size • O(1) insertion</text>
    <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" /></marker></defs>
  </svg>
);

const LinkedListNode = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Node Structure</text>
    <g transform="translate(40, 35)">
      <rect x="0" y="0" width="80" height="50" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <line x1="0" y1="25" x2="80" y2="25" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="40" y="18" textAnchor="middle" className="fill-foreground font-mono text-xs">data</text>
      <text x="40" y="42" textAnchor="middle" className="fill-foreground font-mono text-xs">next</text>
      <circle cx="60" cy="37" r="4" fill="hsl(var(--primary))" />
    </g>
    <text x="100" y="115" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Data + pointer to next</text>
  </svg>
);

const LinkedListTraversal = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Traversal: O(n)</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${20 + i * 60}, 40)`}>
        <rect x="0" y="0" width="35" height="30" fill={i <= 1 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i <= 1 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="17" y="20" textAnchor="middle" className="fill-primary font-mono text-sm">{i + 1}</text>
        {i < 3 && <path d="M38,15 L55,15" stroke="hsl(var(--muted-foreground))" strokeWidth="1" markerEnd="url(#arr)" />}
      </g>
    ))}
    <path d="M37,85 C37,95 97,95 97,85" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
    <text x="67" y="105" textAnchor="middle" className="fill-primary font-mono text-xs">current = current.next</text>
  </svg>
);

const LinkedListInsertion = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">O(1) Insertion</text>
    <g transform="translate(30, 40)">
      <rect x="0" y="0" width="35" height="30" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="17" y="20" textAnchor="middle" className="fill-primary font-mono text-sm">A</text>
    </g>
    <g transform="translate(100, 70)">
      <rect x="0" y="0" width="35" height="30" fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="17" y="20" textAnchor="middle" className="fill-primary font-mono text-sm">X</text>
    </g>
    <g transform="translate(170, 40)">
      <rect x="0" y="0" width="35" height="30" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="17" y="20" textAnchor="middle" className="fill-primary font-mono text-sm">B</text>
    </g>
    <path d="M68,55 L100,75" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <path d="M138,75 L168,55" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <text x="130" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Just update pointers</text>
  </svg>
);

// ===== STACK & QUEUE ILLUSTRATIONS =====

const StackQueueComparison = () => (
  <svg viewBox="0 0 400 180" className="w-full h-full">
    <g transform="translate(50, 30)">
      <text x="50" y="0" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Stack (LIFO)</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="0" y={15 + i * 30} width="100" height="28" fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i === 0 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
      ))}
      <text x="115" y="35" className="fill-primary font-mono text-xs">← top</text>
    </g>
    <g transform="translate(220, 50)">
      <text x="75" y="-20" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Queue (FIFO)</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={i * 30} y="0" width="28" height="40" fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i === 0 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
      ))}
      <text x="0" y="60" className="fill-primary font-mono text-xs">front</text>
      <text x="120" y="60" className="fill-primary font-mono text-xs">rear</text>
    </g>
    <text x="200" y="165" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Both: O(1) push/pop or enqueue/dequeue</text>
  </svg>
);

const StackOperations = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Push & Pop</text>
    <g transform="translate(50, 30)">
      {[0, 1, 2].map((i) => (
        <rect key={i} x="0" y={i * 25} width="60" height="23" fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i === 0 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
      ))}
    </g>
    <path d="M130,42 L150,42" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <text x="160" y="38" className="fill-primary font-mono text-xs">pop</text>
    <path d="M150,58 L130,58" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <text x="160" y="62" className="fill-primary font-mono text-xs">push</text>
    <text x="100" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Last In, First Out</text>
  </svg>
);

const QueueOperations = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Enqueue & Dequeue</text>
    <g transform="translate(40, 45)">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 40} y="0" width="38" height="35" fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i === 0 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
      ))}
    </g>
    <path d="M35,62 L15,62" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <text x="15" y="90" className="fill-primary font-mono text-xs">dequeue</text>
    <path d="M210,62 L230,62" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <text x="205" y="90" className="fill-primary font-mono text-xs">enqueue</text>
    <text x="130" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">First In, First Out</text>
  </svg>
);

const DequeStructure = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Double-Ended Queue</text>
    <g transform="translate(45, 45)">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 42} y="0" width="40" height="35" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      ))}
    </g>
    <g className="fill-primary font-mono text-xs">
      <path d="M40,62 L20,62" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arr)" />
      <path d="M20,62 L40,62" stroke="hsl(var(--primary))" strokeWidth="1" markerStart="url(#arr)" />
      <path d="M218,62 L238,62" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arr)" />
      <path d="M238,62 L218,62" stroke="hsl(var(--primary))" strokeWidth="1" markerStart="url(#arr)" />
    </g>
    <text x="130" y="110" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Insert/remove from both ends</text>
  </svg>
);

// ===== HASH TABLE ILLUSTRATIONS =====

const HashTableOverview = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <text x="200" y="20" textAnchor="middle" className="fill-primary font-mono text-xs uppercase tracking-widest">Hash Table</text>
    <g transform="translate(50, 40)">
      <rect x="0" y="0" width="80" height="30" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="40" y="20" textAnchor="middle" className="fill-primary font-mono text-sm">"key"</text>
    </g>
    <g transform="translate(150, 40)">
      <rect x="0" y="0" width="70" height="30" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" rx="3" />
      <text x="35" y="20" textAnchor="middle" className="fill-foreground font-mono text-xs">hash()</text>
    </g>
    <path d="M133,55 L148,55" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <path d="M223,55 L238,55" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <g transform="translate(250, 35)">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="0" y={i * 28} width="100" height="26" fill={i === 2 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i === 2 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="-15" y={i * 28 + 17} textAnchor="middle" className="fill-muted-foreground font-mono text-xs">{i}</text>
        </g>
      ))}
    </g>
    <text x="200" y="190" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Average O(1) lookup, insert, delete</text>
    <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" /></marker></defs>
  </svg>
);

const HashFunction = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Hash Function</text>
    <g transform="translate(30, 35)">
      <rect x="0" y="0" width="60" height="25" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="30" y="17" textAnchor="middle" className="fill-primary font-mono text-xs">"apple"</text>
    </g>
    <path d="M100,48 L100,70" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
    <g transform="translate(60, 75)">
      <rect x="0" y="0" width="80" height="25" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" rx="3" />
      <text x="40" y="17" textAnchor="middle" className="fill-foreground font-mono text-xs">hash() → 7</text>
    </g>
    <text x="100" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Deterministic mapping</text>
  </svg>
);

const CollisionHandling = () => (
  <svg viewBox="0 0 240 140" className="w-full h-full">
    <text x="120" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Collision: Chaining</text>
    <g transform="translate(30, 35)">
      <rect x="0" y="0" width="50" height="25" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="25" y="17" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">[3]</text>
    </g>
    <path d="M82,48 L95,48" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arr)" />
    {[0, 1].map((i) => (
      <g key={i} transform={`translate(${100 + i * 60}, 35)`}>
        <rect x="0" y="0" width="50" height="25" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="25" y="17" textAnchor="middle" className="fill-primary font-mono text-xs">{['cat', 'dog'][i]}</text>
        {i < 1 && <path d="M52,12 L58,12" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arr)" />}
      </g>
    ))}
    <text x="120" y="85" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Same hash → linked list</text>
    <text x="120" y="105" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Worst case: O(n)</text>
  </svg>
);

const HashTableLookup = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Lookup Process</text>
    <g transform="translate(20, 35)" className="fill-foreground/70 font-mono text-xs">
      <text x="0" y="12">1. Compute hash</text>
      <text x="0" y="32">2. Go to bucket</text>
      <text x="0" y="52">3. Compare keys</text>
      <text x="0" y="72">4. Return value</text>
    </g>
    <text x="100" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Average: O(1)</text>
  </svg>
);

// ===== BINARY TREE ILLUSTRATIONS =====

const BinaryTreeStructure = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <text x="200" y="20" textAnchor="middle" className="fill-primary font-mono text-xs uppercase tracking-widest">Binary Search Tree</text>
    <g transform="translate(200, 50)">
      <circle cx="0" cy="0" r="20" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="0" y="6" textAnchor="middle" className="fill-primary font-mono text-sm">50</text>
      <line x1="-15" y1="18" x2="-60" y2="50" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <line x1="15" y1="18" x2="60" y2="50" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <circle cx="-75" cy="65" r="18" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="-75" y="70" textAnchor="middle" className="fill-primary font-mono text-sm">30</text>
      <circle cx="75" cy="65" r="18" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="75" y="70" textAnchor="middle" className="fill-primary font-mono text-sm">70</text>
      <line x1="-85" y1="80" x2="-110" y2="105" stroke="hsl(var(--border))" strokeWidth="1" />
      <line x1="-65" y1="80" x2="-40" y2="105" stroke="hsl(var(--border))" strokeWidth="1" />
      {[[-120, 115, 20], [-30, 115, 40], [65, 115, 60], [85, 80, 90]].map(([x, y, val], i) => (
        <g key={i}>
          {i < 3 && <circle cx={x} cy={y} r="15" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />}
          {i < 3 && <text x={x} y={y + 5} textAnchor="middle" className="fill-muted-foreground font-mono text-xs">{val}</text>}
        </g>
      ))}
      <line x1="65" y1="80" x2="50" y2="105" stroke="hsl(var(--border))" strokeWidth="1" />
      <circle cx="50" cy="115" r="15" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="50" y="120" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">60</text>
    </g>
    <text x="200" y="190" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Left &lt; Parent &lt; Right • O(log n) operations</text>
    <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" /></marker></defs>
  </svg>
);

const TreeNode = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Tree Node</text>
    <g transform="translate(60, 40)">
      <circle cx="40" cy="0" r="20" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="40" y="6" textAnchor="middle" className="fill-primary font-mono text-sm">val</text>
      <line x1="25" y1="15" x2="5" y2="40" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <line x1="55" y1="15" x2="75" y2="40" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <circle cx="0" cy="50" r="12" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="0" y="54" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">L</text>
      <circle cx="80" cy="50" r="12" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="80" y="54" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">R</text>
    </g>
    <text x="100" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Value + left/right pointers</text>
  </svg>
);

const TreeTraversal = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Traversal Orders</text>
    <g transform="translate(20, 35)" className="fill-foreground/70 font-mono text-xs">
      <text x="0" y="12"><tspan className="fill-primary">In-order:</tspan> L → N → R</text>
      <text x="0" y="32"><tspan className="fill-primary">Pre-order:</tspan> N → L → R</text>
      <text x="0" y="52"><tspan className="fill-primary">Post-order:</tspan> L → R → N</text>
      <text x="0" y="72"><tspan className="fill-primary">Level-order:</tspan> BFS</text>
    </g>
    <text x="130" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Each visits all nodes: O(n)</text>
  </svg>
);

const BSTSearch = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Binary Search</text>
    <g transform="translate(130, 45)">
      <circle cx="0" cy="0" r="15" fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="0" y="5" textAnchor="middle" className="fill-primary font-mono text-xs">50</text>
      <line x1="-10" y1="12" x2="-35" y2="30" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <circle cx="-45" cy="40" r="12" fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="-45" y="44" textAnchor="middle" className="fill-primary font-mono text-xs">30</text>
      <circle cx="45" cy="40" r="12" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="45" y="44" textAnchor="middle" className="fill-muted-foreground font-mono text-xs">70</text>
      <text x="-70" y="75" className="fill-primary font-mono text-xs">target: 25</text>
    </g>
    <text x="130" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Halve search space each step</text>
  </svg>
);

// ===== HEAP ILLUSTRATIONS =====

const HeapStructure = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <text x="200" y="20" textAnchor="middle" className="fill-primary font-mono text-xs uppercase tracking-widest">Max Heap</text>
    <g transform="translate(200, 55)">
      <circle cx="0" cy="0" r="22" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="0" y="6" textAnchor="middle" className="fill-primary font-mono">100</text>
      <line x1="-15" y1="18" x2="-55" y2="45" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <line x1="15" y1="18" x2="55" y2="45" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <circle cx="-70" cy="60" r="18" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="-70" y="65" textAnchor="middle" className="fill-primary font-mono text-sm">50</text>
      <circle cx="70" cy="60" r="18" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="70" y="65" textAnchor="middle" className="fill-primary font-mono text-sm">80</text>
      {[[-100, 105], [-40, 105], [40, 105], [100, 105]].map(([x, y], i) => (
        <g key={i}>
          <line x1={i < 2 ? -70 + (i % 2) * 20 : 70 - (i % 2) * 20} y1="75" x2={x} y2="90" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx={x} cy={y} r="15" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x={x} y={y + 5} textAnchor="middle" className="fill-muted-foreground font-mono text-xs">{[30, 20, 40, 60][i]}</text>
        </g>
      ))}
    </g>
    <text x="200" y="190" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Parent ≥ Children • O(log n) insert/extract</text>
  </svg>
);

const HeapProperty = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Heap Property</text>
    <g transform="translate(100, 50)">
      <circle cx="0" cy="0" r="20" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="0" y="6" textAnchor="middle" className="fill-primary font-mono">P</text>
      <line x1="-12" y1="15" x2="-35" y2="35" stroke="hsl(var(--border))" strokeWidth="1" />
      <line x1="12" y1="15" x2="35" y2="35" stroke="hsl(var(--border))" strokeWidth="1" />
      <circle cx="-45" cy="45" r="15" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="-45" y="49" textAnchor="middle" className="fill-muted-foreground font-mono text-sm">L</text>
      <circle cx="45" cy="45" r="15" fill="hsl(var(--muted))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="45" y="49" textAnchor="middle" className="fill-muted-foreground font-mono text-sm">R</text>
    </g>
    <text x="100" y="115" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Max: P ≥ L, P ≥ R</text>
    <text x="100" y="130" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Min: P ≤ L, P ≤ R</text>
  </svg>
);

const HeapifyOperation = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Heapify (Bubble Down)</text>
    <g transform="translate(20, 35)" className="fill-foreground/70 font-mono text-xs">
      <text x="0" y="12">1. Compare with children</text>
      <text x="0" y="32">2. Swap if violated</text>
      <text x="0" y="52">3. Repeat on subtree</text>
      <text x="0" y="72">4. Until heap restored</text>
    </g>
    <text x="130" y="125" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Time: O(log n)</text>
  </svg>
);

const PriorityQueueUsage = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Priority Queue</text>
    <g transform="translate(30, 40)">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={i * 50} y="0" width="45" height="35" fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity={i === 0 ? "0.3" : "0.1"} stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x={i * 50 + 22} y="22" textAnchor="middle" className="fill-primary font-mono text-sm">{[100, 80, 50, 30][i]}</text>
        </g>
      ))}
      <text x="0" y="55" className="fill-primary font-mono text-xs">highest priority</text>
    </g>
    <text x="130" y="115" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Always extract max/min first</text>
  </svg>
);

// ===== GRAPH ILLUSTRATIONS =====

const GraphOverview = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <text x="200" y="20" textAnchor="middle" className="fill-primary font-mono text-xs uppercase tracking-widest">Graph</text>
    <g stroke="hsl(var(--border))" strokeWidth="1.5">
      <line x1="100" y1="70" x2="200" y2="100" />
      <line x1="100" y1="70" x2="80" y2="150" />
      <line x1="200" y1="100" x2="80" y2="150" />
      <line x1="200" y1="100" x2="300" y2="70" />
      <line x1="200" y1="100" x2="250" y2="160" />
      <line x1="300" y1="70" x2="320" y2="140" />
      <line x1="250" y1="160" x2="320" y2="140" />
    </g>
    {[
      { x: 100, y: 70, label: 'A' },
      { x: 200, y: 100, label: 'B' },
      { x: 80, y: 150, label: 'C' },
      { x: 300, y: 70, label: 'D' },
      { x: 320, y: 140, label: 'E' },
      { x: 250, y: 160, label: 'F' },
    ].map((node, i) => (
      <g key={i}>
        <circle cx={node.x} cy={node.y} r="20" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x={node.x} y={node.y + 5} textAnchor="middle" className="fill-primary font-mono">{node.label}</text>
      </g>
    ))}
    <text x="200" y="190" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Vertices + Edges • Networks, Maps, Dependencies</text>
  </svg>
);

const AdjacencyMatrix = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Adjacency Matrix</text>
    <g transform="translate(40, 30)">
      {['', 'A', 'B', 'C'].map((label, i) => (
        <text key={i} x={i * 30 + 15} y="15" textAnchor="middle" className="fill-primary font-mono text-xs">{label}</text>
      ))}
      {['A', 'B', 'C'].map((label, row) => (
        <g key={row}>
          <text x="15" y={row * 25 + 40} textAnchor="middle" className="fill-primary font-mono text-xs">{label}</text>
          {[0, 1, 2].map((col) => (
            <g key={col}>
              <rect x={col * 30 + 30} y={row * 25 + 25} width="28" height="23" fill={row !== col && (row + col) % 2 === 1 ? "hsl(var(--primary))" : "hsl(var(--muted))"} fillOpacity="0.1" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x={col * 30 + 44} y={row * 25 + 42} textAnchor="middle" className="fill-foreground font-mono text-xs">{row !== col && (row + col) % 2 === 1 ? '1' : '0'}</text>
            </g>
          ))}
        </g>
      ))}
    </g>
    <text x="100" y="130" textAnchor="middle" className="fill-foreground/70 font-body text-xs">O(V²) space</text>
  </svg>
);

const AdjacencyList = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <text x="100" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">Adjacency List</text>
    <g transform="translate(25, 30)">
      {['A', 'B', 'C'].map((label, i) => (
        <g key={i} transform={`translate(0, ${i * 28})`}>
          <rect x="0" y="0" width="30" height="22" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="15" y="15" textAnchor="middle" className="fill-primary font-mono text-xs">{label}</text>
          <path d="M32,11 L45,11" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arr)" />
          {[['B', 'C'], ['A', 'C'], ['A', 'B']][i].map((neighbor, j) => (
            <g key={j}>
              <rect x={50 + j * 35} y="0" width="30" height="22" fill="hsl(var(--muted))" fillOpacity="0.1" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x={65 + j * 35} y="15" textAnchor="middle" className="fill-foreground font-mono text-xs">{neighbor}</text>
            </g>
          ))}
        </g>
      ))}
    </g>
    <text x="100" y="130" textAnchor="middle" className="fill-foreground/70 font-body text-xs">O(V + E) space</text>
    <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" /></marker></defs>
  </svg>
);

const GraphTraversal = () => (
  <svg viewBox="0 0 260 140" className="w-full h-full">
    <text x="130" y="18" textAnchor="middle" className="fill-primary font-mono text-xs uppercase">BFS vs DFS</text>
    <g transform="translate(20, 35)" className="fill-foreground/70 font-mono text-xs">
      <text x="0" y="12"><tspan className="fill-primary">BFS:</tspan> Level by level</text>
      <text x="0" y="28" className="fill-muted-foreground">Uses: Queue, shortest path</text>
      <text x="0" y="52"><tspan className="fill-primary">DFS:</tspan> Depth first</text>
      <text x="0" y="68" className="fill-muted-foreground">Uses: Stack/recursion</text>
    </g>
    <text x="130" y="115" textAnchor="middle" className="fill-foreground/70 font-body text-xs">Both: O(V + E)</text>
  </svg>
);

const DefaultIllustration = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <text x="200" y="100" textAnchor="middle" className="fill-muted-foreground font-mono text-sm">
      Content Coming Soon
    </text>
    <circle cx="200" cy="130" r="30" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="6" />
  </svg>
);

export default TopicIllustration;